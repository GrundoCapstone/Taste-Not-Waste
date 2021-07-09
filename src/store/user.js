import { USER_FACING_NOTIFICATIONS } from 'expo-permissions';
import { firebase } from '../firebase/config';
/*
get user info

edit user info

adding recipe favorites
*/

//action types
const LOGIN = 'LOGIN';
const SIGN_UP = 'SIGN_UP';
const LOGOUT = 'LOGOUT';
const NOTIFICATION_AUTH = 'NOTIFICATION_AUTH';

const GET_USER_INFO = 'GET_USER_INFO'

//action creator
const _login = (user) => {
  return {
    type: LOGIN,
    user: user,
  };
};

const _signup = (user) => {
  return {
    type: SIGN_UP,
    user: user,
  };
};

const _logout = (user) => {
  return {
    type: LOGOUT,
    user: user,
  };
};

<<<<<<< HEAD
const setNotificationToken = (user) => {
  return {
    type: NOTIFICATION_AUTH,
    user: user,
  };
};
=======
const _getUserInfo = (user) => {
  return {
    type: GET_USER_INFO,
    user: user
  }
}
>>>>>>> 8149de36e89d9bae0b6b82ee3d8f605f732b56dd

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

export const signup = (fullName, email, password) => {
  return async (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .set(data)
          .catch((error) => {
            alert(error);
          });
        dispatch(_signup(usersRef));
      })
      .catch((error) => {
        alert(error);
      });
  };
};

export const logout = () => {
  return async (dispatch) => {
    firebase.auth().signOut();
    dispatch(_logout(null));
  };
};

<<<<<<< HEAD
export const setToken = (token) => {
  return async (dispatch) => {
    const usersRef = firebase.firestore().collection('users');
    usersRef
    .doc(user.uid)
    .get()
    .then((document) => {
      const userData = document.data();
      document.update({
        "pushToken": token,
    })
    })
      .catch((error) => {
        alert(error);
      });
  };
};
=======
export const gettingUserInfo = () => {
  return async(dispatch) => {
    const userId = await firebase.auth().currentUser.uid

    // const signedInUser = firebase.firestore().collection('users').doc(`${userId}`)
    // dispatch(_getUserInfo(signedInUser))
    // console.log("SIGNED IN USER", signedInUser)
    // console.log("USER ID ID ID", userId)
    const usersRef = firebase.firestore().collection('users')
    console.log("USERS REF", usersRef)
    usersRef
      .doc(userId)
      .get()
      .then((firestoreDocument) => {
        if (!firestoreDocument.exists) {
          alert('User does not exist anymore.');
          return;
        }
      const user = firestoreDocument.data();
      console.log("USER>>>>", user)
      dispatch(_getUserInfo(user));
          })
  }
}


>>>>>>> 8149de36e89d9bae0b6b82ee3d8f605f732b56dd

//reducer
const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user;
    case SIGN_UP:
      return action.user;
    case LOGOUT:
      return action.user;
<<<<<<< HEAD
    case NOTIFICATION_AUTH:
=======
    case GET_USER_INFO:
>>>>>>> 8149de36e89d9bae0b6b82ee3d8f605f732b56dd
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
