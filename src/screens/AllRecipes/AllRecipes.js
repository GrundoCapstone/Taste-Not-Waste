//All recipes component

import React from 'react'
import {Text, View} from 'react-native'
import {connect} from 'react-redux'
import { fetchRecipes } from '../../store/allRecipes'

class AllRecipes extends React.Component{
  componentDidMount(){
    this.props.loadRecipes('chicken')
  }
  render(){
    // console.log('THIS IS ONE OF THE RECIPE OBJECT',this.props.recipes[0].recipe)
    return(
      <View>
        {this.props.recipes.map((recipe) => {return (
           <Text key={recipe.label}>{recipe.recipe.calories}</Text>
        )})}
      <Text>Hello</Text>
      </View>
    )
  }
}

const mapState = (state) => {
  return {
    recipes: state.allRecipes,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadRecipes: (ingredient) => dispatch(fetchRecipes(ingredient)),
  }
}

export default connect(mapState, mapDispatch)(AllRecipes);
