import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const AddStartBtn = ( { params, onPress } ) => {
    return (
        <TouchableOpacity 
            style = {[
                styles.container, 
                (params.type === "mainAdd" || params.type === "mainStart")
                ? styles.container__mainBottom
                : 
                (params.type === "apply")
                ? styles.container__apply
                : null
            ]} 
            onPress = {() => onPress()}>
            <Text 
                style = {[
                    styles.text,
                    (params.type === "mainAdd" || params.type === "mainStart")
                    ? styles.text__mainBottom
                    :
                    (params.type === "apply")
                    ? styles.text__apply
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
        height: 40,
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
    text: {
        paddingHorizontal: 10,
    },
    text__mainBottom: {
        color: 'gray' 
    },
    text__apply: {
        color: "white"
    }
})
