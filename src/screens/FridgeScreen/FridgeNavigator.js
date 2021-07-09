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
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import { fetchAllFoods } from '../../store/allFood';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import SingleFood from '../SingleFood/SingleFood'
import AllRecipes from '../AllRecipes/AllRecipes'
import  FridgeScreen  from './FridgeScreen';

const Stack = createStackNavigator();


export default function FridgeNavigator({ navigation })
{

  return (
    <>
      <Stack.Navigator initialRouteName="Fridge" screenOptions={{
    headerShown: false
  }}
      >
        <Stack.Screen name="Fridge"
        >{(props) => <FridgeScreen {...props} />}</Stack.Screen>
        <Stack.Screen name="SingleFood"
        >{(props) => <SingleFood {...props} />}</Stack.Screen>
      </Stack.Navigator>
    </>
  );
}
