import React, {useState} from 'react'
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'


const CategoryBox = ({ params, onPress, index }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        console.log(isEnabled);
        setIsEnabled((prev) => !prev);
    }

    return (
        <TouchableOpacity style = {styles.category__box} onPress = {() => onPress(index)} value = {isEnabled}>
            <Text style = {styles.category__text}>{params}</Text>
        </TouchableOpacity>
    )
}

export default CategoryBox

const HEIGHT = 35;

const styles = StyleSheet.create({
    category__box: {
        height: HEIGHT,
        borderRadius: 20,
        marginHorizontal: 5,
        borderColor: "gray",
        borderWidth: 1
    },
    category__text: {
        flex: 1,
        paddingHorizontal: 15,
        lineHeight: HEIGHT
    }
    
})
