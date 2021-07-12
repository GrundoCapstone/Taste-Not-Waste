//single food component
import React from 'react'
import {View, Text, ScrollView, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import * as Linking from 'expo-linking'
import { fetchRecipes } from '../../store/allRecipes'
import styles from './styles'

class SingleFood extends React.Component{
  constructor(){
    super()
    this.handlePress = this.handlePress.bind(this)
  }
  handlePress(item){
    Linking.openURL(item);
  }

  componentDidMount() {
    this.props.loadRecipes(this.props.route.params.name)
  }

  render(){
    const food = this.props.route.params
    const currentDate = new Date().getTime();
    const duration = food.expiration
    const expiration = new Date(currentDate + (duration*24*60*60*1000)).toString().slice(4, 15)
    console.log('PROPS FROM SIGLE FOOD', food.name, expiration)
    return(
      <View style = {{margin:50}}>
        <Text>{food.name}</Text>
        <Text>Expires on {expiration}</Text>

      {this.props.recipes.length ? 
      <ScrollView >
        {this.props.recipes.map((recipe) => {return (
          <View key={recipe.website} style = {styles.container}>
        <Text style = {styles.text}>{recipe.label}</Text>
        <TouchableOpacity
          onPress ={() => this.handlePress(recipe.website)}>
          <Text style = {styles.detailButton}>Details</Text>
        </TouchableOpacity>
         </View>
        )})}
      </ScrollView> :
      <View>
        <Text>Search for recipes by ingredient!</Text>
        </View>}
      </View>  
    )
  }
}

const mapState = (state) => {
  return {
    recipes: state.allRecipes.fridge
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadRecipes: (ingredient) => dispatch(fetchRecipes(ingredient, 'fridge'))
  }
}

export default connect(mapState, mapDispatch)(SingleFood);
