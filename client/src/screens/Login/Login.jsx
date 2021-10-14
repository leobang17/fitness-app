import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const Login = ({ route }) => {
    const pressHandler = route.params.pressHandler;
    return (
        <View style = {styles.container}>
            <Button title = "카톡 로그인" style = {styles.login__btn} onPress = {pressHandler} />
            <Button title = "구글 로그인" style = {styles.login__btn} onPress = {pressHandler} />
        </View>
    )
}

export default Login


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