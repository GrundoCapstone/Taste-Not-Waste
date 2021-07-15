//combined reducer goes here :)
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import allRecipeReducer from './allRecipes';
import scannerReducer from './scanner';
import allFoodReducer from './allFood';
import singleFoodReducer from './singleFood';
import userReducer from './user';

const reducer = combineReducers({
  allRecipes: allRecipeReducer,
  scanner: scannerReducer,
  allFoods: allFoodReducer,
  singleFood: singleFoodReducer,
  userInfo: userReducer,
});
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(reducer, middleware);
export default store;
