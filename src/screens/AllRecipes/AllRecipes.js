//All recipes component

import React from 'react'
import {Text, View, Image, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import { fetchRecipes } from '../../store/allRecipes'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class AllRecipes extends React.Component{
  constructor(){
    super()
    this.state = {
      ingredient: ''
    }
  }
  render(){
    return(
      <View style = {styles.screenContainer}>
        <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
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
        <TouchableOpacity
          onPress ={() => console.log(recipe.label)}>
          <Text style = {styles.detailButton}>Details</Text>
        </TouchableOpacity>
         </View>
        )})}
      </ScrollView> :
      <View>
        <Text>Search for recipes by ingredient!</Text>
        </View>}
        </KeyboardAwareScrollView>
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
