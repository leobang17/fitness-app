import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import { SERVER } from '..';

const AuthMain = ({ route }) => {
    // States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handlers
    const emailHandler = text => setEmail(text);
    const passwordHandler = text => setPassword(text);
    const submitHandler = async () => {
        const payload = {
            email, 
            password,
        };
        try {
            const res = await axios.post(`${SERVER}/auth/login`, payload);
            console.log(res);
        } catch(err) {
            console.error(err);
        };
    };

    return (
        <View style = {styles.container}>
            <TextInput 
                placeholder='이메일을 입력허세요'
                onChangeText={emailHandler}
            />
            <TextInput
                placeholder='비밀번호를 입력하세요'
                secureTextEntry = {true}
                onChangeText={passwordHandler}
            />
            <Button
                title='로그인'
                onPress={submitHandler}
            />
        </View>
    )
}

export default AuthMain


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    login__btn: {
        padding: 10,
    }
})