//combined reducer goes here :)
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import allRecipeReducer from './allRecipes'
import scannerReducer from './scanner'
import allFoodReducer from './allFood';

const reducer = combineReducers({
  allRecipes: allRecipeReducer,
  scanner: scannerReducer,
  allFood: allFoodReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const configureStore = () => {
  return createStore(reducer, middleware);
  }
  export default configureStore;
