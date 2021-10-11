import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Calendar from './Calendar';
import Routine from './Routine';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddRoutineScreen, AddWorkoutScreen } from '..';


const MainTab = createBottomTabNavigator();
const AddRoutineTab = createBottomTabNavigator();
const MainStack = createNativeStackNavigator();
const CalendarStack = createNativeStackNavigator()

const AddRoutine = () => {
    return (
        <AddRoutineTab.Navigator screenOptions = {{headerShown: false}}>
            <AddRoutineTab.Screen name = "AddRoutineScreen" component = {AddRoutineScreen} />
            <AddRoutineTab.Screen name = "AddWorkoutScreen" component = {AddWorkoutScreen} />
        </AddRoutineTab.Navigator>
    )
}

const StartWorkout = ({ onPress}) => {
    return (
        <TouchableOpacity onPress = {() => onPress()}>
            <View><Text>운동 시작!</Text></View>
        </TouchableOpacity>
    )
}

const CalendarRoutineTab = () => {
    return (
        <MainTab.Navigator>
            <MainTab.Screen name = "Calendar" component = {Calendar} options = {{headerShown: false}} />
            <MainTab.Screen name = "Routine" component = {Routine} />
        </MainTab.Navigator>
    )
}


const Main = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen name = "Calendar" component = {CalendarRoutineTab} options = {{headerShown: false}} />
            <MainStack.Screen name = "AddRoutine" component = {AddRoutine} />
            <MainStack.Screen name = "StartWorkout" component = {StartWorkout} />
        </MainStack.Navigator>
    )
}

export default Main

const styles = StyleSheet.create({})
