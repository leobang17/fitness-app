import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native'
import { URI } from '../..';
import { AddStartBtn, RoutineBox, RoutineBox2 } from '../../../components';

const ApplyRoutineScreen = ({ navigation }) => {
    // States
    const [routines, setRoutines] = useState([]);

    // Hooks
    useEffect(() => {
        const getRoutineLists = async () => {
            const res = await axios.get(`${URI}/routine`);
            setRoutines(res.data);
        }
        getRoutineLists();
    }, [])

    // Event Handlers
    const goToRoutineDetail = (id, routineName) => {
        return navigation.navigate("ApplyRoutineDetail", {
            routineId: id,
            routineName: routineName
        })
    }

    const addRoutineBtn = () => {
        const routineLen = routines.length();
        console.log(routineLen)
    }
    
    return (
        <View style = {styles.container}>
            <View style = {styles.routine__area}>
                <ScrollView style = {styles.routine__scroll}>
                    {
                        routines.map((routine, index) => {
                            return (
                                <RoutineBox2
                                    key = {index}
                                    params = {{routine: routine}}
                                    onPress = {goToRoutineDetail}
                                />
                            )
                        })
                    }
                </ScrollView>
            </View>

            <View>
                {/* 루틴 추가 버튼 */}
                <AddStartBtn 
                    params = {{innerText: "추가", type: "apply"}}
                    onPress = {addRoutineBtn}
                />
            </View>
        </View>
    )
}

export default ApplyRoutineScreen

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    routine__area: {
        width: "100%",
        flexDirection: 'column',
        alignItems: 'center',
    },
    
})
