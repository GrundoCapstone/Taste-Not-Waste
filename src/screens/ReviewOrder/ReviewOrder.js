import React, { useState } from 'react';
import styles from './styles';
import DatePicker from 'react-native-datepicker';
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
      orderDate: new Date(),
      renderPicker: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.maybeRenderModal = this.maybeRenderModal.bind(this);
    this.renderOrderDatePicker = this.renderOrderDatePicker.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  onSubmit = () => {
    navigation.navigate('Scanner');
  };

  onAddItem = () => {
    this.setState({ ...this.state, modalVisible: true });
  };

  onDateChange = () => {
    console.log('ON DATE CHANGE');
    this.setState({ ...this.state, renderPicker: true });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Review Your Order</Text>
        <View style={styles.orderDate}>
          <Text>
            Order Date: {this.state.orderDate.toString().slice(0, 16)}
          </Text>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => this.onDateChange()}
          >
            <Text>Change</Text>
          </TouchableOpacity>
          {this.renderOrderDatePicker()}
        </View>
        <View style={styles.totalList}>
          <View style={styles.tableHeader}>
            <Text style={styles.itemColumn}>Item</Text>
            <Text style={styles.expirationColumn}>Expiration</Text>
          </View>
          {this.state.food.map((item) => {
            return (
              <View key={item.name}>
                <Text style={styles.itemColumn}>{item.name}</Text>
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.onAddItem()}
        >
          <Text style={styles.buttonTitle}>AddItem</Text>
        </TouchableOpacity>
        {this.maybeRenderModal()}
      </View>
    );
  }

  renderOrderDatePicker = () => {
    if (this.state.renderPicker) {
      const date = this.state.orderDate;
      return (
        <View>
          <DatePicker
            style={styles.datePickerStyle}
            date={date} // Initial date from state
            mode="date" // The enum of date, datetime and time
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-01-2016"
            maxDate="01-01-2019"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                //display: 'none',
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {
              this.setState({ ...this.state, orderDate: date });
            }}
          />
        </View>
      );
    }
  };

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
