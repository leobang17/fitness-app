import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const StartWorkout = () => {
    // States
    const [timer, setTimer] = useState(0);
    const [minute, setMinute] = useState("");
    const [second, setSecond] = useState("");
    const [toggleTimer, setToggleTimer] = useState(false);

    // Hooks
    useEffect(() => {        
        minuteCalculator();        
    }, [timer])

    useEffect(() => {
        let timerInterval;
        if (toggleTimer) {
            timerInterval = setInterval(() => timeDecrement(), 1000);
        } else {
            clearInterval(timerInterval);
        }
    }, toggleTimer)

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
        if (toggleTimer) setToggleTimer(false)
        else setToggleTimer(true);
    }
    
    const timeDecrement = () => {
        setTimer((prev) => prev - 1);
    }

    return (
        <SafeAreaView>
                
            <Text>
                {minute.padStart(2, "0")} : {second.padStart(2, "0")}
            </Text>

            <Text>운동 시작 screen</Text>
            <Button title ={"+ 30 sec"} onPress = {() => addTime(30)} />
            <Button title ={"+ 10 sec"} onPress = {() => addTime(10)} />
            <Button title = {"start"} onPress = {() => toggleTimerFunc()} />
        </SafeAreaView>
        
    )
}

export default StartWorkout
