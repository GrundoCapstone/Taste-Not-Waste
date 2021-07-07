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

export default class ReviewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: [
        { name: 'carrot', expiration: new Date() },
        { name: 'tomato', expiration: new Date() },
      ],
      modalVisible: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.maybeRenderModal = this.maybeRenderModal.bind(this);
  }

  onSubmit = () => {
    navigation.navigate('Scanner');
  };

  onAddItem = () => {
    this.setState = { ...this.state, modalVisible: !this.state.modalVisible };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Review Your Order</Text>
        <Text style={styles.title}>Order Date: {new Date()}</Text>
        <table>
          <tr>
            <th>Item</th>
            <th>Expiration</th>
          </tr>
          {this.state.food.map((item) => {
            return (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.expiration}</td>
              </tr>
            );
          })}
        </table>
        <TouchableOpacity style={styles.button} onPress={() => onAddItem()}>
          <Text style={styles.buttonTitle}>AddItem</Text>
        </TouchableOpacity>
        {this.maybeRenderModal()}
      </View>
    );
  }

  //modal component
  maybeRenderModal = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          this.setState = {
            ...this.state,
            modalVisible: !visible,
          };
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add an Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Food"
            placeholderTextColor="#aaaaaa"
            // onChangeText={(text) => setFood(text)}
            // value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Expiration Date"
            placeholderTextColor="#aaaaaa"
            // onChangeText={(text) => setExpiration(text)}
            // value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() =>
              (this.setState = {
                ...this.state,
                modalVisible: !this.state.modalVisible,
              })
            }
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </Modal>
    );
  };
}
