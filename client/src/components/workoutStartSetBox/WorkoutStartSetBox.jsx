import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const WorkoutStartSetBox = (params) => {
    const { key, reps, weight } = params;
    return (
        <View>
            <Text>
                {reps} reps
            </Text>
            <Text>
                {weight} kgs
            </Text>
        </View>
    )
}

export default WorkoutStartSetBox

const styles = StyleSheet.create({})
