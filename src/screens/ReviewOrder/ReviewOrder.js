import React, { useState } from 'react';
import styles from './styles';
import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';

//PLACEHOLDER COMPONENT

function ReviewOrder({ navigation }) {
  //set modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  const [foodItem, setFoodItem] = useState('');

  const onSubmit = () => {
    navigation.navigate('Scanner');
  };

  const onAddItem = () => {
    setModalVisible(!modalVisible);
    setFoodItem(foodItem + '')
  };
  const maybeRenderModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add an Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Food Item"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setFoodItem(text)}
            // value={text}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          {/* <TextInput
            style={styles.input}
            placeholder="Expiration Date"
            placeholderTextColor="#aaaaaa"
            // onChangeText={(text) => setExpiration(text)}
            // value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          /> */}
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Submit</Text>
          </Pressable>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review Your Order</Text>
      <TouchableOpacity style={styles.button} onPress={() => onAddItem()}>
        <Text style={styles.buttonTitle}>Add Item</Text>
      </TouchableOpacity>
      {maybeRenderModal()}
    </View>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    createFoodItem: (foodItem) => dispatch(addFoodItem(foodItem))
  }
}

export default connect(null, mapDispatchToProps)(ReviewOrder);

//ReviewOrder.js contains modal. 
//enter food item into modal, update state on Review Order