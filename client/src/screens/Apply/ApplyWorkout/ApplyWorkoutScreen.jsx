import React from 'react'
import { View, Text, Button } from 'react-native'

const ApplyWorkoutScreen = ({ navigation }) => {
    return (
        <View>
            <Text>apply - workout 적용하는 screen</Text>
            <Button title = "go to add workout" onPress = {() => navigation.navigate("ApplyWorkoutAdd")} />
        </View>
        
    )
}

export default ApplyWorkoutScreen
