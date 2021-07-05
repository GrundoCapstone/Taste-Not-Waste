//All recipes component

import React from 'react'
import {Text, View, Image, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import { fetchRecipes } from '../../store/allRecipes'

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

class AllRecipes extends React.Component{
  componentDidMount(){
    this.props.loadRecipes('celery')
  }
  render(){
    console.log('THIS IS ONE OF THE RECIPE OBJECT',this.props.recipes)
    return(
      <View>
        {this.props.recipes.map((recipe) => {return (
          <View>
           <Text key={recipe.label}>{recipe.label}</Text>
           <Image
           style = {styles.tinyLogo}
           source={{
             uri: recipe.imageUrl,
           }}
         />
         </View>
        )})}
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
