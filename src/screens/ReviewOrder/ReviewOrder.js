import React from 'react';
import styles from './styles';
import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { addFoodItem } from '../../store/singleFood';
import { addAllFoods } from '../../store/allFood';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class ReviewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: [],
      newFood: '',
      newExpiration: '',
      noFoodError: false,
      modalVisible: false,
      editModalVisible: false,
      orderDate: new Date(),
      deleteModalVisible: false,
      itemToDelete: {},
      itemToEdit: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.maybeRenderModal = this.maybeRenderModal.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.onEditOrder = this.onEditOrder.bind(this);
    this.maybeRenderDeleteModal = this.maybeRenderDeleteModal.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.singleFoodFridge !== prevProps.singleFoodFridge) {
      const newFood = this.props.singleFoodFridge;
      const updatedFoods = [...this.state.food, newFood];
      this.setState({ food: updatedFoods });
    }
    if (this.props.receiptScan !== prevProps.receiptScan) {
      const newFoods = this.props.receiptScan;
      const updatedFoods = [...this.state.food, ...newFoods];
      this.setState({ food: updatedFoods });
    }
  }

  onSubmit = () => {
    this.props.loadFridge(this.state.food);
    this.setState({ food: [] });
    this.props.navigation.navigate('Fridge');
  };

  onAddItem = () => {
    this.setState({ ...this.state, modalVisible: true });
  };

  onEditOrder = (item, index) => {
    this.setState({
      ...this.state,
      editModalVisible: true,
      itemToEdit: { name: item.name, expiration: item.expiration, index },
    });
  };

  onDeleteRow = (name, index) => {
    this.setState({
      ...this.state,
      deleteModalVisible: true,
      itemToDelete: { name, index },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.totalList}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.textStyle} title="Go back">
              Back
            </Text>
          </TouchableOpacity>
          <Text style={styles.title}>Review Order</Text>
          <View style={styles.orderDate}>
            <Text style={styles.orderDateText}>
              Order Date: {this.state.orderDate.toString().slice(4, 15)}
            </Text>
          </View>

          <View style={styles.tableHeader}>
            <Text style={styles.itemColumn}>Item</Text>
            <Text style={styles.expirationColumn}>Expiration</Text>
          </View>
          {this.state.food.map((item, index) => {
            if (item.name.length || item.expiration.length) {
              return (
                <View
                  key={item.name + item.expiration + index}
                  style={styles.tableRow}
                >
                  <Text style={styles.nameText}>{item.name}</Text>
                  <Text style={styles.expirationText}>{item.expiration}</Text>
                  <View style={styles.icon}>
                    <TouchableOpacity
                      onPress={() => this.onEditOrder(item, index)}
                    >
                      <FontAwesome5
                        name="edit"
                        color="black"
                        size={20}
                        style={styles.trashIcon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.onDeleteRow(item.name, index)}
                    >
                      <FontAwesome5
                        name="trash"
                        color="black"
                        size={20}
                        style={styles.trashIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
          })}
          <TouchableOpacity
            style={styles.addItemButton}
            onPress={() => this.onAddItem()}
          >
            <Text style={styles.buttonTitle}>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
            <Text style={styles.buttonTitle}>Confirm Order</Text>
          </TouchableOpacity>
        </ScrollView>
        {this.maybeRenderModal()}
        {this.maybeRenderEditModal(this.state.itemToEdit)}
        {this.maybeRenderDeleteModal(this.state.itemToDelete)}
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
          {this.state.noFoodError ? (
            <Text style={styles.error}>You must enter a food name</Text>
          ) : (
            <></>
          )}
          <TextInput
            style={styles.input}
            placeholder='"apple"'
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => {
              this.setState({ newFood: text });
            }}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Text style={styles.inputLabel}>Food Name</Text>
          <TextInput
            style={styles.input}
            placeholder='"JAN 01 2021"'
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => {
              this.setState({ newExpiration: text });
            }}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Text style={styles.inputLabel}>Expiration (optional)</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              if (this.state.newFood.length) {
                this.props.loadSingleFood(
                  this.state.newFood,
                  this.state.newExpiration
                );
                this.setState({
                  ...this.state,
                  newFood: '',
                  newExpiration: '',
                  noFoodError: false,
                  modalVisible: !this.state.modalVisible,
                });
              } else {
                this.setState({ ...this.state, noFoodError: true });
              }
            }}
          >
            <Text style={styles.textStyle}>Submit</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              this.setState({
                ...this.state,
                newFood: '',
                newExpiration: '',
                noFoodError: false,
                modalVisible: !this.state.modalVisible,
              });
            }}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    );
  };

  maybeRenderEditModal = (food) => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.editModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          this.setState({
            ...this.state,
            editModalVisible: !visible,
          });
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Edit Item</Text>
          {this.state.noFoodError ? (
            <Text style={styles.error}>You must enter a food name</Text>
          ) : (
            <></>
          )}
          <TextInput
            style={styles.input}
            placeholder="FOOD ITEM"
            placeholderTextColor="#aaaaaa"
            value={this.state.itemToEdit.name}
            onChangeText={(text) => {
              this.setState((state) => ({
                ...state,
                itemToEdit: {
                  ...state.itemToEdit,
                  name: text,
                },
              }));
            }}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Text style={styles.inputLabel}>Food Name</Text>
          <TextInput
            style={styles.input}
            placeholder='"JAN 01 2021" (optional)'
            placeholderTextColor="#aaaaaa"
            value={food.expiration}
            onChangeText={(text) => {
              this.setState((state) => ({
                ...state,
                itemToEdit: {
                  ...state.itemToEdit,
                  expiration: text,
                },
              }));
            }}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Text style={styles.inputLabel}>Expiration (optional)</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              if (this.state.itemToEdit.name.length) {
                let newFood = [...this.state.food];
                let replacementFood = {
                  name: this.state.itemToEdit.name,
                  expiration: this.state.itemToEdit.expiration,
                };
                newFood.splice(food.index, 1, replacementFood);
                this.setState({
                  ...this.state,
                  food: newFood,
                  noFoodError: false,
                  editModalVisible: !this.state.editModalVisible,
                  itemToEdit: {},
                });
              } else {
                this.setState({ ...this.state, noFoodError: true });
              }
            }}
          >
            <Text style={styles.textStyle}>Submit</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              this.setState({
                ...this.state,
                noFoodError: false,
                editModalVisible: !this.state.editModalVisible,
                itemToEdit: {},
              });
            }}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    );
  };

  maybeRenderDeleteModal = (item) => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.deleteModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          this.setState({
            ...this.state,
            deleteModalVisible: !visible,
          });
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Are you sure you want to delete {item.name}?
          </Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              let newFood = [...this.state.food];
              newFood.splice(item.index, 1);
              this.setState({
                ...this.state,
                deleteModalVisible: !this.state.deleteModalVisible,
                food: newFood,
                itemToDelete: {},
              });
            }}
          >
            <Text style={styles.textStyle}>Confirm</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              this.setState({
                ...this.state,
                deleteModalVisible: !this.state.deleteModalVisible,
                itemToDelete: {},
              });
            }}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>
    );
  };
}

const mapState = (state) => {
  return {
    singleFoodFridge: state.singleFood,
    receiptScan: state.scanner.googleResponse,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleFood: (food, expiration) =>
      dispatch(addFoodItem(food, expiration)),
    loadFridge: (foods) => dispatch(addAllFoods(foods)),
  };
};
export default connect(mapState, mapDispatch)(ReviewOrder);
