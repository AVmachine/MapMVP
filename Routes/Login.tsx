import {View} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';
import {saveHomePage, saveRegisterPage} from '../PageSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function Login({navigation}) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [hasErrors, setHasErrors] = useState<boolean>(false);
    const dispatch = useDispatch();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    async function attemptLogin() {
        let validAttempt = false;
        try {
            let response = await axios.post('http://localhost:5081/api/UserLogin', {email, password});
            validAttempt = response.data;
        } catch (error) {
            console.error('Login attempt failed:', error);
        }
        return validAttempt;
    }

    const login = async () => {
        if (!validateEmail(email)) {
            setHasErrors(true);
            return;
        }

        try {
            if (await attemptLogin()) {
                setHasErrors(false);

                // Wait for saveHomePage to finish before navigating
                await dispatch(saveHomePage()).unwrap();
                navigation.navigate('Root');
            } else {
                console.log('Login failed');
                setHasErrors(true);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const navigateToRegister = async () => {
        await dispatch(saveRegisterPage()).unwrap();
        navigation.navigate('Register');
    };

    return (
        <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
            <Text style={{marginBottom: 20}} variant="displayLarge">Login</Text>
            <TextInput
                autoCapitalize="none"
                style={{marginBottom: 10}}
                label="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                autoCapitalize="none"
                style={{marginBottom: 10}}
                secureTextEntry
                label="Password"
                value={password}
                onChangeText={setPassword}
            />
            <Button
                onPress={login}
                mode="outlined"
                style={{width: 200, alignSelf: 'center'}}
                contentStyle={{backgroundColor: 'grey'}}
                textColor="white"
            >
                Login
            </Button>
            <HelperText type="error" visible={hasErrors}>
                {validateEmail(email)
                    ? 'Email or Password is invalid.'
                    : 'Please enter a valid email.'}
            </HelperText>
            <Button onPress={navigateToRegister}>Register here</Button>
        </View>
    );
}
