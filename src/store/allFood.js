/*
fridge view

food name and expiration date

add multiple food items, then click confirm to change state

*/
import { firebase } from '../firebase/config'

const fridgeRef = firebase.firestore().collection('users').doc('kl6fbgMwLm1H7aVFTIHk').collection('fridge');

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
            const doc = await fridgeRef.get();
            console.log('Document data:', doc.data());
            dispatch(getAllFoods(doc.data()))
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