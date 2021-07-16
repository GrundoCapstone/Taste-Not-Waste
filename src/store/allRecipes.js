//action constant
import axios from 'axios'
import { EDAMAM_API_KEY } from '../../secrets'
import firebase from '../firebase/firebase';
const GET_RECIPES = 'GET_RECIPES'
const GET_FRIDGE_RECIPES = 'GET_FRIDGE_RECIPES'

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
      //getting user information
      let healthFilter = [];
      let healthLabels;
      const userId = await firebase.auth().currentUser.uid;
      const usersRef = firebase.firestore().collection('users');
      usersRef
      .doc(userId)
      .get()
      .then( async (firestoreDocument) => {
        if (!firestoreDocument.exists) {
          alert('User does not exist anymore.');
          return;
        }
      const user = firestoreDocument.data();
      healthLabels = user.healthLabels;
      console.log('HEALTH LABELS FROM USER', healthLabels);
      if(healthLabels['dairyFree']){
        healthFilter.push('Dairy-Free')
      }
      if(healthLabels['glutenFree']){
        healthFilter.push('Gluten-Free')
      }
      if(healthLabels['vegetarian']){
        console.log('is this logging?')
        healthFilter.push('Vegetarian')
        console.log(healthFilter)
      }
      if(healthLabels['vegan']){
        healthFilter.push('Vegan')
      }

    console.log('FILTER',healthLabels)
      let options = {
        method: 'GET',
        url: 'https://edamam-recipe-search.p.rapidapi.com/search',
        params: {q: `${ingredient}`, to: 20, Health: healthFilter},
        headers: {
          'x-rapidapi-key': `${EDAMAM_API_KEY}`,
          'x-rapidapi-host': 'edamam-recipe-search.p.rapidapi.com',
        },
      };
      const res = await axios.request(options);
      let resultArr = [];
      res.data.hits.forEach(element => {
        console.log('RECIPE LOG',element.recipe.label, element.recipe.healthLabels)
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
    })
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
