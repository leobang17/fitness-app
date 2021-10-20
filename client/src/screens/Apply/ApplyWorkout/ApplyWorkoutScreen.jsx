import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const ApplyWorkoutScreen = ({ navigation }) => {
    return (
        <View style = {styles.container}>
            <Text>apply - workout 적용하는 screen</Text>
            <Button title = "go to add workout" onPress = {() => navigation.navigate("ApplyWorkoutAdd")} />
        </View>
        
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    
})



export default ApplyWorkoutScreen
