import React, {useEffect} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Lists from './Lists'
import {Ionicons} from '@expo/vector-icons';
import {useNavigationState} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPageEmpty, setCurrentTabLists} from "./TabSlice";

const Tab = createBottomTabNavigator();

export default function Root() {

    const Tab = createBottomTabNavigator();
    const dispatch = useDispatch();
    const state = useNavigationState(state => state);

    useEffect(() => {
        const activeTabName = state.routes[state.index].name;
        if(activeTabName == "Home")
            dispatch(setCurrentPageEmpty());
        if(activeTabName == "Lists")
            dispatch(setCurrentTabLists());
    }, [state, dispatch]);

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