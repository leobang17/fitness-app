import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Button, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { URI } from '..';
import { AddStartBtn, TimerBox, WorkoutStartBox } from '../../components';

const { width } = Dimensions.get('window');
const TIMER_FONTSIZE = 40;

const StartWorkout = () => {
    // States
    const [workoutList, setWorkoutList] = useState([]);
    const [showSetDetails, setShowSetDetails] = useState([]);
    const [repsDone, setRepsDone] = useState([]);


    // Hooks
    useEffect(() => {
        const getWorkoutList = async () => {
            const workoutRes = await axios.get(`${URI}/workout`);
            const setArr = [];
            for (let workout of workoutRes.data) {
                const repsRes = await axios.get(`${URI}/setDetail`);
                workout.reps = repsRes.data;
                workout.repsAvg = 0;
                repsRes.data.map((repsResIter) => {
                    workout.repsAvg += parseInt(repsResIter.weight / repsRes.data.length);
                })

                // 해당 루틴 몇번 실행했는지.
                const tempArr = new Array(repsRes.data.length).fill(false);
                setArr.push(tempArr);
            }
            setWorkoutList(workoutRes.data);
            setRepsDone(setArr);
            setShowSetDetails(new Array(workoutRes.data.length).fill(false));
        }
        getWorkoutList();
    }, [])

    useEffect(() => {
        // console.log(showSetDetails);
    }, [showSetDetails]);


    // Event Handlers
    const toggleSetDetails = (index) => {
        setShowSetDetails((prev) => {
            prev = [...prev];
            if (prev[index]) {
                prev[index] = false;
            } else {
                prev[index] = true;
            }
            return prev;
        })
    }
    
    // Render
    return (
        <ScrollView style = {styles.container}>
            <TimerBox />
            <View style = {styles.workout__area}>
                {
                    workoutList.map((workout, index) => {
                        return (
                            <View key = {index}>
                                <WorkoutStartBox 
                                    index = {index}
                                    innerText = {workout.name}
                                    setCount = {workout.reps.length}
                                    setAvg = {workout.repsAvg}
                                    repsDone = {repsDone[index]}
                                    onPress = {toggleSetDetails}
                                />
                                {
                                    (showSetDetails[index])
                                    ?
                                    workout.reps.map((set, index) => {
                                        return (
                                            <View key = {index}>
                                                <Text>
                                                    {set.reps} reps
                                                    {set.weight} kgs
                                                </Text>
                                            </View>
                                        )
                                    })
                                    : null
                                } 
                                <Text>
                                    ----------------------------------
                                </Text>
                            </View>
                            
                        )   
                    })
                }
            </View>
        </ScrollView>
    )
}

export default StartWorkout;

const styles = StyleSheet.create({
    container : {
        paddingTop: 50
    },
})