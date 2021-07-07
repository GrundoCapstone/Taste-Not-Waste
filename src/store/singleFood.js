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
export const addFoodItem = (food) => {
    //takes in food parameter?
    return async (dispatch) => {
        try {
            //laura@test.com 112233
            // const foodRef = firebase.firestore().collection('/food');
            // //map over each food, check if the name entered matches any food from db
            // //inputted string includes
            // // if(food)
            // const getFood = await foodRef.get();
            // console.log("get all the food", getFood)
            // const postFood = await foodRef.post();
            // dispatch(postSingleFood(postFood));
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
export default singleFoodReducer