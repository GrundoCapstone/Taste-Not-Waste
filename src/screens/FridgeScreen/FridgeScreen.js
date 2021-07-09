import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  TouchableHighlight,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  SafeAreaView,gi
} from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import { fetchAllFoods } from '../../store/allFood';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import SingleFood from '../SingleFood/SingleFood'
import AllRecipes from '../AllRecipes/AllRecipes'


class FridgeScreen extends React.Component {
  constructor(props){
    super(props)
    this.onNavigationPress = this.onNavigationPress.bind(this);
  }
  componentDidMount() {
    this.props.loadAllFoods();
  }
  onNavigationPress () {
    this.props.navigation.navigate('SingleFood')
  }

  render() {
    console.log(
      'AllFoodsFridge from FridgeScreen : ',
      this.props.allFoodsFridge
    );
    let foods = this.props.allFoodsFridge;
    foods.sort(function (a, b) {
      const keyA = a.expiration;
      const keyB = b.expiration;
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Fridge</Text>
          <View style={styles.totalList}>
            {/* <View style={styles.tableHeader}>
              <Text style={styles.itemColumnName}>Item</Text>
              <Text style={styles.expiresColumnName}>Expires In</Text>
            </View> */}
            {foods.map((food, index) => {
              return (
                <TouchableOpacity
                onPress = {this.onNavigationPress}
                key={`${food.name}${index}`}>
                  <View style={styles.foodTile}>
                    <View style={styles.tileContent}>
                      <Text style={styles.foodName}>{food.name}</Text>
                      {parseInt(food.expiration) > 0 ? (
                        <Text style={styles.foodExpiration}>
                          {food.expiration} Days Left
                        </Text>
                      ) : (
                        <Text style={styles.expired}>EXPIRED</Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapState = (state) => {
  return {
    allFoodsFridge: state.allFoods,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadAllFoods: () => dispatch(fetchAllFoods()),
  };
};

export default connect(mapState, mapDispatch)(FridgeScreen);
