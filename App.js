import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import firebase from './src/firebase/firebase';
import { NavigationContainer } from '@react-navigation/native';
import {
  LoginScreen,
  RegistrationScreen,
  AllRecipes,
  NewOrderScreen,
  UserProfile,
} from './src/screens';
import { AppRegistry } from 'react-native';
import { decode, encode } from 'base-64';
import { Provider } from 'react-redux';
import store from './src/store';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FridgeNavigator from './src/screens/FridgeScreen/FridgeNavigator';
import { useFonts } from '@use-expo/font';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Tab = createMaterialBottomTabNavigator();

const customFonts = {
  Kalam: require('./assets/fonts/Kalam/Kalam-Regular.ttf'),
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoaded] = useFonts(customFonts);

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
          activeColor="#D6EADF"
          inactiveColor="#6e8dc7"
          barStyle={{ backgroundColor: '#95B8D1' }}
          shifting={false}
        >
          {user ? (
            <>
              <Tab.Screen
                name="FridgeNavigator"
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
              >
                {(props) => <FridgeNavigator {...props} extraData={user} />}
              </Tab.Screen>
              <Tab.Screen
                name="New Order"
                options={{
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
              <Tab.Screen
                name="User Profile"
                component={UserProfile}
                options={{
                  tabBarLabel: 'Profile',
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="person-sharp" color={color} size={26} />
                  ),
                }}
              />
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
