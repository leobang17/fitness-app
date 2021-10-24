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
        const routineLen = routines.length;
        const newRoutine = {
            id: routineLen + 1,
            name: `루틴 ${routineLen + 1}`
        }
        setRoutines((prev) => [newRoutine, ...prev]);
    }
    
    return (
        <View style = {styles.container}>
            <View style = {styles.routine__area}>
                <ScrollView 
                    // contentContainerStyle = {{flex: 1}}
                    style = {styles.routine__scroll}
                >
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

            <View style = {styles.addBtn__area}>
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
        width: "100%",
        flex: 1,
    },
    routine__area: {
        width: "100%",
        flex: 1,
        alignItems: 'center',
    },
    routine__scroll: {
    },
    addBtn__area: {
        position: 'absolute',
        flexDirection: 'row',
        alignSelf: 'center',
        bottom: "8%"
    }
})
