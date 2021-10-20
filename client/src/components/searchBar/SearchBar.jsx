import React from 'react'
import { Dimensions, StyleSheet, TextInput, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 


const { width } = Dimensions.get('window');


const SearchBar = ({ params, keywordHandler }) => {
    return (
        <View style = {styles.container}>
            <FontAwesome style = {styles.searchIcon} name="search" size={20} color="black" />
            <TextInput
                style = {styles.searchBar}
                placeholder = {params}
                onChangeText = {keywordHandler}
            />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container : {
        width: width * 0.9,
        height: 35,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: "#E6E6FA",
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center'
    },
    searchIcon: {
        marginLeft: 15,
        marginRight: 10,  
    },
})
