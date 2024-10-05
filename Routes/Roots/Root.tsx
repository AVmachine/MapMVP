import React, {useEffect} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Lists from './Lists'
import {Ionicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Root() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home"
                        component={Home}
                        options={{
                            tabBarIcon: () => (<Ionicons name="home" color="black" size="20"/>)
                        }}
            ></Tab.Screen>
            <Tab.Screen name="Lists" component={Lists} options={{
                tabBarIcon: () => (<Ionicons name="list" color="black" size="20"/>)
            }}></Tab.Screen>
        </Tab.Navigator>
    );
}