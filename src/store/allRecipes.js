//action constant
import axios from 'axios';
import { EDAMAM_API_KEY } from '../../secrets';
const GET_RECIPES = 'GET_RECIPES';
const GET_FRIDGE_RECIPES = 'GET_FRIDGE_RECIPES';

//action creator
const getRecipes = (recipes) => {
  return {
    type: GET_RECIPES,
    recipes,
  };
};

const getFridgeRecipes = (recipes) => {
  return {
    type: GET_FRIDGE_RECIPES,
    recipes,
  };
};

export const fetchRecipes = (ingredient, type) => {
  return async (dispatch) => {
    try {
      let options = {
        method: 'GET',
        url: 'https://edamam-recipe-search.p.rapidapi.com/search',
        params: { q: `${ingredient}` },
        headers: {
          'x-rapidapi-key': `${EDAMAM_API_KEY}`,
          'x-rapidapi-host': 'edamam-recipe-search.p.rapidapi.com',
        },
      };
      const res = await axios.request(options);
      let resultArr = [];
      res.data.hits.forEach((element) => {
        resultArr.push({
          label: element.recipe.label,
          imageUrl: element.recipe.image,
          website: element.recipe.url,
        });
      });
      if (type === 'search') {
        dispatch(getRecipes(resultArr));
      } else if (type === 'fridge') {
        dispatch(getFridgeRecipes(resultArr));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = { fridge: [], search: [] };

const allRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return { ...state, search: action.recipes };
    case GET_FRIDGE_RECIPES:
      return { ...state, fridge: action.recipes };
    default:
      return state;
  }
};

export default allRecipeReducer;
