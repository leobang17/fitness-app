import React from 'react'
import { View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ApplyRoutineScreen = ({ navigation }) => {
    return (
        <View>
            <Text>루틴 적용하는 screen</Text>
            <Button title = "to routine detail" onPress = {() => navigation.navigate("ApplyRoutineDetail")} />
        </View>
    )
}

export default ApplyRoutineScreen
