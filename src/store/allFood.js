/*
fridge view

food name and expiration date

add multiple food items, then click confirm to change state

*/
import * as Notifications from 'expo-notifications';
import firebase from '../firebase/firebase';

// Action Types
const GET_ALL_FOODS = 'GET_ALL_FOODS';
const ADD_ALL_FOODS = 'ADD_ALL_FOODS';
const DELETE_SINGLE_FOOD = 'DELETE_SIGNLE_FOOD';

// ACTION CREATOR
const getAllFoods = (foods) => {
  return {
    type: GET_ALL_FOODS,
    foods,
  };
};

const _addAllFoods = (foods) => {
  return {
    type: ADD_ALL_FOODS,
    foods,
  };
};

const removeSingleFood = (food) => {
  return {
    type: DELETE_SINGLE_FOOD,
    food,
  };
};

// Thunk
export const fetchAllFoods = () => {
  return async (dispatch) => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const fridgeRef = firebase
        .firestore()
        .collection(`/users/${userId}/fridge`);
      const snapshot = await fridgeRef.get();
      const resultArr = [];
      snapshot.forEach((doc) => {
        //if food expiration is known
        if (doc.data().expiration !== 'unknown') {
          const expiration = new Date(
            doc.data().expiration.seconds * 1000
          ).getTime();
          const currentDate = new Date().getTime();
          const difference = Math.round(
            (expiration - currentDate) / (1000 * 3600 * 24)
          );
          resultArr.push({ name: doc.data().name, expiration: difference });
        } else {
          resultArr.push({
            name: doc.data().name,
            expiration: Number.MAX_SAFE_INTEGER,
          });
        }
      });
      dispatch(getAllFoods(resultArr));
    } catch (err) {
      console.log('No such document!');
    }
  };
};

export const addAllFoods = (foods) => {
  return async (dispatch) => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const fridgeRef = firebase
        .firestore()
        .collection(`/users/${userId}/fridge`);
      foods = foods.filter((food) => food.name.length);
      foods.forEach(async (food) => {
        //if expiration is known in review order
        if (food.expiration.length) {
          food.expiration = new Date(food.expiration);
        }
        //if food expiration in review order was left blank
        else {
          food.expiration = 'unknown';
        }
        fridgeRef.doc().set(food);
        //this is to add the notifications
      });
      const body =
        foods.length > 1
          ? `You have ${foods.length} foods expiring!`
          : `Your ${foods[0].name} is expiring!`;
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Time to eat! 🥑',
          body: body,
          data: { data: 'goes here' },
        },
        trigger: { seconds: 5 },
      });
      const snapshot = await fridgeRef.get();

      const resultArr = [];
      snapshot.forEach((doc) => {
        if (doc.data().expiration !== 'unknown') {
          const expiration = new Date(
            doc.data().expiration.seconds * 1000
          ).getTime();
          const currentDate = new Date().getTime();
          const difference = Math.round(
            (expiration - currentDate) / (1000 * 3600 * 24)
          );
          resultArr.push({ name: doc.data().name, expiration: difference });
        } else {
          resultArr.push({ name: doc.data().name, expiration: 'unknown' });
        }
      });
      dispatch(_addAllFoods(resultArr));
    } catch (err) {
      console.log("Can't add foods to fridge!");
    }
  };
};

export const deleteSingleFood = (food) => {
  return async (dispatch) => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const fridgeRef = firebase
        .firestore()
        .collection(`/users/${userId}/fridge`);
      const snapshot = await fridgeRef.where('name', '==', food).get();
      let result;
      snapshot.forEach((doc) => {
        result = doc.id;
      });
      await fridgeRef.doc(result).delete();
      dispatch(removeSingleFood(result));
    } catch (err) {
      console.log(err, "Can't delete food item!");
    }
  };
};

const initialState = [];

// Reducer
const allFoodReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FOODS:
      return action.foods;
    case ADD_ALL_FOODS:
      return action.foods;
    case DELETE_SINGLE_FOOD:
      const removedFood = state.filter((food) => food.id !== action.food.id);
      return [...state, removedFood];
    default:
      return state;
  }
};

export default allFoodReducer;
