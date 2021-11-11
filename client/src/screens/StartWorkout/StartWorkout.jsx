import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const StartWorkout = () => {
    // States
    const [timer, setTimer] = useState(0);
    const [minute, setMinute] = useState("");
    const [second, setSecond] = useState("");
    const [toggleTimer, setToggleTimer] = useState(false);
    const [toggleBtnName, setToggleBtnName] = useState("시작");
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(0)


    // Hooks
    useEffect(() => {        
        minuteCalculator();   
        if (timer <= 0) {
            setToggleTimer(false);
            setIsTimerRunning(false);
        }
    }, [timer])

    useEffect(() => {
        if (toggleTimer) {
            const timerInterval = setInterval(timeDecrement, 1000);
            setIntervalId(timerInterval);
            setIsTimerRunning(true);
        } else if (!toggleTimer || timer < 0) {
            clearInterval(intervalId);
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


    // Event Handlers
    const addTime = (time) => {
        setTimer((prev) => prev + time)
    }

    const minuteCalculator = () => {
        let minute = parseInt(timer / 60).toString();
        let second = (timer % 60).toString();
        setMinute(minute);
        setSecond(second);
    }

    const toggleTimerFunc = () => {
        if (toggleTimer) {
            setToggleTimer(false)
        } else if (!toggleTimer && timer > 0){
            setToggleTimer(true)
        }
    }

    const toggleStartFunc = () => {
        setToggleTimer(true)
    }

    const toggleEndFunc = () => {
        setToggleTimer(false);
    }

    const timeDecrement = () => {
        setTimer((prev) => prev - 1);
    }

    const clearTime = () => {
        setTimer(0);
    }

    return (
        <SafeAreaView>
                
            <Text>
                {minute.padStart(2, "0")} : {second.padStart(2, "0")}
            </Text>

            <Text>운동 시작 screen</Text>
            <Button title ={"+ 30 sec"} onPress = {() => addTime(30)} />
            <Button title ={"+ 10 sec"} onPress = {() => addTime(10)} />
            <Button title = {toggleBtnName} onPress = {() => toggleTimerFunc()} />
            <Button title = {"초기화"} onPress = {() => clearTime()} />
        </SafeAreaView>
        
    )
}

export default StartWorkout
