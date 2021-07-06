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

const store = configureStore();

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

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
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name="NewOrder" component={NewOrderScreen} />
              <Stack.Screen name="ReviewOrder" component={ReviewOrder} />
              <Stack.Screen
                name="Scanner"
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
                {(props) => <Scanner {...props} extraData={user} />}
                {/* {(props) => <AllRecipes {...props} extraData={user} />} */}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
const appName = 'TasteNotWaste';

AppRegistry.registerComponent(appName, () => RNRedux);
