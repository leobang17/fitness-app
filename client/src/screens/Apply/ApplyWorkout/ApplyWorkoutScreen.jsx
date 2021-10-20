import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import { SearchBar } from '../../../components';

const ApplyWorkoutScreen = ({ navigation }) => {
    const [keyword, setKeyword] = useState("");
    const keywordHandler = (value) => {
        setKeyword(value);
    }

    return (
        <View style = {styles.container}>
            <SearchBar params = {"찾으려는 운동을 검색해보세요."} keywordHandler = {keywordHandler} />
            <Text>{keyword}</Text>
            <Button title = "go to add workout" onPress = {() => navigation.navigate("ApplyWorkoutAdd")} />
        </View>
        
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    },

})



export default ApplyWorkoutScreen
