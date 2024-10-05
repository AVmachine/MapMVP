import MapView from "react-native-maps";
import {View} from "react-native";
import React, {useEffect} from "react";
import {Text} from 'react-native-paper';
import store from "../../store";
import {useNavigationState} from "@react-navigation/native";

export default function Home() {

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
