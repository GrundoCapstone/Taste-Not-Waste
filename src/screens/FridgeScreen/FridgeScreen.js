import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import { fetchAllFoods } from '../../store/allFood';

class FridgeScreen extends React.Component {
  componentDidMount() {
    this.props.loadAllFoods();
  }

  render() {
    console.log(
      'AllFoodsFridge from FridgeScreen : ',
      this.props.allFoodsFridge
    );
    return (
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {this.props.allFoodsFridge.map((food, index) => {
          return (
            <View key={food.name}>
              <Text style={styles.entityText}> {index + 1}. {food.name} </Text>
              <Text style={styles.entityText}>
                {' '}
                This food expires in {food.expiration} days
              </Text>
            </View>
          );
        })}
      </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapState = (state) => {
  return {
    allFoodsFridge: state.allFoods,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadAllFoods: () => dispatch(fetchAllFoods()),
  };
};

export default connect(mapState, mapDispatch)(FridgeScreen);

// export default function FridgeScreen(props) {

//     const [entityText, setEntityText] = useState('')
//     const [entities, setEntities] = useState([])

//     const entityRef = firebase.firestore().collection('food')
//     const userID = props.extraData.id

//     useEffect(() => {
//         entityRef
//             .where("authorID", "==", userID)
//             .orderBy('createdAt', 'desc')
//             .onSnapshot(
//                 querySnapshot => {
//                     const newEntities = []
//                     querySnapshot.forEach(doc => {
//                         const entity = doc.data()
//                         entity.id = doc.id
//                         newEntities.push(entity)
//                     });
//                     setEntities(newEntities)
//                 },
//                 error => {
//                     console.log(error)
//                 }
//             )
//     }, [])

//     const onAddButtonPress = () => {
//         if (entityText && entityText.length > 0) {
//             const timestamp = firebase.firestore.FieldValue.serverTimestamp();
//             const data = {
//                 text: entityText,
//                 authorID: userID,
//                 createdAt: timestamp,
//             };
//             entityRef
//                 .add(data)
//                 .then(_doc => {
//                     setEntityText('')
//                     Keyboard.dismiss()
//                 })
//                 .catch((error) => {
//                     alert(error)
//                 });
//         }
//     }

//     const renderEntity = ({item, index}) => {
//         return (
//             <View style={styles.entityContainer}>
//                 <Text style={styles.entityText}>
//                     {index + 1}. {item.text}
//                 </Text>
//             </View>
//         )
//     }

//     return (
//         <View style={styles.container}>
//             <View style={styles.formContainer}>
//                 <TextInput
//                     style={styles.input}
//                     placeholder='Add new entity'
//                     placeholderTextColor="#aaaaaa"
//                     onChangeText={(text) => setEntityText(text)}
//                     value={entityText}
//                     underlineColorAndroid="transparent"
//                     autoCapitalize="none"
//                 />
//                 <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
//                     <Text style={styles.buttonText}>Add</Text>
//                 </TouchableOpacity>
//             </View>
//             { entities && (
//                 <View style={styles.listContainer}>
//                     <FlatList
//                         data={entities}
//                         renderItem={renderEntity}
//                         keyExtractor={(item) => item.id}
//                         removeClippedSubviews={true}
//                     />
//                 </View>
//             )}
//         </View>
//     )
// }
