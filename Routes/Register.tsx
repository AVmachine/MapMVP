import React, {useState} from "react";
import {Button, HelperText, Text, TextInput} from "react-native-paper";
import {View} from "react-native";
import axios from "axios";
import {saveHomePage} from "../PageSlice";
import {useDispatch} from 'react-redux';

export default function Register({navigation}) {

    const [email, setEmail] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [hasErrors, setHasErrors] = useState<string>();
    const dispatch = useDispatch();



    //check if email is already used
    async function checkIfEmailInUse()
    {
        let exists: boolean = false;
        try{
            let response = await axios.get("http://localhost:5081/api/CreateUser?email=" + email);
            exists = response.data;
            if(exists)
            {
                setHasErrors("Email is already in use");
            }
        }
        catch(err){
            console.log(err);
        }
        console.log("email Checked");
        return exists;
    }

    function checkPasswordsMatch()
    {
        console.log("passwords checked");
        if(password1 === password2)
        {
            console.log("Passwords match");
            return true
        }
        else
        {
            setHasErrors("Passwords do not match");
            return false;
        }

    }

    //create account, redirect to login
    async function createNewAccount(): Promise<void> {
        if(checkPasswordsMatch() && !(await checkIfEmailInUse()))
        {
            console.log("Checks Passed");
            if(email && password1 && password2 && firstName && lastName)
            {
                let success: boolean = false;
                try{
                    let user: User = {
                        FirstName: firstName,
                        LastName: lastName,
                        Email: email,
                        Password: password1,
                    }
                    let response = await axios.post("http://localhost:5081/api/CreateUser", user);
                    success = response.data;
                }
                catch(err){
                    console.log(err);
                }

                if(success)
                {
                    setHasErrors("");
                    await dispatch(saveHomePage()).unwrap();
                    navigation.navigate('Login');
                }
            }
        }

    }

    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={{marginLeft: 5}} variant="displaySmall">Create a new account</Text>
            <TextInput autoCapitalize="none" style={{marginBottom: 10}} label="First Name" value={firstName}
                       onChangeText={(text) => setFirstName(text)}/>
            <TextInput autoCapitalize="none" style={{marginBottom: 10}} label="Last Name" value={lastName}
                       onChangeText={(text) => setLastName(text)}/>
            <TextInput autoCapitalize="none" style={{marginBottom: 10}} label="Email" value={email}
                       onChangeText={(text) => setEmail(text)}/>
            <TextInput autoCapitalize="none" style={{marginBottom: 10}} secureTextEntry={true} label="Password"
                       onChangeText={(text) => setPassword1(text)}/>
            <TextInput autoCapitalize="none" style={{marginBottom: 10}} secureTextEntry={true} label="Verify Password"
                       onChangeText={(text) => setPassword2(text)}/>
            <Button onPress={() => createNewAccount()} mode="outlined" style={{width: 200, marginHorizontal: "auto"}}
                    buttonColor="grey" textColor="white">Create Account</Button>
            <HelperText style={{marginBottom: 5, marginHorizontal: "auto"}} type="error" visible={hasErrors != null}>
                {hasErrors}
            </HelperText>
        </View>
    );
}