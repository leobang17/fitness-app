import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const WorkoutStartBox = ( params ) => {
    const { index, innerText, setCount, setAvg, onPress } = params
    return (
        <TouchableOpacity
            style = {styles.container}
            onPress = {() => onPress(index)}
        >
            <View style = {styles.text__area}>
                <Text>
                    {innerText}
                </Text>
                <Text>
                    {setCount} x {setAvg}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default WorkoutStartBox

const styles = StyleSheet.create({
    container: {
        width: "80%",
        alignSelf: 'center',
        backgroundColor: "#87C5D6"
    }, 

})
