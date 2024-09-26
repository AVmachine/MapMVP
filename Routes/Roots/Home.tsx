import MapView from "react-native-maps";
import {View} from "react-native";
import React, {useEffect} from "react";
import {Text} from 'react-native-paper';
import store from "../../store";
import {useNavigationState} from "@react-navigation/native";

export default function Home() {

    // Get the current navigation state and the index of the active tab
    const navigationState = useNavigationState(state => state);

// Get the current active tab's route name
    const currentTab = navigationState.routes[navigationState.index].name;

    useEffect(() => {
        console.log(currentTab);
    }, [currentTab]);

    const myState = store.getState();
    console.log(myState);

    return (
        <View>
            <MapView style={styles.map}
                     region={{
                         latitude: 37.78825,
                         longitude: -122.4324,
                         latitudeDelta: 0.015,
                         longitudeDelta: 0.0121,
                     }}
            >
            </MapView>
        </View>
    );
}

const styles = {
    map: {
        width: '100%',
        height: '100%',
    }
}
