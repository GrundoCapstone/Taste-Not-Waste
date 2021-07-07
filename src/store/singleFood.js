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

const testData = {
    name: 'brie cheese',
    expiration: new Date('July 12, 2021 12:00:00')
}
//Thunk
export const addFoodItem = (food) => {
    //takes in food parameter?
    return async (dispatch) => {
        try {
            //laura@test.com 112233
            const foodRef = firebase.firestore().collection('/food');
            const snapshot = await foodRef.get();
            snapshot.forEach(doc => {
                // console.log(doc.id, '>>>>', doc.data().name)
                if(doc.data().name === testData.name){
                    testData.expiration = doc.data().duration
                    console.log("Filtered test data >", testData)
                    testData
                }
            })

            // const postFood = await foodRef.post();
            dispatch(postSingleFood(testData));
        } catch (error) {
            console.log(error, "Can't add food item!")
        }
    }
}
// const snapshot = await citiesRef.get();
// snapshot.forEach(doc => {
//   console.log(doc.id, '=>', doc.data());
// });


// const userId = firebase.auth().currentUser.uid 
//             const fridgeRef = firebase.firestore().collection(`/users/${userId}/fridge`)

// const test = await fridgeRef.doc().set(testData);

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