import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'

const {width} = Dimensions.get("window");

const RoutineBox = ({ record, params ,onPress }) => {
    console.log(params.type);
    
    return (
        <TouchableOpacity 
            style = {styles.routine__container}
            onPress = {
                (params.type === "fromApplyStackDetail")
                ? (() => onPress(params.index))
                : null
            }
        >
            <Text style = {styles.routine__text}>{record.name}</Text>
        </TouchableOpacity>
    )
}

export default RoutineBox

const styles = StyleSheet.create({
    routine__container: {
        width: width * 0.8,
        alignSelf: 'center',
        height: 45,
        backgroundColor: "#87C5D6",
        marginVertical: 10,
        borderRadius: 15,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'  
    },
    routine__text: {
        color: 'white',
        fontSize: 17
        
    }
})
