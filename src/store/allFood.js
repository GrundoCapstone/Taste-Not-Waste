/*
fridge view

food name and expiration date

add multiple food items, then click confirm to change state

*/
import * as Notifications from 'expo-notifications';
import { firebase } from '../firebase/config'

// Action Types
const GET_ALL_FOODS = 'GET_ALL_FOODS'
const ADD_ALL_FOODS = 'ADD_ALL_FOODS'
const SET_FOOD_NOTIFICATIONS = 'SET_FOOD_NOTIFICATIONS'

// ACTION CREATOR
const getAllFoods = (foods) => {
    return {
        type: GET_ALL_FOODS,
        foods
    }
}

const _addAllFoods = (foods) => {
    return {
        type: ADD_ALL_FOODS,
        foods
    }
}

const setFoodNotifications = (foods) => {
    return {
        type: SET_FOOD_NOTIFICATIONS,
        foods
    }
}
// Thunk
export const fetchAllFoods = () => {
    return async (dispatch) => {
        try {
            const userId = firebase.auth().currentUser.uid
            const fridgeRef = firebase.firestore().collection(`/users/${userId}/fridge`)
            const snapshot = await fridgeRef.get();
            const resultArr = []
            snapshot.forEach(doc => {
                const expiration = new Date(doc.data().expiration.seconds * 1000).getTime()
                const currentDate = new Date().getTime()
                const difference = Math.round((expiration - currentDate) / (1000 * 3600 * 24));
                resultArr.push({name: doc.data().name, expiration: difference})
              });
            dispatch(getAllFoods(resultArr))
        } catch (err) {
            console.log('No such document!');
        }
    }
}

export const addAllFoods = (foods) => {
    return async (dispatch) => {
        try {
            const userId = firebase.auth().currentUser.uid
            const fridgeRef = firebase.firestore().collection(`/users/${userId}/fridge`)
            foods.forEach((food) => {
                food.expiration = new Date(food.expiration)
                fridgeRef.doc().set(food);
            })
            const snapshot = await fridgeRef.get();
            const resultArr = []
            snapshot.forEach(doc => {
                const expiration = new Date(doc.data().expiration.seconds * 1000).getTime()
                const currentDate = new Date().getTime()
                const difference = Math.round((expiration - currentDate) / (1000 * 3600 * 24));
                resultArr.push({name: doc.data().name, expiration: difference})
              });
            dispatch(_addAllFoods(resultArr))
        } catch (err) {
            console.log('Can\'t add foods to fridge!')
        }
    }
}

export const setNotifications = (foods) => {
    return async (dispatch) => {
        // const userId = firebase.auth().currentUser.uid
            // const fridgeRef = firebase.firestore().collection(`/users/${userId}/fridge`)
            foods.forEach(async (food) => {
                food.expiration = new Date(food.expiration)
                //do the math to get 3 days prior, set that to the trigger time
                // fridgeRef.doc().set(food);
                await Notifications.scheduleNotificationAsync({
                    content: {
                      title: "You've got mail! 📬",
                      body: 'Here is the notification body',
                      data: { data: 'goes here' },
                    },
                    trigger: { seconds: 5 },
                  });
                  dispatch(foods)
            })
    }
}

const initialState = []

// Reducer
const allFoodReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_ALL_FOODS:
            return action.foods
        case ADD_ALL_FOODS:
            return action.foods
        case SET_FOOD_NOTIFICATIONS:
            return action.foods
        default:
            return state
    }
}

export default allFoodReducer;

// const daysLeft = (new Date() - doc.data().expiration.seconds) / 86400
// const expiration = new Date(doc.data().expiration.seconds * 1000).toLocaleString()
// resultArr.push(doc.data().name, (expiration))
// console.log(resultArr)


