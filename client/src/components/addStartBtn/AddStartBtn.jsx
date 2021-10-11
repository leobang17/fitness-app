import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const AddStartBtn = ( { params, onPress } ) => {
    return (
        <TouchableOpacity style = {styles.container} onPress = {() => onPress()}>
            <Text style = {styles.text}>{params}</Text>
        </TouchableOpacity>
    )
}

export default AddStartBtn

const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 40,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#87C5D6",
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'gray'
    }
})
