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
const DELETE_SIGNLE_FOOD = "DELETE_SIGNLE_FOOD";

//Action Creator
const postSingleFood = (foodItem) => {
    return {
        type: POST_SINGLE_FOOD,
        foodItem
    }
}

const removeSingleFood = (food) => {
    return {
        type: DELETE_SIGNLE_FOOD,
        food
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
                    const expiration = currentDate.addDays(duration)
                    foodResult['expiration'] = expiration.toString().slice(4, 15)
                }
            })
            dispatch(postSingleFood(foodResult));
        } catch (error) {
            console.log(error, "Can't add food item!")
        }
    }
}

export const deleteSingleFood = (food) => {
    return async (dispatch) => {
        try {
            const userId = firebase.auth().currentUser.uid;
            const fridgeRef = firebase
              .firestore()
              .collection(`/users/${userId}/fridge`);
            const queryRef = fridgeRef.where('name', '==', food);
            console.log('QUERY REF : ', queryRef)
            const result = await queryRef.delete()
            dispatch(removeSingleFood(result))
        } catch (err) {
            console.log(err, "Can't delete food item!")
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