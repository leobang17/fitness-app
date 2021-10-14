import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { ApplyRoutineDetailScreen, ApplyRoutineScreen, ApplyWorkoutAddScreen, ApplyWorkoutScreen, CalendarScreen, ManageRoutineDetailScreen, ManageRoutineScreen, ManageWorkoutAddScreen, ManageWorkoutScreen, StartWorkoutScreen } from './screens';

const AppStack = createNativeStackNavigator();

const MainBottomTab = createBottomTabNavigator();
const ManageRoutineStack = createNativeStackNavigator();
const ManageWorkoutStack = createNativeStackNavigator();

const ApplyTopTab = createMaterialTopTabNavigator()
const ApplyRoutineStack = createNativeStackNavigator();
const ApplyWorkoutStack = createNativeStackNavigator();


const Route = () => {
    return (
        <AppStack.Navigator>
            <AppStack.Screen name = "MainBottomTab" component = {MainBottomTab} />
            <AppStack.Screen name = "ApplyTopTab" component = {ApplyTopTab} />
            <AppStack.Screen name = "StartWorkout" component = {StartWorkoutScreen} />
        </AppStack.Navigator>
    )
}

const MainBottomTab = () => {
    return (
        <MainBottomTab.Navigator>
            <MainBottomTab.Screen name = "Calendar" component = { CalendarScreen } />
            <MainBottomTab.Screen name = "ManageRoutineStack" component = {ManageRoutineStack} />
            <MainBottomTab.Screen name = "ManageWorkoutStack" component = {ManageWorkoutStack} />
        </MainBottomTab.Navigator>
    )
}

const ManageRoutineStack = () => {
    return (
        <ManageRoutineStack.Navigator>
            <ManageRoutineStack.Screen name = "ManageRoutine" component = {ManageRoutineScreen} />
            <ManageRoutineStack.Screen name = "ManageRoutineDetail" component = {ManageRoutineDetailScreen} />
        </ManageRoutineStack.Navigator>
    )
}

const ManageWorkoutStack = () => {
    return (
        <ManageWorkoutStack.Navigator>
            <ManageWorkoutStack.Screen name = "ManageWorkout" component = {ManageWorkoutScreen} />
            <ManageWorkoutStack.Screen name = "ManageWorktoutAdd" component = {ManageWorkoutAddScreen} />
        </ManageWorkoutStack.Navigator>
    )
}

const ApplyTopTab = () => {
    <ApplyTopTab.Navigator>
        <ApplyTopTab.Screen name = "ApplyRoutineStack" component = {ApplyRoutineStack} />
        <ApplyTopTab.Screen name = "ApplyWorkoutStack" component = {ApplyWorkoutStack} />
    </ApplyTopTab.Navigator>
}

const ApplyRoutineStack = () => {
    <ApplyRoutineStack.Navigator>
        <ApplyRoutineStack.Screen name = "ApplyRoutine" component = {ApplyRoutineScreen} />
        <ApplyRoutineScreen.Screen name = "ApplyRoutineDetail" component = {ApplyRoutineDetailScreen} />
    </ApplyRoutineStack.Navigator>
}

const ApplyWorkoutStack = () => {
    <ApplyWorkoutStack.Navigator>
        <ApplyWorkoutStack.Screen name = "ApplyWorkout" component = {ApplyWorkoutScreen} />
        <ApplyWorkoutStack.Screen name = "ApplyWorkoutAdd" component = {ApplyWorkoutAddScreen} />
    </ApplyWorkoutStack.Navigator>
}


export default Route
