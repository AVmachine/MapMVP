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
import Register from "./Routes/Register";
import {configureStore} from "@reduxjs/toolkit";
import {useEffect, useState} from "react";
import {storeData} from "./Services/AsyncStorageService";


const Stack = createNativeStackNavigator();


export default function App() {

    const myState = store.getState();

    useEffect(() => {
        console.log(myState);
        storeData("CurrentPage", myState.currentPage);
    }, [myState]);

  return (
      <Provider store={store}>
          <PaperProvider>
              <NavigationContainer>
                  <Stack.Navigator initialRouteName="Login">
                      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                      <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
                      <Stack.Screen name="Root" component={Root} options={{ headerBackButtonMenuEnabled: true, headerShown: false }} />
                  </Stack.Navigator>
              </NavigationContainer>
          </PaperProvider>
      </Provider>
  );
}
