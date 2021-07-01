import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDPOdzXggwCdSJtgnSB6P4QE_uaxR9FFXM',
  authDomain: 'tastenotwaste-318419.firebaseapp.com',
  databaseURL: 'https://tastenotwaste.firebaseio.com',
  projectId: 'tastenotwaste-318419',
  storageBucket: 'tastenotwaste-318419.appspot.com',
  messagingSenderId: '627998400917',
  appId: '1:627998400917:ios:956dd8167ef6170160169c',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
