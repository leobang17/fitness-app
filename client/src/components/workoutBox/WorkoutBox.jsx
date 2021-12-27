import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 


const WorkoutBox = ({ params, workoutToggle, workoutMarkToggle, isSelected, isMarked}) => {
    return (
        <View style = {styles.container}>
            <TouchableOpacity 
                style = {styles.checkable__area}
                onPress = {() => workoutToggle(params.index)}
            >
                {
                    (isSelected)
                    ? (
                        <FontAwesome name="check-circle" size={30} color="#87C5D6" style = {styles.checkBtn} />
                    )
                    : (
                        <FontAwesome name="circle-o" size={30} color="#87C5D6" style = {styles.checkBtn} />
                    )
                }
                <Text
                    style = {[
                        styles.text
                    ]}
                >
                    {params.innerText}
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                onPress = {() => workoutMarkToggle(params.index)}
            >
                {
                    (isMarked)
                    ? (
                        <AntDesign name="star" size={20} color="#87C5D6" />
                    )
                    : (
                        <AntDesign name="staro" size={20} color="#87C5D6" />
                    )
                }
            </TouchableOpacity>
        </View>
    )
}

export default WorkoutBox

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    checkable__area: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBtn: {
        marginRight: 20
    },
    text: {
        fontSize: 16,
        paddingVertical: 10
    }
})
