import React, { useEffect, useState } from 'react'
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

    var startTime, interval;

    function start(){
        startTime = Date.now();
        interval = setInterval(function(){
            updateDisplay(Date.now() - startTime);
        }, 1000);
    }

    function stop(){
        clearInterval(interval);
    }

    function updateDisplay(currentTime){
        // do your stuff
        console.log(currentTime);
    }


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
            const timerInterval = setInterval(timeDecrement, 10);
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
        setTimer((prev) => prev - 10);
    }

    const clearTime = () => {
        setTimer(0);
    }

    return (
        <SafeAreaView>
            <Button onPress = {() => stop()} title = {"스탑"} />
            <Button onPress = {() => start()} title = {"스타트"} /> 
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