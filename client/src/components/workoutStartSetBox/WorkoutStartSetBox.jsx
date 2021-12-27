import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const WorkoutStartSetBox = (params) => {
    const { key, reps, weight } = params;
    return (
        <TouchableOpacity>
            <Text>
                {reps} reps
            </Text>
            <Text>
                {weight} kgs
            </Text>
        </TouchableOpacity>
    )
}

export default WorkoutStartSetBox

const styles = StyleSheet.create({})
