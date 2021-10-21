import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, ScrollView } from 'react-native'

import { URI } from '../..';
import { CategoryBox, SearchBar } from '../../../components';

const ApplyWorkoutScreen = ({ navigation }) => {
    // States
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState([{"name": "marked"}])
    const [selectedCategorys, setSelectedCategorys] = useState([])
    
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

    // Event Handlers
    const keywordHandler = (value) => {
        setKeyword(value);
    }

    const categoryToggle = (key) => {
        if (selectedCategorys.includes(key)) {
            setSelectedCategorys((prev) => {
                return prev.filter(keys => keys !== key).sort();
            })
        } else {
            setSelectedCategorys((prev) => [...prev, key].sort())
        }
    }

    
    return (
        <View style = {styles.container}>
            {/* search bar */}
            <View style = {styles.searchBar}>
                <SearchBar params = {"찾으려는 운동을 검색해보세요."} keywordHandler = {keywordHandler} />
            </View>

            {/* category scrollview */}
            <View style = {styles.category__area}>
                <ScrollView 
                    horizontal 
                    style = {styles.category__scroll}
                    showsHorizontalScrollIndicator = {false}
                >
                    {
                        category.map((category, index) => {
                            let isSelected;
                            if (selectedCategorys.includes(index)) {
                                isSelected = true;
                            } else {
                                isSelected = false
                            }
                            return (
                                <CategoryBox 
                                    key = {index} 
                                    index = {index} 
                                    params = {category.name} 
                                    categoryToggle = {categoryToggle} 
                                    isSelected = {isSelected}
                                />
                            )
                        })
                    }
                </ScrollView>
            </View>

            {/* workout list scrollview */}
            <View>
                <ScrollView>
                    
                </ScrollView>
            </View>

            <View>
                
            </View>

            <Button title = "go to add workout" onPress = {() => navigation.navigate("ApplyWorkoutAdd")} />
        </View>
        
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection: 'column'
    },
    searchBar: {
        marginVertical: 10
    },
    category__area: {
        paddingBottom: 10,
    },
    category__scroll: {
    }
})


export default ApplyWorkoutScreen
