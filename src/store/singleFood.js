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
            const foodResult = {name: food, expiration: ''}
            const foodRef = firebase.firestore().collection('/food');
            const snapshot = await foodRef.get();
            snapshot.forEach(doc => {
                if(doc.data().name == food){
                    console.log("FOUND MATCH", doc.data().duration)
                    foodResult['expiration'] = doc.data().duration
                    console.log("THUNK FOOD RESULT", foodResult)
                }
            })
            dispatch(postSingleFood(foodResult));
        } catch (error) {
            console.log(error, "Can't add food item!")
        }
    }
}

// const test = await fridgeRef.doc().set(testData);

const initialState = {}
//Reducer
const singleFoodReducer = (state=initialState, action) => {
    switch(action.type){
        case POST_SINGLE_FOOD:
            return action.foodItem
        default:
            return state
    }
}
export default singleFoodReducer