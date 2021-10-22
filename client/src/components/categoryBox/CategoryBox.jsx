import React, {useState} from 'react'
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 


const CategoryBox = ({ params, categoryToggle, index, isSelected }) => {
    return (
        <TouchableOpacity style = {[styles.category__box, (isSelected) ? styles.selected__category__box : null]} onPress = {() => categoryToggle(index)}>
            {
                // render favorite (index = 0)
                (index == 0)? (
                    (isSelected) ? (
                        <AntDesign 
                            name="star" 
                            size={20} 
                            color="white" 
                            style = {styles.category__text} 
                        />
                    ): (
                        <AntDesign 
                            name="star" 
                            size={20} 
                            color="#87C5D6" 
                            style = {styles.category__text} 
                        />    
                    )
                ): (
                    // render other categories (index != 0)
                    <Text 
                        style = {[
                            styles.category__text,
                            (isSelected)
                            ? styles.selected__category__text
                            : null
                        ]}
                    >
                        {params}
                    </Text>
                )
            }
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
        marginVertical: 2,
        borderColor: "gray",
        borderWidth: 1.5
    },
    category__text: {
        flex: 1,
        paddingHorizontal: 15,
        lineHeight: HEIGHT
    },
    selected__category__box: {
      backgroundColor: '#87C5D6',
      borderColor: '#DDDDDD',
    },
    selected__category__text: {
        color: 'white'
    }
})
