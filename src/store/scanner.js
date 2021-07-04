import * as ImagePicker from 'expo-image-picker';
import Clipboard from 'expo-clipboard';
import Environment from '../../firebase/environment';
import firebase from '../../firebase/firebase';

//action types:
const EXTRACT_KEY = 'EXTRACT_KEY';

_keyExtractor = (item, index) => item.id;

_renderItem = (item) => {
  <Text>response: {JSON.stringify(item)}</Text>;
};

_share = () => {
  Share.share({
    message: JSON.stringify(this.state.googleResponse.responses),
    title: 'Check it out',
    url: this.state.image,
  });
};

_copyToClipboard = () => {
  Clipboard.setString(this.state.image);
  alert('Copied to clipboard');
};

_takePhoto = async () => {
  let pickerResult = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  this._handleImagePicked(pickerResult);
};

_pickImage = async () => {
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  this._handleImagePicked(pickerResult);
};

_handleImagePicked = async (pickerResult) => {
  try {
    this.setState({ uploading: true });

    if (!pickerResult.cancelled) {
      uploadUrl = await uploadImageAsync(pickerResult.uri);
      this.setState({ image: uploadUrl });
    }
  } catch (e) {
    console.log(e);
    alert('Upload failed, sorry :(');
  } finally {
    this.setState({ uploading: false });
  }
};

submitToGoogle = async () => {
  try {
    this.setState({ uploading: true });
    let { image } = this.state;
    let body = JSON.stringify({
      requests: [
        {
          features: [
            { type: 'TEXT_DETECTION', maxResults: 5 },
            { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
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
    console.log('>>>>>>>>>>>HERE');
    console.log(responseJson.responses[0].textAnnotations[0].description);
    this.setState({
      googleResponse: responseJson,
      uploading: false,
    });
  } catch (error) {
    console.log(error);
  }
};

async function uploadImageAsync(uri) {
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
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    // .child(uuid.v4());
    .child(nanoid());
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
}
