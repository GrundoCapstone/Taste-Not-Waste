//All recipes component

import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchRecipes } from '../../store/allRecipes';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Linking from 'expo-linking';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class AllRecipes extends React.Component {
  constructor() {
    super();
    this.state = {
      ingredient: '',
    };
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress(item) {
    Linking.openURL(item);
  }
  render() {
    return (
      <DismissKeyboard>
        <View style={styles.body}>
          <Text style={styles.header}>Discover New Recipes</Text>
          <KeyboardAwareScrollView
            style={{ flex: 1, width: '100%' }}
            keyboardShouldPersistTaps="always"
          >
            <View>
              <TextInput
                style={styles.input}
                placeholder="Ingredient(s)"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => this.setState({ ingredient: text })}
                value={this.state.ingredient}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.props.loadRecipes(this.state.ingredient);
                  Keyboard.dismiss();
                }}
              >
                <Text style={styles.searchText}>Search</Text>
              </TouchableOpacity>
            </View>
            {this.props.recipes.length ? (
              <ScrollView>
                {this.props.recipes.map((recipe) => {
                  return (
                    <View key={recipe.website}>
                      <TouchableOpacity
                        onPress={() => this.handlePress(recipe.website)}
                        style={styles.container}
                      >
                        <Image
                          style={styles.tinyLogo}
                          source={{
                            uri: recipe.imageUrl,
                          }}
                        />
                        <Text style={styles.text}>{recipe.label}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            ) : (
              <View>
                <Text style={styles.instructions}>
                  Search for recipes by ingredient!
                </Text>
              </View>
            )}
          </KeyboardAwareScrollView>
        </View>
      </DismissKeyboard>
    );
  }
}

const mapState = (state) => {
  return {
    recipes: state.allRecipes.search,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadRecipes: (ingredient) => dispatch(fetchRecipes(ingredient, 'search')),
  };
};

export default connect(mapState, mapDispatch)(AllRecipes);
