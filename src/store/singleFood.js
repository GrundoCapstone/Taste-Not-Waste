import firebase from '../firebase/firebase';

Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
//Action Type
const POST_SINGLE_FOOD = 'POST_SINGLE_FOOD';

//Action Creator
const postSingleFood = (foodItem) => {
  return {
    type: POST_SINGLE_FOOD,
    foodItem,
  };
};

//Thunk
export const addFoodItem = (food, expiration) => {
  return async (dispatch) => {
    try {
      food = food.toLowerCase().trim()
      let regex = new RegExp(`${food}e?s?`)
      let newExpiration = expiration.length ? expiration : '';
      const foodResult = { name: food, expiration: newExpiration };
      const foodRef = firebase.firestore().collection('/food');
      const snapshot = await foodRef.get();
      if (!foodResult.expiration.length) {
        snapshot.forEach((doc) => {
          if (regex.test(food)) {
            let currentDate = new Date();
            const duration = parseInt(doc.data().duration, 0);
            const expiration = currentDate.addDays(duration);
            foodResult['expiration'] = expiration.toString().slice(4, 15);
          }
        });
      }
      dispatch(postSingleFood(foodResult));
    } catch (error) {
      console.log(error, "Can't add food item!");
    }
  };
};

const initialState = {};
//Reducer
const singleFoodReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_SINGLE_FOOD:
      return action.foodItem;
    default:
      return state;
  }
};
export default singleFoodReducer;
