import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { URI } from '../..';
import { AddStartBtn, RoutineBox } from '../../../components';
import SetBox from '../../../components/setBox/SetBox';

const { width } = Dimensions.get("window");

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

    // index 넣어줘야 함
    const addSet = (index) => {
        const {id, reps, weight} = {...setDetails[setDetails.length - 1]};
        const newSet = {
            id: id + 1, reps, weight
        }
        setSetDetails((prev) => [...prev, newSet]);
    }

    const delSet = (index) => {
        setSetDetails((prev) => {
            prev.pop()    
            return [...prev]
        })
    }

    const mapSetDetails = setDetails.map((setDetail, index) => {
        return (
            <>
                <SetBox
                    key = {index}
                    index = {index}
                    reps = {setDetail.reps}
                    weight = {setDetail.weight}
                    set = {setDetail.id + 1}
                />
            </>
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
                                {
                                    (showSetDetails[index])
                                    ? 
                                    <View style = {styles.btn__area}>
                                        <AddStartBtn params = {{innerText: "세트 추가", type: "addSet"}} onPress = {addSet} />
                                        <AddStartBtn params = {{innerText: "세트 제거", type: "addSet"}} onPress = {delSet} />
                                    </View>
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
    },
    btn__area: {
        width: width * 0.6,
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignSelf: "center"
    }
})