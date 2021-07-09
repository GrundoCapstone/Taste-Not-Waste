import React from 'react';
import styles from './styles';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Scanner from '../Scanner/Scanner';
import ReviewOrder from '../ReviewOrder/ReviewOrder';
import {setToken} from '../../store/user'
import { connect } from 'react-redux'

const Stack = createStackNavigator();

function NewOrderScreen({ navigation })
{

  // const [expoPushToken, setExpoPushToken] = useState('');

  // useEffect(() => {
  //   const token = registerForPushNotificationsAsync();setExpoPushToken(token);
  //   this.props.loadToken(token)
  // })
  return (
    <>
      <Stack.Navigator initialRouteName="NewOrderOptions">
        <Stack.Screen name="NewOrderOptions" component={NewOrderOptions} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="ReviewOrder" component={ReviewOrder} />
      </Stack.Navigator>
    </>
  );
}

function NewOrderOptions({ navigation }) {
  const onUseImageReceiptPress = () => {
    navigation.navigate('Scanner');
  };

  const onNewOrderPress = () => {
    navigation.navigate('ReviewOrder');
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
    </View>
  );
}

const mapDispatch = (dispatch) => {
  return {
    loadToken: (token) => setToken(token)
  }
}

export default connect(null, mapDispatch)(NewOrderScreen);

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
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
