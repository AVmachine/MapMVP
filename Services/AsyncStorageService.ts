import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to store a simple string value
export const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error("Error saving data:", e);
    }
};

// Function to store an object as a string
export const storeObjectData = async (key: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error("Error saving object data:", e);
    }
};

// Function to retrieve a simple string value
export const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);  // Fetch value from AsyncStorage
        if (value !== null) {
            return value;  // Return the stored value if it's not null
        }
        return null;  // Return null if no value is found
    } catch (e) {
        console.error("Error reading data:", e);
        return null;  // Handle errors and return null
    }
};

// Function to retrieve and parse an object
export const getObjectData = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);  // Fetch JSON string from AsyncStorage
        return jsonValue != null ? JSON.parse(jsonValue) : null;  // Parse and return the object if found
    } catch (e) {
        console.error("Error reading object data:", e);
        return null;  // Handle errors and return null
    }
};
