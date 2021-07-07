//All recipes component

import React from 'react'
import {Text, View, Image, ScrollView, TextInput, TouchableOpacity, KeyboardAwareScrollView} from 'react-native'
import {connect} from 'react-redux'
import { fetchRecipes } from '../../store/allRecipes'
import styles from './styles'

class AllRecipes extends React.Component{
  constructor(){
    super()
    this.state = {
      ingredient: ''
    }
  }
  // componentDidMount(){
  //   this.props.loadRecipes('celery')
  // }
  render(){
    // console.log('THIS IS ONE OF THE RECIPE OBJECT',this.props.recipes)
    console.log('STATE IN ALL RECIPES', this.state.ingredient)
    return(
      <View>
        <View>
        <TextInput
          style={styles.input}
          placeholder="Ingredient(s)"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => this.setState({ingredient: text})}
          value={this.state.ingredient}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
        style={styles.button}
        onPress={()=>this.props.loadRecipes(this.state.ingredient)}>
          <Text>Search</Text>
          </TouchableOpacity>
        </View>
      {this.props.recipes.length ? <ScrollView >
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
    recipes: state.allRecipes,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadRecipes: (ingredient) => dispatch(fetchRecipes(ingredient)),
  }
}

export default connect(mapState, mapDispatch)(AllRecipes);
