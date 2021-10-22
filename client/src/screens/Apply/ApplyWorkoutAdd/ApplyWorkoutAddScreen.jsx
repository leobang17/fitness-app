import axios from 'axios';
import React, { useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import { URI } from '../..';
import { CategoryBox, LongBtn } from '../../../components';

const { width } = Dimensions.get("window");

const ApplyWorkoutAddScreen = ({ navigation }) => {
    // State
    const [categories, setCategories] = useState([{"name": "marked"}]);
    const [workoutName, setWorkoutName] = useState("");
    const [selectedCategorys, setSelectedCategorys] = useState([]);
    
    // Hook
    useEffect(() => {
        const getCategoryList = async () => {
            const res = await axios.get(`${URI}/category`)
            setCategories(prev => [...prev, ...res.data]);
        }
        getCategoryList();
    }, [])

    // Event Handler
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
            <View style = {styles.inputTextBox__area}>
                <TextInput 
                    style = {styles.inputTextBox}
                    placeholder = "추가할 운동의 이름을 입력하세요."
                    onChangeText = {(value) => setWorkoutName(value)}
                />
            </View>
            <View style = {styles.category__area}>
                <Text style = {styles.title__text}>
                    카테고리
                </Text>
                <View style = {styles.category__boxs__area}>
                    {
                        categories.map((category, index) => {
                            let isSelected;
                            if (selectedCategorys.includes(index)) {
                                isSelected = true;
                            } else {
                                isSelected = false;
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
                </View>
            </View>
            <View style = {styles.type__area}>
                <View>
                    <Text style = {styles.title__text}>
                        타입
                    </Text>
                </View>
            </View>
            
            <LongBtn 
                params = {{innerText: "운동 추가하기", type: "addWorkoutBtn"}}
                onPress = {() => navigation.goBack()}
            />
        </View>
    )
}

export default ApplyWorkoutAddScreen

const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      width: width * 0.85,
      alignSelf: 'center',
    },
    inputTextBox__area: {
        marginVertical: 10,
        paddingTop: 10,
        paddingBottom: 2,
        borderBottomWidth: 2,
        borderBottomColor: "#D5D5D5",
        // borderBottomStartRadius: 10,
        // borderBottomEndRadius: 10,
        flexGrow: 1,
    },
    inputTextBox: {
        marginLeft: 5
    },
    title__text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    category__area: {
        marginVertical: 10,
        flexDirection: 'column'
    },
    category__boxs__area: {
        marginVertical: 10,
        flexDirection: 'row',
        flexWrap: "wrap"    
    },
    type__area: {
        marginVertical: 10
    }
    
})
