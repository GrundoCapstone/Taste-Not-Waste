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
    this.setModalVisible = this.setModalVisible.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
  }

  onSubmit = () => {
    navigation.navigate('Scanner');
  };

  onAddItem = () => {
    setModalVisible(!modalVisible);
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
        {maybeRenderModal()}
      </View>
    );
  }

  //modal component
  maybeRenderModal = () => {
    return (
      <Modal
        animationType="none"
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
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </Modal>
    );
  };
}

//functional component

// export default function ReviewOrder({ navigation }) {
//   //set modal visibility
//   const [modalVisible, setModalVisible] = useState(false);

//   const onSubmit = () => {
//     navigation.navigate('Scanner');
//   };

//   const onAddItem = () => {
//     setModalVisible(!modalVisible);
//   };
//   const maybeRenderModal = () => {
//     return (
//       <Modal
//         animationType="none"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           Alert.alert('Modal has been closed.');
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.modalView}>
//           <Text style={styles.modalText}>Add an Item</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Food"
//             placeholderTextColor="#aaaaaa"
//             // onChangeText={(text) => setFood(text)}
//             // value={email}
//             underlineColorAndroid="transparent"
//             autoCapitalize="none"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Expiration Date"
//             placeholderTextColor="#aaaaaa"
//             // onChangeText={(text) => setExpiration(text)}
//             // value={email}
//             underlineColorAndroid="transparent"
//             autoCapitalize="none"
//           />
//           <Pressable
//             style={[styles.button, styles.buttonClose]}
//             onPress={() => setModalVisible(!modalVisible)}
//           >
//             <Text style={styles.textStyle}>Hide Modal</Text>
//           </Pressable>
//         </View>
//       </Modal>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Review Your Order</Text>
//       <TouchableOpacity style={styles.button} onPress={() => onAddItem()}>
//         <Text style={styles.buttonTitle}>AddItem</Text>
//       </TouchableOpacity>
//       {maybeRenderModal()}
//     </View>
//   );
// }
