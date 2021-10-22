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
                : null
            ]}
            onPress = {() => onPress()}
        >
            <Text
                style = {[
                    styles.btnText
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
        alignItems: 'center'
    },
    container__goToAdd: {
        backgroundColor: "#E8E1D9",
        width: width * 0.8,
        shadowOffset: { width: 5, height: 5},
        shadowColor: "gray",
        shadowOpacity: 0.5
    },
    btnText: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    btnText__goToAdd: {
        
    }

})
