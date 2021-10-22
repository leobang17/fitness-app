import axios from 'axios';
import React, { useState, useEffect} from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { URI } from '../..';
import { LongBtn } from '../../../components';

const ApplyWorkoutAddScreen = ({ navigation }) => {
    // State
    const [categories, setCategories] = useState([]);
    const [workoutName, setWorkoutName] = useState("");
    
    // Hook
    useEffect(() => {
        const getCategoryList = async () => {
            const res = await axios.get(`${URI}/category`)
            setCategories(res.data);
        }
        getCategoryList();
    })


    return (
        <View>
            <TextInput 
                style = {styles.inputTextBox}
                placeholder = "추가할 운동의 이름을 입력하세요."
                onChangeText = {(value) => setWorkoutName(value)}
            />
            <View>
                <Text>
                    카테고리
                </Text>
            </View>
            <View>
                <Text>
                    타입
                </Text>
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
    inputTextBox: {
        
    }
})
