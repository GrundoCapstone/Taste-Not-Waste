//combined reducer goes here :)
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import allRecipeReducer from './allRecipes'
import scannerReducer from './scanner'
import allFoodReducer from './allFood';
import singleFoodReducer from "./singleFood";

const reducer = combineReducers({
  allRecipes: allRecipeReducer,
  scanner: scannerReducer,
  allFoods: allFoodReducer,
  singleFood: singleFoodReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, 
    // createLogger({ collapsed: true })
    )
);

// const configureStore = () => {
//   return createStore(reducer, middleware);
//   }
//   export default configureStore;

  const store = createStore(reducer, middleware);
  export default store;