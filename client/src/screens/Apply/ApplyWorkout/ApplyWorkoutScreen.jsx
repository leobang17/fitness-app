import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, ScrollView, Dimensions } from 'react-native'

import { URI } from '../..';
import { AddStartBtn, CategoryBox, LongBtn, SearchBar, WorkoutBox } from '../../../components';

const { width } = Dimensions.get("window")

const ApplyWorkoutScreen = ({ navigation }) => {
    // States
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState([{"name": "marked"}])
    const [selectedCategorys, setSelectedCategorys] = useState([])
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkouts, setSelectedWorkouts] = useState([]);
    const [markedWorkouts, setMarkedWorkouts] = useState([]);

    // Hooks
    useEffect(() => {
        const getCategoryList = async () => {
            try {
                const res = await axios.get(`${URI}/category`);
                console.log(res);
                setCategory((prev) => [...prev, ...res.data]);
            } catch (err) {
                console.log(err);
            }
        }
        getCategoryList();
    }, [])

    useEffect(() => {
        const getWorkoutList = async () => {
            try {
                const res = await axios.get(`${URI}/workout`);
                setWorkouts(() => res.data)
            } catch (err) {
                console.log(err);
            }
        }
        getWorkoutList();
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

    const workoutToggle = (key) => {
        if (selectedWorkouts.includes(key)) {
            setSelectedWorkouts((prev) => {
                return prev.filter(keys => keys !== key).sort();
            })
        } else {
            setSelectedWorkouts((prev) => [...prev, key].sort());
        }
    }

    const workoutMarkToggle = (key) => {
        if (markedWorkouts.includes(key)) {
            setMarkedWorkouts((prev) => {
                return prev.filter(keys => keys !== key).sort();
            })
        } else {
            setMarkedWorkouts((prev) => [...prev, key].sort());
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
                </ScrollView>
            </View>

            {/* workout list scrollview */}
            <View style = {styles.workout__area}>
                <ScrollView>
                    {
                        workouts.map((workout, index) => {
                            let isSelected;
                            let isMarked;
                            if (selectedWorkouts.includes(index)){
                                isSelected = true;
                            } else{
                                isSelected = false;
                            }
                            if (markedWorkouts.includes(index)) {
                                isMarked = true;
                            } else {
                                isMarked = false;
                            }
                            return (
                                <WorkoutBox 
                                    params = {{innerText: workout.name, index: index}}
                                    isSelected = {isSelected} 
                                    isMarked = {isMarked}
                                    key = {index} 
                                    workoutToggle = {workoutToggle}
                                    workoutMarkToggle = {workoutMarkToggle}
                                />
                            )
                        })
                    }

                    
                </ScrollView>
            </View>

            <View style = {styles.gotoAdd__area}>
                <LongBtn
                    style = {styles.goToAdd}
                    params = {{innerText: "직접 추가하기", type : "goToAdd"}}
                    onPress = {() => navigation.navigate("ApplyWorkoutAdd")} 
                />
            </View>

            <View style = {styles.btn__area}>
                <AddStartBtn
                    params = {{innerText: "추가", type: "apply"}}
                    onPress = {() => navigation.navigate("ApplyWorkoutAdd")}
                />
                <AddStartBtn
                    params = {{innerText: "취소", type: "apply"}}
                    onPress = {() => navigation.navigate("Calendar")}
                />
            </View>
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
    },
    gotoAdd__area : {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    btn__area: {
        width: width * 0.6,
        alignSelf: "center",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 20
    },
    workout__area: {
        width: width * 0.9,
        alignSelf: 'center'
    }
})


export default ApplyWorkoutScreen
