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
import { connect } from 'react-redux';

class ReviewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: [
        { name: 'carrot', expiration: 'July 25, 2021' },
        { name: 'tomato', expiration: 'July 17, 2021' },
      ],
      modalVisible: false,
      orderDate: new Date(),
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.maybeRenderModal = this.maybeRenderModal.bind(this);
  }

  onSubmit = () => {
    console.log('onSubmit');
  };

  onAddItem = () => {
    this.setState({ ...this.state, modalVisible: true });
  };

  render() {
    console.log('state: ', this.state);
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
                  value={item.name}
                  onChangeText={(text) => {
                    const newFood = [...this.state.food];
                    newFood[index].name = text;
                    this.setState({ ...this.state, food: newFood });
                  }}
                ></TextInput>
                <TextInput
                  style={styles.editDate}
                  value={item.expiration}
                  onChangeText={(text) => {
                    const newDate = [...this.state.food];
                    newDate[index].expiration = text;
                    this.setState({ ...this.state, food: newDate });
                  }}
                ></TextInput>
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
        animationType="fade"
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
            onPress={() =>
              this.setState({
                ...this.state,
                modalVisible: !this.state.modalVisible,
              })
            }
          >
            <Text style={styles.textStyle}>Submit</Text>
          </Pressable>
        </View>
      </Modal>
    );
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    createFoodItem: (foodItem) => dispatch(addFoodItem(foodItem)),
  };
};

export default connect(null, mapDispatchToProps)(ReviewOrder);

//ReviewOrder.js contains modal.
//enter food item into modal, update state on Review Order
