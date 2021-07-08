import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import { fetchAllFoods } from '../../store/allFood';

class FridgeScreen extends React.Component {
  componentDidMount() {
    this.props.loadAllFoods();
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
            <View style={styles.tableHeader}>
              <Text style={styles.itemColumnName}>Item</Text>
              <Text style={styles.expiresColumnName}>Expires In</Text>
              <Text style={styles.infoColumnName}>Info</Text>
            </View>
            {foods.map((food, index) => {
              return (
                <View key={food.name} style={styles.tableRow}>
                  <Text style={styles.foodName}>{food.name}</Text>
                  <Text style={styles.foodExpiration}>
                    {food.expiration} Days
                  </Text>
                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.foodDetails}>Details</Text>
                  </TouchableOpacity>
                </View>
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
