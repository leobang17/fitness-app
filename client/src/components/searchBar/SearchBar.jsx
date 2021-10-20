import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const SearchBar = ({ params, keywordHandler }) => {
    return (
        <TextInput
            placeholder = {params}
            onChangeText = {keywordHandler}
        />
    )
}

export default SearchBar

const styles = StyleSheet.create({})
