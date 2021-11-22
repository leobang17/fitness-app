import React, { useEffect, useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AddStartBtn } from '../../components';

const StartWorkout = () => {
    // States
    const [timer, setTimer] = useState(0);
    const [minute, setMinute] = useState("");
    const [second, setSecond] = useState("");
    const [milliSecond, setMilliSecond] = useState("");
    const [toggleTimer, setToggleTimer] = useState(false);
    const [toggleBtnName, setToggleBtnName] = useState("시작");
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(0)
    const [testTime, setTestTime] = useState(0);
    const [toggleTest, setToggleTest] = useState(false);
    const [delay, setDelay] = useState(null);
    // const [leftTime, setLeftTime] = useState(0);
    const leftTimeRef = useRef(0);
    const startTime = useRef(0);

    const timerRef = useRef(0);
    // let startTime = 0;
    
    // Hooks
    useEffect(() => {        
        minuteCalculator();   
        console.log("left time: ", timer);
        timerRef.current = timer;
        if (timer <= 0) {
            setToggleTimer(false);
            setIsTimerRunning(false);
            return () => setTimer(0);
        }
    }, [timer])

    useInterval(() => {
        timeDecrement();
    }, toggleTimer ? 10 : null);

    useEffect(() => {
        if (toggleTest) {
            // setTestTime("정지");
            console.log("정지로 바뀜");
        } else {
            // setTestTime("시작");
            console.log("시작으로 바뀜");
        }
        return () => console.log("으악 바뀜");
    }, [toggleTest]);
    
    useEffect(() => {
        if (toggleTimer) {
            startTime.current = Date.now();
            // const timerInterval = setInterval(timeDecrement, 1000);
            // setIntervalId(timerInterval);
            leftTimeRef.current = timer;
            console.log(leftTimeRef.current, "으악");
            setIsTimerRunning(true);
        } else if (!toggleTimer || timer < 0) {
            // clearInterval(intervalId);
            
        } 
    }, [toggleTimer])
    
    useEffect(() => {
    }, [startTime])
    
    useEffect(() => {
        if (!isTimerRunning) {
            setToggleBtnName('시작');
        } else if (isTimerRunning && !toggleTimer) {
            setToggleBtnName('다시시작');
        } else if (isTimerRunning && toggleTimer) {
            setToggleBtnName('일시정지');
        }
    }, [isTimerRunning, toggleTimer])
    
    
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
        const timePassed = Date.now() - startTime.current;
        console.log("start time: ", startTime.current);
        console.log("time passed: ", timePassed);
        console.log("timer: ", timer - timePassed);
        console.log("leftTime", leftTimeRef.current);
        setTimer(leftTimeRef.current - timePassed);
    }
    
    const clearTime = () => {
        setTimer(0);
    }
    
    return (
        <SafeAreaView>
            <Text>{testTime}</Text>
            <Button
                title = {testTime}
                onPress = {() => {
                    if (toggleTest) {
                        setToggleTest(false);
                    } else {
                        setToggleTest(true);
                    }
                }}
                />
            <Button
                title = "1000 감소"
                onPress = {() => {
                    setTestTime((prev) => prev - 100)
                }}
            />
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
                </View>
                <View style = {styles.timer__btn__toggle}>
                    <Button title = {toggleBtnName} onPress = {() => toggleTimerFunc()} />
                    <Button title = {"초기화"} onPress = {() => clearTime()} />
                </View>
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
        alignItems: 'center'
    },
    timer__time__area: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    timer__time__text: {
        fontSize: 30,
        width: 40,
        textAlign: 'center'
    },
    timer__symbol__text: {
        fontSize: 30,
        width: 10,
        textAlign: 'center'
        
    },
    timer__btn__area: {
        flexDirection: 'row'
    }
})