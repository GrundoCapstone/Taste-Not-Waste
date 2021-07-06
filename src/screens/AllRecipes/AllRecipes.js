//All recipes component

import React from 'react'
import {Text, View, Image, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import { fetchRecipes } from '../../store/allRecipes'
import styles from './styles'

class AllRecipes extends React.Component{
  componentDidMount(){
    this.props.loadRecipes('celery')
  }
  render(){
    // console.log('THIS IS ONE OF THE RECIPE OBJECT',this.props.recipes)
    return(
      <ScrollView >
        {this.props.recipes.map((recipe) => {return (
          <View key={recipe.label} style = {styles.container}>
           <Image
           style = {styles.tinyLogo}
           source={{
             uri: recipe.imageUrl,
           }}
         />
        <Text style = {styles.text}>{recipe.label}</Text>
         </View>
        )})}
      </ScrollView>
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
