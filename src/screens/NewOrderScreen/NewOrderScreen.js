import React from 'react';
import styles from './styles';
import { Text, TouchableOpacity, View } from 'react-native';

export default function NewOrderScreen({ navigation }) {
  const onUseImageReceiptPress = () => {
    navigation.navigate('Scanner');
  };

  const onNewOrderPress = () => {
    navigation.navigate('ReviewOrder');
  };

  const onAllRecipesPress = () => {
    navigation.navigate('AllRecipes');
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
