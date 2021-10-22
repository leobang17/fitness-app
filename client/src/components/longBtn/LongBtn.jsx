import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const { width }= Dimensions.get("window");


const LongBtn = ({ params, onPress }) => {
    return (
        <TouchableOpacity
            style = {[
                styles.container,
                (params.type === "goToAdd")
                ? styles.container__goToAdd
                : (params.type === "addWorkoutBtn")
                ? styles.container__addWorkoutBtn
                : null
            ]}
            onPress = {() => onPress()}
        >
            <Text
                style = {[
                    styles.btnText,
                    (params.type === "addWorkoutBtn")
                    ? styles.btnText__addWorkoutBtn
                    : null
                ]}
            >
                {params.innerText}
            </Text>
            
        </TouchableOpacity>
    )
}

export default LongBtn

const styles = StyleSheet.create({
    container: {
        height: 35,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 5, height: 5},
        shadowColor: "gray",
        shadowOpacity: 0.5
    },
    container__goToAdd: {
        backgroundColor: "#E8E1D9",
        width: width * 0.8,
    },
    container__addWorkoutBtn: {
        backgroundColor: "#87C5D6",
        width: width * 0.8,
    },
    btnText: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    btnText__goToAdd: {
        
    },
    btnText__addWorkoutBtn: {
        color: "white",
        fontWeight: "normal"
    }

})
