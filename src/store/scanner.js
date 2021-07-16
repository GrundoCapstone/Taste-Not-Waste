import * as ImagePicker from 'expo-image-picker';
import Environment from '../firebase/environment';
import firebase from '../firebase/firebase';
import { nanoid } from 'nanoid/non-secure';

//action types:
const HANDLE_PICKED_IMAGE = 'HANDLE_PICKED_IMAGE';
const SUBMIT_TO_GOOGLE = 'SUBMIT_TO_GOOGLE';
const RESET_IMAGE = 'RESET_IMAGE';

//action creators
const handlePickedImage = (image) => {
  return {
    type: HANDLE_PICKED_IMAGE,
    image: image,
  };
};

const _submitToGoogle = (response) => {
  return {
    type: SUBMIT_TO_GOOGLE,
    googleResponse: response,
  };
};

export const resetImage = () => {
  return {
    type: RESET_IMAGE,
  };
};

export const _renderItem = (item) => {
  <Text>response: {JSON.stringify(item)}</Text>;
};

//upload new image taken with camera
export const _takePhoto = () => {
  return async (dispatch) => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    dispatch(_handleImagePicked(pickerResult));
  };
};

//upload image from camera roll
export const _pickImage = () => {
  return async (dispatch) => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    dispatch(_handleImagePicked(pickerResult));
  };
};

//THUNK CREATOR
export const _handleImagePicked = (pickerResult) => {
  2;
  return async (dispatch) => {
    try {
      if (!pickerResult.cancelled) {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', pickerResult.uri, true);
          xhr.send(null);
        });

        const ref = firebase.storage().ref().child(nanoid());
        const snapshot = await ref.put(blob);

        blob.close();
        const downloadUrl = await snapshot.ref.getDownloadURL();
        dispatch(handlePickedImage(downloadUrl));
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    }
  };
};

export const submitToGoogle = (image) => {
  return async (dispatch) => {
    try {
      let body = JSON.stringify({
        requests: [
          {
            features: [{ type: 'TEXT_DETECTION' }],
            image: {
              source: {
                imageUri: image,
              },
            },
          },
        ],
      });
      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=' +
          Environment['GOOGLE_CLOUD_VISION_API_KEY'],
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: body,
        }
      );
      let responseJson = await response.json();
      let responseText = responseJson.responses[0].fullTextAnnotation.text;
      responseText = responseText.split('\n');
      const regExp = /[a-zA-Z]/g;
      responseText = responseText.filter((line) => {
        return (
          !line.includes('$') &&
          !line.toLowerCase().includes('subtotal') &&
          !line.toLowerCase().includes('total') &&
          !line.toLowerCase().includes('amount') &&
          !line.toLowerCase().includes('special') &&
          !line.toLowerCase().includes('discount') &&
          !line.toLowerCase().includes('sale') &&
          !line.toLowerCase().includes('loyalty') &&
          !line.toLowerCase().includes('item') &&
          !line.toLowerCase().includes('description') &&
          line.length &&
          regExp.test(line)
        );
      });
      const foodObjects = {};
      responseText.forEach((food) => {
        const lowercaseFood = food.toLowerCase();
        foodObjects[lowercaseFood] = true;
      });
      responseText = responseText.map((food) => food.toLowerCase());
      //get expirations from database
      let foodResult = [];
      const foodRef = firebase.firestore().collection('/food');
      const snapshot = await foodRef.get();
      snapshot.forEach((doc) => {
        //check each item in receipt to see if it includes an item in the db
        responseText.forEach((food) => {
          //if the expiration date for this line item hasn't been found yet
          if (foodObjects[food]) {
            if (food.includes(doc.data().name)) {
              //update foodObject to indicate that this food's expiration has been found
              foodObjects[food] = false;
              let currentDate = new Date();
              const duration = parseInt(doc.data().duration, 0);
              const expiration = currentDate.addDays(duration);
              const match = {
                name: food,
                expiration: expiration.toString().slice(4, 15),
              };
              foodResult.push(match);
            }
          }
        });
      });
      Object.keys(foodObjects).forEach((key) => {
        if (foodObjects[key]) {
          foodResult.push({ name: key, expiration: '' });
        }
      });
      dispatch(_submitToGoogle(foodResult));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  image: null,
  googleResponse: null,
};

//reducer

export default scannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_PICKED_IMAGE:
      return { ...state, image: action.image };
    case SUBMIT_TO_GOOGLE:
      return { ...state, googleResponse: action.googleResponse };
    case RESET_IMAGE:
      return { ...state, image: null };
    default:
      return state;
  }
};
