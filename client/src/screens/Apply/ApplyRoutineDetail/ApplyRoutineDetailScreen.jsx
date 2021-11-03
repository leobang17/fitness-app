import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { URI } from '../..';
import { RoutineBox } from '../../../components';
import SetBox from '../../../components/setBox/SetBox';

const ApplyRoutineDetailScreen = ({navigation, route }) => {
    // Params
    const { routineId, routineName } = route.params;
    
    // States
    const [workouts, setWorkouts] = useState([]);
    const [showSetDetails, setShowSetDetails] = useState([]);
    const [setDetails, setSetDetails] = useState([]);

    // Hooks
    useEffect(() => {
        const getWorkoutList = async () => {
            const res = await axios.get(`${URI}/workout`)
            setWorkouts(res.data);
            setShowSetDetails(() => Array(res.data.length).fill(false));
        }
        const getSetDetails = async () => {
            const res = await axios.get(`${URI}/setDetail`);
            setSetDetails(res.data);
        }
        getWorkoutList();
        getSetDetails();
    }, [])

    useEffect(() => {  
        console.log(setDetails);
    }, [showSetDetails, setDetails])

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

    const mapSetDetails = setDetails.map((setDetail, index) => {
        return (
            <SetBox
                key = {index}
                index = {index}
                reps = {setDetail.reps}
                weight = {setDetail.weight}
                set = {setDetail.id + 1}
            />
        )
    })


    return (
        <View style = {styles.container}>
            <ScrollView>
                <Text>{routineId}, {routineName}</Text>
                {
                    workouts.map((workout, index) => {
                        return (
                            <>
                                <RoutineBox
                                    key = {index}
                                    params = {{index: index, type : "fromApplyStackDetail"}}
                                    record = {workout}
                                    onPress = {toggleSetDetails}
                                />
                                { 
                                    (showSetDetails[index])
                                    ? mapSetDetails
                                    : null
                                }
                            </>
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