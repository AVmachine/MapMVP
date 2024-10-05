import { FlatList, Text, View, StyleSheet } from "react-native";
import React from "react";
import store from "../../store";

export default function Lists() {
    const dummyList = [
        { key: 1, name: "Alex's List" },
        { key: 2, name: "Saaedeh's List" },
        { key: 3, name: "Chloe's List" },
        { key: 4, name: "Hadis's List" },
        { key: 5, name: "Scott's List" },
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={dummyList}
                renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        alignItems: 'center', // Center horizontally
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        textAlign: 'center', // Center text
    },
});
