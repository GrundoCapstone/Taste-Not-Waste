import firebase from '../firebase/firebase';

//action types
const LOGIN = 'LOGIN';
const SIGN_UP = 'SIGN_UP';
const LOGOUT = 'LOGOUT';
const NOTIFICATION_AUTH = 'NOTIFICATION_AUTH';

const GET_USER_INFO = 'GET_USER_INFO';

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

const setNotificationToken = (user) => {
  return {
    type: NOTIFICATION_AUTH,
    user: user,
  };
};

const _getUserInfo = (user) => {
  return {
    type: GET_USER_INFO,
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

export const setToken = (token) => {
  return async (dispatch) => {
    const user = await firebase.auth().currentUser.uid;
    const usersRef = firebase.firestore().collection('users');
    usersRef
      .doc(user)
      .update({
        pushToken: token,
      })
      .catch((error) => {
        alert(error);
      });
  };
};

export const gettingUserInfo = () => {
  return async (dispatch) => {
    const userId = await firebase.auth().currentUser.uid;
    const usersRef = firebase.firestore().collection('users');
    usersRef
      .doc(userId)
      .get()
      .then((firestoreDocument) => {
        if (!firestoreDocument.exists) {
          alert('User does not exist anymore.');
          return;
        }
        const user = firestoreDocument.data();
        dispatch(_getUserInfo(user));
      });
  };
};

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
    case NOTIFICATION_AUTH:
      return action.user;
    case GET_USER_INFO:
    case NOTIFICATION_AUTH:
      return action.user;
    case GET_USER_INFO:
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
