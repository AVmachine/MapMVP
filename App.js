import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {PaperProvider} from "react-native-paper";

//Redux
import store from './store';
import {Provider} from 'react-redux';

//Routes
import Login from './Routes/Login'
import Root from "./Routes/Roots/Root";
import CreateNewAccount from "./Routes/CreateNewAccount";
import {configureStore} from "@reduxjs/toolkit";
import {useEffect, useState} from "react";


const Stack = createNativeStackNavigator();


export default function App() {

    const myState = store.getState();

    useEffect(() => {
        console.log(myState);
    }, [myState]);

  return (
      <Provider store={store}>
          <PaperProvider>
              <NavigationContainer>
                  <Stack.Navigator initialRouteName="Login">
                      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                      <Stack.Screen name="CreateNewAccount" component={CreateNewAccount} options={{headerShown: false}} />
                      <Stack.Screen name="Root" component={Root} options={{ headerBackButtonMenuEnabled: true, headerShown: false }} />
                  </Stack.Navigator>
              </NavigationContainer>
          </PaperProvider>
      </Provider>
  );
}
