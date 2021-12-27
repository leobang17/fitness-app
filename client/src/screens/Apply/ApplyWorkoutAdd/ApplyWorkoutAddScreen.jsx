import axios from 'axios';
import React, { useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import { URI } from '../..';
import { CategoryBox, LongBtn, TypeBox } from '../../../components';

const { width } = Dimensions.get("window");

const ApplyWorkoutAddScreen = ({ navigation }) => {
    // State
    const [categories, setCategories] = useState([{"name": "marked"}]);
    const [workoutName, setWorkoutName] = useState("");
    const [selectedCategorys, setSelectedCategorys] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    
    // Hook
    useEffect(() => {
        const getCategoryList = async () => {
            const resCategory = await axios.get(`${URI}/category`);
            const resType = await axios.get(`${URI}/type`);
            setCategories(prev => [...prev, ...resCategory.data]);
            setTypes(resType.data);
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

    const typeToggle = (key) => {
        if (selectedTypes.includes(key)) {
            setSelectedTypes((prev) => {
                return prev.filter(keys => keys !== key).sort();
            })
        } else {
            setSelectedTypes((prev) => [...prev, key].sort())
        }
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.inputTextBox__area}>
                <Text style = {styles.title__text}>
                    종목 이름
                </Text>
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
                <View style = {styles.boxs__area}>
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
                <Text style = {styles.title__text}>
                    타입
                </Text>
                <View style = {styles.boxs__area}>
                    {
                        types.map((type, index) => {
                            let isSelected;
                            if (selectedTypes.includes(index)) {
                                isSelected = true;
                            } else {
                                isSelected = false;
                            }
                            return (
                                <TypeBox 
                                    key = {index}
                                    index = {index}
                                    params = {type.name}
                                    btnToggle = {typeToggle}
                                    isSelected = {isSelected}
                                />
                            )
                        })
                    }
                    
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
      width: width,
      alignItems: 'center'
    },
    inputTextBox__area: {
        marginVertical: 15,
        paddingTop: 10,
        paddingBottom: 2,
        borderBottomWidth: 2,
        borderBottomColor: "#D5D5D5",
        // borderBottomStartRadius: 10,
        // borderBottomEndRadius: 10,
        width: width * 0.85,
        flexGrow: 1,
    },
    inputTextBox: {
        paddingTop: 20,
        marginLeft: 5
    },
    title__text: {
        width: width * 0.85,
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    category__area: {
        marginVertical: 10,
        flexDirection: 'column',
        marginBottom: 30
    },
    boxs__area: {
        width: width * 0.9,
        marginVertical: 10,
        flexDirection: 'row',
        flexWrap: "wrap"    
    },
    type__area: {
        marginVertical: 10,
        marginBottom: 50
    }
    
})
