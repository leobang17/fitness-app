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
    const [showSetDetails, setShowSetDetails] = useState([]);

    // Hooks
    useEffect(() => {
        const getWorkoutList = async () => {
            const res = await axios.get(`${URI}/workout`)
            setWorkouts(res.data);
            setShowSetDetails(() => Array(res.data.length).fill(false));
        }
        getWorkoutList();
    }, [])

    useEffect(() => {  
        console.log(showSetDetails);
    }, [showSetDetails])

    // Event Handlers 
    const toggleSetDetails = (index) => {
        setShowSetDetails((prev) => {
            prev = [...prev];
            if (prev[index] === true) {
                prev[index] = false;
            } else {
                prev[index] = true;
            }
            return prev
        })
    }

    return (
        <View style = {styles.container}>
            <ScrollView>
                <Text>{routineId}, {routineName}</Text>
                {
                    workouts.map((workout, index) => {
                        return (
                            <RoutineBox
                                key = {index}
                                params = {{index: index, type : "fromApplyStackDetail"}}
                                record = {workout}
                                onPress = {toggleSetDetails}
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