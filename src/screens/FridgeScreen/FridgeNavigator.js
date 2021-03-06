import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SingleFood from '../SingleFood/SingleFood'
import  FridgeScreen  from './FridgeScreen';
import NewOrderScreen from '../NewOrderScreen/NewOrderScreen';

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
        <Stack.Screen name="NewOrderScreen">{() => <NewOrderScreen />}</Stack.Screen>
      </Stack.Navigator>
    </>
  );
}
