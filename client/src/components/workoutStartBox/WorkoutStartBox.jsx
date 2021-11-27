import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const WorkoutStartBox = ( params ) => {
    const { innerText } = params
    return (
        <View>
            <Text>{innerText}</Text>
        </View>
    )
}

export default WorkoutStartBox

const styles = StyleSheet.create({})
