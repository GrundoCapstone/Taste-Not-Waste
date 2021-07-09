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
  NewOrderScreen,
<<<<<<< HEAD
=======
  ReviewOrder,
  SingleFood,
  UserProfile,
  LogoutScreen,
>>>>>>> 8149de36e89d9bae0b6b82ee3d8f605f732b56dd
} from './src/screens';
import { Button, AppRegistry, Platform } from 'react-native';
import { decode, encode } from 'base-64';
import { Provider } from 'react-redux';
import store from './src/store';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
<<<<<<< HEAD
import DummyNotification from './src/screens/ReusableComponents/DummyNotification';
import Constants from 'expo-constants';
=======
import Ionicons from 'react-native-vector-icons/Ionicons'

// const store = configureStore();
>>>>>>> 8149de36e89d9bae0b6b82ee3d8f605f732b56dd

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

<<<<<<< HEAD
//before boarding -> added register for notification function to bottom of App.js
//added useState for push tokens into App.js
// const Stack = createStackNavigator();
=======
>>>>>>> 8149de36e89d9bae0b6b82ee3d8f605f732b56dd
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
        setUser(null);
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
          inactiveColor="#61A393"
          barStyle={{ backgroundColor: '#6ED8BE' }}
          shifting={false}
        >
          {user ? (
            <>
              <Tab.Screen
                name="Fridge"
                component={FridgeScreen}
                options={{
                  tabBarLabel: 'Fridge',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="fridge"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />
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
                  tabBarLabel: 'New Order',
                  tabBarIcon: ({ color }) => (
                    <FontAwesome5
                      name="shopping-basket"
                      color={color}
                      size={20}
                    />
                  ),
                }}
              >
                {(props) => <NewOrderScreen {...props} extraData={user} />}
              </Tab.Screen>
              <Tab.Screen
                name="All Recipes"
                component={AllRecipes}
                options={{
                  tabBarLabel: 'All Recipes',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons
                      name="food-variant"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />
<<<<<<< HEAD
              <Tab.Screen name="Logout" component={DummyNotification} />
=======
              <Tab.Screen
                name="User Profile"
                component={UserProfile}
                options={{
                  tabBarLabel: 'Profile',
                  tabBarIcon: ({ color }) => (
                    <Ionicons
                      name="person-sharp"
                      color={color}
                      size={26}
                    />
                  ),
                }}
              />
>>>>>>> 8149de36e89d9bae0b6b82ee3d8f605f732b56dd
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
