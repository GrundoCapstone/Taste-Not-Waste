import React, { useState } from 'react';
import styles from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
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
        { name: 'carrot', expiration: new Date('July 25, 2021') },
        { name: 'tomato', expiration: new Date('July 17, 2021') },
      ],
      modalVisible: false,
      orderDate: new Date(),
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.maybeRenderModal = this.maybeRenderModal.bind(this);
  }

  onSubmit = () => {
    navigation.navigate('Scanner');
  };

  onAddItem = () => {
    this.setState({ ...this.state, modalVisible: true });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Review Your Order</Text>
        <View style={styles.orderDate}>
          <Text>
            Order Date: {this.state.orderDate.toString().slice(4, 15)}
          </Text>
        </View>
        <View style={styles.totalList}>
          <View style={styles.tableHeader}>
            <Text style={styles.itemColumn}>Item</Text>
            <Text style={styles.expirationColumn}>Expiration</Text>
          </View>
          {this.state.food.map((item, index) => {
            return (
              <View key={item.name} style={styles.tableRow}>
                <TextInput
                  style={styles.editName}
                  autoFocus={true}
                  onChangeText={(text) => {
                    const newFood = this.state.food;
                    newFood[index].name = text;
                    this.setState({ ...this.state, food: newFood });
                  }}
                >
                  {item.name}
                </TextInput>
                <TextInput
                  style={styles.editDate}
                  onChangeText={(text) => {
                    const newFood = this.state.food;
                    newFood[index].expiration = text;
                    this.setState({ ...this.state, food: newFood });
                  }}
                >
                  {item.expiration.toString().slice(4, 15)}
                </TextInput>
              </View>
            );
          })}
          <TouchableOpacity
            style={styles.addItemButton}
            onPress={() => this.onAddItem()}
          >
            <Text style={styles.buttonTitle}>Add Item</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.onAddItem()}
        >
          <Text
            style={styles.buttonTitle}
            onPress={() => console.log(this.state.food)}
          >
            Confirm Order
          </Text>
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
          this.setState({
            ...this.state,
            modalVisible: !visible,
          });
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
              this.setState({
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
