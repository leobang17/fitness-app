import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Button, StyleSheet, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { URI } from '..';
import { AddStartBtn, WorkoutStartBox } from '../../components';

const { width } = Dimensions.get('window');
const TIMER_FONTSIZE = 40;

const StartWorkout = () => {
    // States
    const [timer, setTimer] = useState(0);
    const [minute, setMinute] = useState("");
    const [second, setSecond] = useState("");
    const [milliSecond, setMilliSecond] = useState("");
    const [toggleTimer, setToggleTimer] = useState(false);
    const [toggleBtnName, setToggleBtnName] = useState("시작");
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [workoutList, setWorkoutList] = useState([]);
    const [repsDone, setRepsDone] = useState([]);
    const startTimeRef = useRef(0);
    const leftTimeRef = useRef(0);

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
        }
        getWorkoutList();
    }, [])

    useEffect(() => {
        console.log(workoutList);
    }, [workoutList]);

    // useEffect(() => {
    //     console.log(repsDone);
    // }, [repsDone]);

    useEffect(() => {        
        minuteCalculator();   
        if (timer <= 0) {
            setToggleTimer(false);
            setIsTimerRunning(false);
            setTimer(0);
        }
    }, [timer])
    
    useEffect(() => {
        if (toggleTimer) {
            startTimeRef.current = Date.now();
            leftTimeRef.current = timer;
            setIsTimerRunning(true);
        } else if (!toggleTimer || timer < 0) {
            // setIsTimerRunning(false);
        } 
    }, [toggleTimer])
    
    useEffect(() => {
        if (!isTimerRunning) {
            setToggleBtnName('시작');
        } else if (isTimerRunning && !toggleTimer) {
            setToggleBtnName('다시시작');
        } else if (isTimerRunning && toggleTimer) {
            setToggleBtnName('일시정지');
        }
    }, [isTimerRunning, toggleTimer])
    

    // Custon Hooks
    useInterval(() => {
        timeDecrement();
    }, toggleTimer ? 10 : null);
    

    // Event Handlers
    const addTime = (time) => {
        setTimer((prev) => prev + time)
        leftTimeRef.current += time;
    }
    
    const minuteCalculator = () => {
        let toSecond = parseInt(timer / 1000);
        let tempMinute = parseInt(toSecond / 60).toString();
        let tempSecond = parseInt(toSecond % 60).toString();
        let tempMilliSecond = parseInt((timer % 1000) / 10).toString();
        
        setMinute(tempMinute);
        setSecond(tempSecond);
        setMilliSecond(tempMilliSecond);
    }
    
    const toggleTimerFunc = () => {
        if (toggleTimer) {
            setToggleTimer(false)
        } else if (!toggleTimer && timer > 0){
            setToggleTimer(true)
        }
    }
    
    const timeDecrement = () => {
        const timePassed = Date.now() - startTimeRef.current;
        setTimer(leftTimeRef.current - timePassed);
    }
    
    const clearTime = () => {
        setTimer(0);
    }
    
    return (
        <SafeAreaView>
            <View style = {styles.timer__area}>
                <View style = {styles.timer__time__area}>
                    <View style = {styles.timer__time}>
                        <Text style = {styles.timer__time__text}>{minute.padStart(2, "0")}</Text>
                    </View>
                    <View style = {styles.timer__symbol}>
                        <Text style = {styles.timer__symbol__text}>:</Text>
                    </View>
                    <View style = {styles.timer__time}>
                        <Text style = {styles.timer__time__text}>{second.padStart(2, "0")}</Text>
                    </View>
                    <View style = {styles.timer__symbol}>
                        <Text style = {styles.timer__symbol__text}>.</Text>
                    </View>
                    <View style = {styles.timer__time}>
                        <Text style = {styles.timer__time__text}>{milliSecond.padStart(2, "0")}</Text>
                    </View>
                </View>
                <View style = {styles.timer__btn__area}>
                    <AddStartBtn
                        params = {{innerText: "+10sec", type: "startWorkout", onPressParams: 10 * 1000}}
                        onPress = {addTime}
                    />
                    <AddStartBtn
                        params = {{innerText: "+30sec", type: "startWorkout", onPressParams: 30 * 1000}}
                        onPress = {addTime}
                    />
                    <AddStartBtn
                        params = {{innerText: "+60sec", type: "startWorkout", onPressParams: 60 * 1000}}
                        onPress = {addTime}
                    />
                </View>
                <View style = {styles.timer__btn__toggle}>
                    <Button title = {toggleBtnName} onPress = {() => toggleTimerFunc()} />
                    <Button title = {"초기화"} onPress = {() => clearTime()} />
                </View>
            </View>
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
                                />
                                {
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
                                } 
                                <Text>
                                    ----------------------------------
                                </Text>
                            </View>
                            
                        )   
                    })
                }
            </View>
        </SafeAreaView>
    )
}

// Custom Hooks
function useInterval(callback, delay) {
    const intervalRef = useRef();
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (typeof delay === "number") {
            intervalRef.current = setInterval(() => callbackRef.current(), delay);
        }
        return () => clearInterval(intervalRef.current);
    }, [delay]);

    return intervalRef;
}


export default StartWorkout;

const styles = StyleSheet.create({
    container : {},
    timer__area: {
        alignItems: 'center',
        alignSelf: 'center',
        width: width * 0.9,
        backgroundColor: '#EAEAEA',
        borderRadius: 15
    },
    timer__time__area: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    timer__time__text: {
        fontSize: TIMER_FONTSIZE,
        width: 55, 
        textAlign: 'center',
        paddingTop: 20
    },
    timer__symbol__text: {
        fontSize: TIMER_FONTSIZE,
        width: 10,
        textAlign: 'center',
        paddingTop: 20
    },
    timer__btn__area: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    timer__btn__toggle: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    }
})