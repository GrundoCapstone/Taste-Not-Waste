/*
edit food item (quantity and delete)

get food name and expiration
*/
import { firebase } from '../firebase/config'

Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }
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
                    let currentDate = new Date()
                    const duration = parseInt((doc.data().duration), 0)
                    // console.log("FOUND MATCH", duration)
                    const expiration = currentDate.addDays(duration)
                    // console.log("EXPIRATION ", expiration.toString().slice(4, 15))
                    foodResult['expiration'] = expiration.toString().slice(4, 15)
                    // console.log("CURRENT DATE", date)
                    // console.log("EXPIRATION DATE", date.addDays(duration))
                }
            })
            dispatch(postSingleFood(foodResult));
        } catch (error) {
            console.log(error, "Can't add food item!")
        }
    }
}

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