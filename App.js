import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {PaperProvider} from "react-native-paper";

//Routes
import Login from './Routes/Login'
import Root from "./Routes/Roots/Root";
import CreateNewAccount from "./Routes/CreateNewAccount";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <PaperProvider>
          <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                  <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                  <Stack.Screen name="CreateNewAccount" component={CreateNewAccount} options={{headerShown: false}} />
                  <Stack.Screen name="Root" component={Root} options={{ headerBackButtonMenuEnabled: true, headerShown: false }} />
              </Stack.Navigator>
          </NavigationContainer>
      </PaperProvider>
  );
}
