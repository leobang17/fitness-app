import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const StartWorkout = () => {
    // States
    const [timer, setTimer] = useState(20);
    const [minute, setMinute] = useState("");
    const [second, setSecond] = useState("");
    const [toggleTimer, setToggleTimer] = useState(false);
    let timerInterval;
    const a = [1, 2, 3, 4];
    // console.log("default", timerInterval);
    // timerInterval = setInterval(timeDecrement, 1000);
    // console.log("after declaration", timerInterval);
    // setTimeout(() => clearInterval(timerInterval) , 2000);
    // console.log("after clear", timerInterval);


    // Hooks
    useEffect(() => {        
        minuteCalculator();        
    }, [timer])

    useEffect(() => {
        let timerInterval;
        try {
            a = [1 ,2, 3, 4,5];
        } catch(err) {
            console.log(err);
        }

        if (toggleTimer) {
            timerInterval = setInterval(timeDecrement, 1000);
            // console.log("토글 타이머는 참트루 ");
            console.log("toggle on", timerInterval);
        }
        if (!toggleTimer) {
            clearInterval(timerInterval);
            // console.log("토글 타이머는 뽈스 ");
            console.log("toggle off", timerInterval);
        }
    }, [toggleTimer])

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

    const toggleStartFunc = () => {
        setToggleTimer(true)
    }

    const toggleEndFunc = () => {
        setToggleTimer(false);
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
            <Button title = {"start"} onPress = {() => toggleStartFunc()} />
            <Button title = {"end"} onPress = {() => toggleEndFunc()} />
        </SafeAreaView>
        
    )
}

export default StartWorkout
