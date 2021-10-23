import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const TypeBox = ({ params, btnToggle, index, isSelected }) => {
    return (
        <TouchableOpacity
            style = {[
                styles.container,
                (isSelected)
                ? styles.container__selected
                : null
            ]}
            onPress = {() => btnToggle(index)}
        >
            <Text
                style = {[
                    styles.type__text,
                    (isSelected)
                    ? styles.type__text__selected
                    : null
                ]}
            >
                {params}
            </Text>
        </TouchableOpacity>
    )
}

export default TypeBox

const HEIGHT = 35;

const styles = StyleSheet.create({
    container: {
        height: HEIGHT,
        borderRadius: 20,
        marginHorizontal: 5,
        marginVertical: 2,
        borderColor: "gray",
        borderWidth: 1.5
    },
    type__text: {
        flex: 1,
        paddingHorizontal: 15,
        lineHeight: HEIGHT
    },
    container__selected: {
        backgroundColor: '#87C5D6',
        borderColor: '#87C5D6',
    },
    type__text__selected: {
        color: "white"
    }
})
