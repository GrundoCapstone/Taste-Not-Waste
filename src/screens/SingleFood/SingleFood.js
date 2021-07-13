//single food component
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Linking from 'expo-linking';
import { fetchRecipes } from '../../store/allRecipes';
import { deleteSingleFood, fetchAllFoods } from '../../store/allFood';
import styles from './styles';

class SingleFood extends React.Component {
  constructor() {
    super();
    this.handlePress = this.handlePress.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handlePress(item) {
    Linking.openURL(item);
  }

  componentDidMount() {
    this.props.loadRecipes(this.props.route.params.name);
  }

  async handleDelete() {
    console.log('HANDLE DELETE FROM SINGLE FOOD');
    await this.props.deleteFood(this.props.route.params.name);
    this.props.loadAllFoods()
    this.props.navigation.navigate('Fridge');
  }

  render() {
    const food = this.props.route.params;
    const currentDate = new Date().getTime();
    const duration = food.expiration;
    const expiration = new Date(currentDate + duration * 24 * 60 * 60 * 1000)
      .toString()
      .slice(4, 15);
    console.log('PROPS FROM SINGLE FOOD', food.name, expiration);
    return (
      <View style={styles.screenContainer}>
        <View style={styles.body}>
          <View style={styles.foodInfo}>
            <Text style={styles.title}>{food.name}</Text>
            <Text style={styles.date}>Expires on: {expiration}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => this.handleDelete()}
            >
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.recipesTitle}>Recipes</Text>
          {this.props.recipes.length ? (
            <ScrollView>
              {this.props.recipes.map((recipe) => {
                return (
                  <View key={recipe.website} style={styles.container}>
                    <Text style={styles.text}>{recipe.label}</Text>
                    <TouchableOpacity
                      onPress={() => this.handlePress(recipe.website)}
                    >
                      <Text style={styles.detailButton}>Details</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          ) : (
            <View>
              <Text>Search for recipes by ingredient!</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const mapState = (state) => {
  return {
    recipes: state.allRecipes.fridge,
    allFoodsFridge: state.allFoods
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadRecipes: (ingredient) => dispatch(fetchRecipes(ingredient, 'fridge')),
    deleteFood: (food) => dispatch(deleteSingleFood(food)),
    loadAllFoods: () => dispatch(fetchAllFoods())
  };
};

export default connect(mapState, mapDispatch)(SingleFood);
