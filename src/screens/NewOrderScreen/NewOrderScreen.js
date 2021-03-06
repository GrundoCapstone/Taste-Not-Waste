import React, { useState } from 'react';
import styles from './styles';
import { Text, TouchableOpacity, View, Modal, Pressable } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Scanner from '../Scanner/Scanner';
import ReviewOrder from '../ReviewOrder/ReviewOrder';
import { setToken } from '../../store/user';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class NewOrderScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      pushToken: '',
    };
  }
  async componentDidMount() {
    const token = await registerForPushNotificationsAsync();
    this.props.loadToken(token);
    this.setState({ pushToken: token });
  }

  render() {
    return (
      <>
        <Stack.Navigator
          initialRouteName="NewOrderOptions"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="NewOrderOptions" component={NewOrderOptions} />
          <Stack.Screen name="Scanner" component={Scanner} />
          <Stack.Screen name="ReviewOrder" component={ReviewOrder} />
        </Stack.Navigator>
      </>
    );
  }
}

function NewOrderOptions({ navigation }) {
  const onUseImageReceiptPress = () => {
    navigation.navigate('Scanner');
  };

  const onNewOrderPress = () => {
    navigation.navigate('ReviewOrder');
  };

  const [infoModal, setInfoModal] = useState(false)

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
      <TouchableOpacity style={styles.help} onPress={() => {setInfoModal(true)}}>
        <Text style={styles.helpTitle}>Need Help?</Text>
      </TouchableOpacity>
      {infoModal ?
        <Modal
              animationType="fade"
              transparent={true}
              visible={infoModal}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setInfoModal(!infoModal);
              }}
        >
          <View style={styles.modalView}>
          <Text style={styles.modalText}>How To Start a New Shopping Trip</Text>
          <Text>
            Choose "Upload Receipt Image" to take a picture of your grocery receipt
            or upload a receipt from your camera roll to automatically add food
            with their expiration dates to your new shopping trip!
            {"\n"}{"\n"}
            Choose "Upload Items Manually" to add each food individually to your
            new shopping trip!
          </Text>
          <Pressable
              style={styles.button}
              onPress={() => {
                setInfoModal(!infoModal);
              }}
            >
              <Text style={styles.buttonTitle}>Close</Text>
          </Pressable>
          </View>
        </Modal> : <></>}
    </View>
  );
}

const mapDispatch = (dispatch) => {
  return {
    loadToken: (token) => dispatch(setToken(token)),
  };
};

export default connect(null, mapDispatch)(NewOrderScreen);

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      token = 'No token available'
    } else{

      token = (await Notifications.getExpoPushTokenAsync()).data;
    }

  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
