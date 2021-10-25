import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { URI } from '../..';
import { RoutineBox } from '../../../components';

const ApplyRoutineDetailScreen = ({navigation, route }) => {
    // Params
    const { routineId, routineName } = route.params;
    
    // States
    const [workouts, setWorkouts] = useState([]);

    // Hooks
    useEffect(() => {
        const getWorkoutList = async () => {
            const res = await axios.get(`${URI}/workout`)
            setWorkouts(res.data);
        }
        getWorkoutList();
    }, [])


    // Event Handlers 


    return (
        <View style = {styles.container}>
            <ScrollView>
                <Text>{routineId}, {routineName}</Text>
                {
                    workouts.map((workout, index) => {
                        return (
                            <RoutineBox
                                key = {index}
                                record = {workout}
                            />
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default ApplyRoutineDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})