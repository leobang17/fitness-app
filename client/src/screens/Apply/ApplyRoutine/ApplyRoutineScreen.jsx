import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native'
import { URI } from '../..';
import { RoutineBox, RoutineBox2 } from '../../../components';

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
                {/* 추가 제거 버튼 */}
            </View>

            <Button title = "to routine detail" onPress = {() => navigation.navigate("ApplyRoutineDetail")} />
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
