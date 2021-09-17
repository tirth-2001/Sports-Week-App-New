import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { TransitionSpecs } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';


import HomeScreen from './screens/HomeScreen';
import AdminPanel from './screens/AdminPanel';
import SplashScreen from './screens/SplashScreen';
import RegisterUser from './screens/RegisterUser';
import Announcements from './screens/Announcements';

const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'SplashScreen'}>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              header: () => {
                null;
              },
            }}
          />

          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              header: () => {
                null;
              },
            }}
          />

          <Stack.Screen name="AdminPanel" component={AdminPanel} />
          <Stack.Screen
            name="Register"
            component={RegisterUser}
            options={{title: 'Register Player', headerTitleStyle: {
              color: '#fff',
            },
            headerStyle: {
              backgroundColor: '#2e3e7e',
              },
            headerTintColor: '#fff'
            
            }}
          />
          <Stack.Screen name="Announcements" component={Announcements}
            options={{
              title: 'Announcements', headerTitleStyle: {
              color: '#fff',
            },
            headerStyle: {
              backgroundColor: '#2e3e7e',
              },
            headerTintColor: '#fff'
            
            }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    backgroundColor: '#fff',
  },
});

export default Routes;
