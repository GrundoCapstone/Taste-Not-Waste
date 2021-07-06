/*
fridge view

food name and expiration date

add multiple food items, then click confirm to change state

*/
import { firebase } from '../firebase/config'

// const foodRef = db.foodRef('/users/kl6fbgMwLm1H7aVFTIHk/fridge/rS5ddoASjLzVVRbs1EDU')

// Action Types
const GET_ALL_FOODS = 'GET_ALL_FOODS'

// ACTION CREATOR
const getAllFoods = (foods) => {
    return {
        type: GET_ALL_FOODS,
        foods
    }
}

// Thunk
export const fetchAllFoods = () => {
    return async (dispatch) => {
        try {
            const fridgeRef = firebase.firestore().collection('/users/kl6fbgMwLm1H7aVFTIHk/fridge')
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

const initialState = []

// Reducer
const allFoodReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_ALL_FOODS:
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
