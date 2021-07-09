import * as ImagePicker from 'expo-image-picker';
import Clipboard from 'expo-clipboard';
import Environment from '../firebase/environment';
import firebase from '../firebase/firebase';
import { nanoid } from 'nanoid/non-secure';

//action types:
const HANDLE_PICKED_IMAGE = 'HANDLE_PICKED_IMAGE';
const SUBMIT_TO_GOOGLE = 'SUBMIT_TO_GOOGLE';

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

export const _renderItem = (item) => {
  <Text>response: {JSON.stringify(item)}</Text>;
};

// export const _share = () => {
//   Share.share({
//     message: JSON.stringify(this.state.googleResponse.responses),
//     title: 'Check it out',
//     url: this.state.image,
//   });
// };

// export const _copyToClipboard = () => {
//   Clipboard.setString(this.state.image);
//   alert('Copied to clipboard');
// };

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
      // this.setState({ uploading: true });

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
    // finally {
    //   this.setState({ uploading: false });
    // }
  };
};

export const submitToGoogle = (image) => {
  return async (dispatch) => {
    try {
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: 'TEXT_DETECTION' },
              // { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
            ],
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
      responseText = responseText.filter((line) => {
        return (
          !line.includes('$') &&
          !line.toLowerCase().includes('subtotal') &&
          !line.toLowerCase().includes('total') &&
          !line.toLowerCase().includes('amount')
        );
      });
      // responseText = responseText.filter((text) => !text.includes('$'));
      console.log('>>>>>>>>>>>>RESPONSE FROM GOOGLE OCR<<<<<<<<<<<<<<');
      console.log(responseText);
      dispatch(_submitToGoogle(responseText));
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
    default:
      return state;
  }
};
