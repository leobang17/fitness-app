import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { URI } from '../..';
import { RoutineBox } from '../../../components';

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

    return (
        <View>
            <View>
                {
                    routines.map((routine, index) => {
                        return (
                            <RoutineBox
                                key = {index}
                                record = {routine}
                            />
                        )
                    })
                }
            </View>

            <View>
                {/* 추가 제거 버튼 */}
            </View>

            <Button title = "to routine detail" onPress = {() => navigation.navigate("ApplyRoutineDetail")} />
        </View>
    )
}

export default ApplyRoutineScreen
