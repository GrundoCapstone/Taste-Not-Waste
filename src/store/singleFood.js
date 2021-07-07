/*
edit food item (quantity and delete)

get food name and expiration
*/

import { firebase } from '../firebase/config'

//Action Type
const POST_SINGLE_FOOD = "POST_SINGLE_FOOD";

//Action Creator
const postSingleFood = (foodItem) => {
    return {
        type: POST_SINGLE_FOOD,
        foodItem
    }
}

//Thunk
export const addFoodItem = () => {
    return async (dispatch) => {
        try {
            //laura@test.com 112233
            const fridgeRef = firebase.firestore().collection('/users/OMwhAWYLFtYWOnJiecFQ9bNm9Fj1/fridge');
            const postFood = await fridgeRef.post();
            dispatch(postSingleFood(postFood));
        } catch (error) {
            console.log(error, "Can't add food item!")
        }
    }
}

const initialState = []
//Reducer
const singleFoodReducer = (state=initialState, action) => {
    switch(action.type){
        case POST_SINGLE_FOOD:
            return [...state, action.foodItem]
        default:
            return state
    }
}