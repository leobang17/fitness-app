import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const WorkoutStartBox = ( params ) => {
    const { index, innerText, setCount, setAvg } = params
    return (
        <View>
            <Text>{innerText}, {setCount}, {setAvg}</Text>
        </View>
    )
}

export default WorkoutStartBox

const styles = StyleSheet.create({})
