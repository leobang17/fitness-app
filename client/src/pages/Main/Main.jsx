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
const Stack = createNativeStackNavigator();
const CalendarStack = createNativeStackNavigator()

const AddRoutine = () => {
    return (
        <AddRoutineTab.Navigator>
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

const CalendarView = () => {
    return (
        <CalendarStack.Navigator>
            <CalendarStack.Screen name = "Calendar" component = {Calendar} />
            <CalendarStack.Screen name = "AddRoutineScreen" component = {AddRoutine} />
            <CalendarStack.Screen name = "StartWorkout" component = {StartWorkout} />
        </CalendarStack.Navigator>
    )
}


const Main = () => {
    return (
        <MainTab.Navigator screenOptions = {{headerShown : false}}>
            <MainTab.Screen name = "Calendar" component = {CalendarView} />
            <MainTab.Screen name = "Routine" component = {Routine} />
            {/* <MainTab.Screen name = "AddRoutine" component = {AddRoutine} /> */}
            {/* <Stack.Screen name = "AddRoutineScreen" component = {AddRoutineScreen} options = {{headerShown : true}} /> */}
        </MainTab.Navigator>
        // <Stack.Navigator screenOptions = {{headerShown : false}}>
        //     <Stack.Screen name = "Calendar" component = {Calendar} />
        //     <Stack.Screen name = "Routine" component = {Routine} />
        //     {/* <MainTab.Screen name = "AddRoutine" component = {AddRoutine} /> */}
        //     <Stack.Screen name = "AddRoutineScreen" component = {AddRoutineScreen} options = {{headerShown : true}} />
        // </Stack.Navigator>
    )
}

export default Main

const styles = StyleSheet.create({})
