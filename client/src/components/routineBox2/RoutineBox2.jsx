import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const { width } = Dimensions.get("window");

const RoutineBox2 = ({ params, onPress }) => {
    
    return (
        <TouchableOpacity
            style = {styles.container}
            onPress = {() => onPress(params.routine.id, params.routine.name)}
        >
            <Text
                style = {styles.innerText}
            >
                {params.routine.name}
            </Text>
        </TouchableOpacity>
    )
}

export default RoutineBox2

const styles = StyleSheet.create({
    container: {
        width: width * 0.8,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "#DFDFDF",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 5, height: 5},
        shadowColor: "gray",
        shadowOpacity: 0.5
    },
    innerText: {
        fontSize: 18,
        paddingVertical: 20,
    }
})
