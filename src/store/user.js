import { firebase } from '../firebase/config';
/*
get user info

edit user info

adding recipe favorites
*/

//action types
const LOGIN = 'LOGIN';

//action creator
const _login = (user) => {
  return {
    type: LOGIN,
    user: user,
  };
};

//thunk creators
export const login = (email, password) => {
  return async (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert('User does not exist anymore.');
              return;
            }
            const user = firestoreDocument.data();
            dispatch(_login(user));
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
};

//reducer
const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
