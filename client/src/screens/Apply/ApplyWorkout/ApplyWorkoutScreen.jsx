import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput } from 'react-native'

import { URI } from '../..';
import { SearchBar } from '../../../components';

const ApplyWorkoutScreen = ({ navigation }) => {
    // States
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState([{"name": "marked"}])
    
    // Hooks
    useEffect(() => {
        const getCategoryList = async () => {
            try {
                const res = await axios.get(`${URI}/category`);
                setCategory((prev) => [...prev, ...res.data]);
            } catch (err) {
                console.log(err);
            }
        }
        getCategoryList();
    }, [])

    const keywordHandler = (value) => {
        setKeyword(value);
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.searchBar}>
                <SearchBar params = {"찾으려는 운동을 검색해보세요."} keywordHandler = {keywordHandler} />
            </View>
            <View>
                {
                    category.map((category) => {
                        return (
                            <Text>
                                {category.name}
                            </Text>
                        )
                    })
                }
            </View>
            <Text>{keyword}</Text>

            <Button title = "go to add workout" onPress = {() => navigation.navigate("ApplyWorkoutAdd")} />
        </View>
        
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    searchBar: {
        marginVertical: 10
    }

})



export default ApplyWorkoutScreen
