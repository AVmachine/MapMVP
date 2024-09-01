import {View} from 'react-native';
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Button, HelperText, Text, TextInput} from "react-native-paper";

export default function Login({navigation})
{
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [hasErrors, setHasErrors] = useState<boolean>(false);


    async function attemptLogin() {
        let validAttempt : boolean = false;
        try {
            let response =
                await axios.post('http://localhost:5081/UserLogin', { email, password });
            validAttempt = response.data;
        } catch (error) {
            console.error('Login attempt failed:', error);
        }
        return validAttempt;
    }

    const login = async () => {
        try {
            if (await attemptLogin()) {
                setHasErrors(false);
                navigation.navigate('Root');
            } else {
                console.log('Login failed');
                setHasErrors(true);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    return(

        <View style={{flex:1, justifyContent: 'center'}}>
            <Text style={{marginLeft:5}} variant="displayLarge" >Login</Text>
            <TextInput  autoCapitalize="none" style={{marginBottom: 10}} label="Email" value={email} onChangeText={(text) => setEmail(text)} />
            <TextInput autoCapitalize="none" style={{marginBottom: 10}} secureTextEntry={true} label="Password" onChangeText={(text) => setPassword(text)}/>
            <Button onPress={() => login()} mode="outlined" style={{width: 200, marginHorizontal:"auto"}} buttonColor="grey" textColor="white">Login</Button>
            <HelperText style={{marginBottom:5, marginHorizontal: "auto"}} type="error" visible={hasErrors}>
                Email or Password is invalid.
            </HelperText>
        </View>
    )

}

