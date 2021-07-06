//fetch all recipes for a single ingredient

//just the name, icon/photo of recipe

//accessed from all recipes screen

//get my recipes by user "my recipes"

//action constant
import axios from 'axios'
const GET_RECIPES = 'GET_RECIPES'

//action creator
const getRecipes = (recipes) => {
  return {
    type: GET_RECIPES,
    recipes
  }
}

export const fetchRecipes = (ingredient) => {
  return async (dispatch) => {
    try {
      let options = {
        method: 'GET',
        url: 'https://edamam-recipe-search.p.rapidapi.com/search',
        params: {q: `${ingredient}`},
        headers: {
          'x-rapidapi-key': '8716292620msh428ca8ed3a3272bp18c28ajsnda5e9cb4ebc4',
         'x-rapidapi-host': 'edamam-recipe-search.p.rapidapi.com'}
      }
      const res = await axios.request(options);
      dispatch(getRecipes(res.data.hits))
    } catch (error) {

    }
  }
}

const initialState = [];

const allRecipeReducer = (state= initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return action.recipes;
    default:
      return state;
  }
}

export default allRecipeReducer;
