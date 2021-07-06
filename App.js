import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { firebase } from './src/firebase/config';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  LoginScreen,
  FridgeScreen,
  RegistrationScreen,
  AllRecipes,
  Scanner,
  NewOrderScreen,
  ReviewOrder,
} from './src/screens';
import { Button, AppRegistry } from 'react-native';
import { decode, encode } from 'base-64';
import DummyNotification from './src/screens/ReusableComponenets/DummyNotification';
import { Provider } from 'react-redux';
import configureStore from './src/store';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const store = configureStore();

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

// const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setUser(userData);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#020202"
          inactiveColor="#757575"
          barStyle={{ backgroundColor: '#6ED8BE' }}
          shifting={false}
        >
          {user ? (
            <>
              {/* <Tab.Screen name="NewOrder" component={NewOrderScreen} /> */}
              <Tab.Screen name="Fridge" component={FridgeScreen} />
              <Tab.Screen
                name="New Order"
                options={{
                  headerRight: () => (
                    <Button
                      onPress={() => {
                        firebase.auth().signOut().then(setUser(null));
                      }}
                      title="Logout"
                      color="black"
                    />
                  ),
                }}
              >
                {(props) => <NewOrderScreen {...props} extraData={user} />}
                {/* {(props) => <AllRecipes {...props} extraData={user} />} */}
              </Tab.Screen>
              <Tab.Screen name="All Recipes" component={AllRecipes} />
            </>
          ) : (
            <>
              <Tab.Screen name="Login" component={LoginScreen} />
              <Tab.Screen name="Registration" component={RegistrationScreen} />
            </>
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
const appName = 'TasteNotWaste';

AppRegistry.registerComponent(appName, () => RNRedux);
