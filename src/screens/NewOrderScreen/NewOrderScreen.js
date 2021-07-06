import React from 'react';
import styles from './styles';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Scanner from '../Scanner/Scanner';
import ReviewOrder from '../ReviewOrder/ReviewOrder';

const Stack = createStackNavigator();

export default function NewOrderScreen({ navigation }) {

  return (
    <>
      <Stack.Navigator initialRouteName="NewOrderOptions">
        <Stack.Screen name="NewOrderOptions" component={NewOrderOptions} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="ReviewOrder" component={ReviewOrder} />
      </Stack.Navigator>
    </>
  );
}

function NewOrderOptions({ navigation }) {
  const onUseImageReceiptPress = () => {
    navigation.navigate('Scanner');
  };

  const onNewOrderPress = () => {
    navigation.navigate('ReviewOrder');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start a New Shopping Trip</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onUseImageReceiptPress()}
      >
        <Text style={styles.buttonTitle}>Upload Receipt Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onNewOrderPress()}>
        <Text style={styles.buttonTitle}>Upload Items Manually</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onAllRecipesPress()}>
        <Text style={styles.buttonTitle}>All Recipes Test Page</Text>
      </TouchableOpacity>
    </View>
  );
}
