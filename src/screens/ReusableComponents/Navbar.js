import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { FridgeScreen, NewOrderScreen, AllRecipes } from '../'
import { View } from 'react-native';

//bowl plus-square
//font awesome 5 - shopping basket
//materialCommunityIcons corn   food-apple   food-apple-outline   food-variant   fridge-outline silverware-variant

const Tab = createMaterialBottomTabNavigator();

const NavBar = () => {
    // const [index, setIndex] = React.useState(0);
    // const [routes] = React.useState([
    //     {key: 'fridge', title: 'Fridge', icon: 'fridge-outline'},
    //     {key: 'newOrder', title: 'New Order', icon: 'shopping basket'},
    //     {key: 'recipes', title: 'Recipes', icon: 'silverware-variant'}
    // ])
    // const renderScene = BottomNavigation.SceneMap({
    //     fridge: FridgeRoute,
    //     newOrder: NewOrderRoute,
    //     recipes: RecipesRoute,
    // })
    return (
        <View>
        <Tab.Navigator initialRouteName="New Order" activeColor="#A9EBDB" inactiveColor="#FFBABE" barStyle={{paddingBottom: 48}}>
              <Tab.Screen name="Fridge" component={FridgeScreen} />
              <Tab.Screen name="New Order" component={NewOrderScreen} />
              <Tab.Screen name="AllRecipes" component={AllRecipes} />
          </Tab.Navigator>
        </View>
    )
}

export default NavBar