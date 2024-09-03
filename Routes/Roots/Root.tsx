import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Lists from './Lists'

const Tab = createBottomTabNavigator();

export default function Root(){
    return (
           <Tab.Navigator>
               <Tab.Screen name="Home" component={Home}></Tab.Screen>
               <Tab.Screen name="Lists" component={Lists}></Tab.Screen>
           </Tab.Navigator>
    );
}