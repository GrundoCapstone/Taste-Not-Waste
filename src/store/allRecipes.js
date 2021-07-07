//fetch all recipes for a single ingredient

//just the name, icon/photo of recipe

//accessed from all recipes screen

//get my recipes by user "my recipes"

//action constant
import axios from 'axios'
import { EDAMAM_API_KEY } from '../../secrets'
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
          'x-rapidapi-key': `${EDAMAM_API_KEY}`,
         'x-rapidapi-host': 'edamam-recipe-search.p.rapidapi.com'}
      }
      const res  = await axios.request(options);
      let resultArr = [];
      res.data.hits.forEach(element => {
        resultArr.push({
          label: element.recipe.label,
          imageUrl: element.recipe.image,
        })
      });

      //TEMPORARILY INPUT DUMMY DATA INSTEAD OF CALLING THE API TO EDIT THE FRONT END WITHOUT MAKING CONTINUOUS API CALLS

      // let resultArr = [     {
      //   "imageUrl": "https://www.edamam.com/web-img/1ca/1ca293df6f5cbb73ec7fe4d9104a13c9.jpg",
      //   "label": "Celery Seed Vinaigrette",
      // },
      // {
      //   "imageUrl": "https://www.edamam.com/web-img/bcf/bcf576c2ae4bd294906aab1b0283164e.JPG",
      //   "label": "Celery Granita",
      // },
      // {
      //   "imageUrl": "https://www.edamam.com/web-img/36a/36a055a3cabaf6d79da971c780ea65be",
      //   "label": "Parmesan Celery Salad recipes",
      // },
      // {
      //   "imageUrl": "https://www.edamam.com/web-img/921/921d2c079973f93e486adc283de83655.jpg",
      //   "label": "Sparkling Celery Gimlets",
      // },
      // {
      //   "imageUrl": "https://www.edamam.com/web-img/84e/84eb901dddf15720dc976d2016d500be.jpg",
      //   "label": "Celery-And-Celery-Root Salad",
      // },
      // {
      //   "imageUrl": "https://www.edamam.com/web-img/719/71975fd00f28b2a18003c742286eff83",
      //   "label": "Celery Root Mash recipes",
      // },
      // {
      //   "imageUrl": "https://www.edamam.com/web-img/4b5/4b594dbaf4e22024f651d3a719842603",
      //   "label": "Celery Salad with Celery Root and Horseradish recipes",
      // },]
      dispatch(getRecipes(resultArr))
    } catch (error) {
      console.log(error);
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
