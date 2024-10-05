import React from 'react';
import store from './store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from "react-redux";
import {PaperProvider} from "react-native-paper";
import {storeObjectData, getObjectData} from "./Services/AsyncStorageService";

//Routes
import Login from './Routes/Login'
import Root from "./Routes/Roots/Root";
import Register from "./Routes/Register";



export default function App() { // Create a dispatch function to dispatch actions
    const Stack = createNativeStackNavigator();
    const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';
    const [isReady, setIsReady] = React.useState(Platform.OS === 'web'); // Don't persist state on web since it's based on URL
    const [initialState, setInitialState] = React.useState();

    React.useEffect(() => {
        console.log("App restarted and is attempting to restore previous state");
        const restoreState = async () => {
            try {
                const initialUrl = await Linking.getInitialURL();

                if (initialUrl == null) {
                    // Only restore state if there's no deep link
                    const savedStateString = await getObjectData(PERSISTENCE_KEY);
                    console.log(savedStateString);
                    const state = savedStateString
                        ? JSON.parse(savedStateString)
                        : undefined;

                    if (state !== undefined) {
                        console.log(state);
                        setInitialState(state);
                    }
                }
            } finally {
                setIsReady(true);
            }
        };
        if (!isReady) {
            restoreState();
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    }

    const setNavState = (state) => {
        console.log(`Nav State is being set to ${state.routes[state.index].name}.`);
        storeObjectData(PERSISTENCE_KEY, JSON.stringify(state));
    }

    return (
        <Provider store={store}>
            <PaperProvider>
                <NavigationContainer
                    initialState={initialState}
                    onStateChange={(state) => setNavState(state)}>
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

