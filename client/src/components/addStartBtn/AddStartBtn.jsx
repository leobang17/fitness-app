import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const AddStartBtn = ( { params, onPress, index } ) => {
    return (
        <TouchableOpacity 
            style = {[
                styles.container, 
                (params.type === "mainAdd" || params.type === "mainStart")
                ? styles.container__mainBottom
                : 
                (params.type === "apply")
                ? styles.container__apply
                : 
                (params.type === "startWorkout")
                ? styles.container__startWorkout
                : null
            ]} 
            onPress = {() => onPress(params.onPressParams || null)}>
            <Text 
                style = {[
                    styles.text,
                    (params.type === "mainAdd" || params.type === "mainStart")
                    ? styles.text__mainBottom
                    :
                    (params.type === "apply")
                    ? styles.text__apply
                    : 
                    (params.type === "startWorkout")
                    ? styles.text__startWorktout
                    : null
                ]}
            >
                {params.innerText}
            </Text>
        </TouchableOpacity>
    )
}

export default AddStartBtn

const styles = StyleSheet.create({
    container: {
        height: 35,
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container__mainBottom: {
        borderColor: "#87C5D6",
        backgroundColor: "white",
    },
    container__apply: {
        borderColor: "#87C5D6",
        backgroundColor: "#87C5D6"
    },
    container__startWorkout: {
        borderColor: "#87C5D6",
        backgroundColor: "#87C5D6",
        borderRadius: 10,
        
    },  
    text: {
        paddingHorizontal: 15,
    },
    text__mainBottom: {
        color: 'gray' 
    },
    text__apply: {
        color: "white"
    },
    text__startWorktout: {
        color: '#FFFFFF'
    }
})
