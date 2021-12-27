import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { 
    AddRoutineScreen,
    ApplyRoutineDetailScreen, 
    ApplyRoutineScreen, 
    ApplyWorkoutAddScreen, 
    ApplyWorkoutScreen, 
    CalendarScreen, 
    ManageRoutineDetailScreen, 
    ManageRoutineScreen, 
    ManageWorkoutAddScreen, 
    ManageWorkoutScreen, 
    StartWorkoutScreen,
    AuthMain,
} from './screens';


const AppStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const MainBottomTab = createBottomTabNavigator();
const ManageRoutineStack = createNativeStackNavigator();
const ManageWorkoutStack = createNativeStackNavigator();

const ApplyStack = createNativeStackNavigator();
const ApplyTopTab = createMaterialTopTabNavigator()
const ApplyRoutineStack = createNativeStackNavigator();
const ApplyWorkoutStack = createNativeStackNavigator();


const Route = () => {
    return (
        <AppStack.Navigator screenOptions = {{headerShown : false}}>
            <AppStack.Screen name = "MainBottomTab" component = {_MainBottomTab} />
            <AppStack.Screen name = "ApplyStack" component = {_ApplyStack} options = {{headerShown: true}} />
            <AppStack.Screen name = "StartWorkout" component = {StartWorkoutScreen} />
        </AppStack.Navigator>
    )
}

const Auth = () => {
    return (
        <AuthStack.Navigator screenOptions={{headerShown : false}}>
            <AuthStack.Screen name = "AuthMain" component = {AuthMain} />
        </AuthStack.Navigator>
    )
};


const _MainBottomTab = () => {
    return (
        <MainBottomTab.Navigator screenOptions = {{headerShown: false}}>
            <MainBottomTab.Screen name = "Calendar" component = { CalendarScreen } />
            <MainBottomTab.Screen name = "ManageRoutineStack" component = {_ManageRoutineStack} />
            <MainBottomTab.Screen name = "ManageWorkoutStack" component = {_ManageWorkoutStack} />
        </MainBottomTab.Navigator>
    )
}

const _ManageRoutineStack = () => {
    return (
        <ManageRoutineStack.Navigator>
            <ManageRoutineStack.Screen name = "ManageRoutine" component = {ManageRoutineScreen} />
            <ManageRoutineStack.Screen name = "ManageRoutineDetail" component = {ManageRoutineDetailScreen} />
        </ManageRoutineStack.Navigator>
    )
}

const _ManageWorkoutStack = () => {
    return (
        <ManageWorkoutStack.Navigator>
            <ManageWorkoutStack.Screen name = "ManageWorkout" component = {ManageWorkoutScreen} />
            <ManageWorkoutStack.Screen name = "ManageWorktoutAdd" component = {ManageWorkoutAddScreen} />
        </ManageWorkoutStack.Navigator>
    )
}

const _ApplyStack = () => {
    return (
        <ApplyStack.Navigator screenOptions = {{headerShown : false}} >
            <ApplyStack.Screen name = "ApplyTopTab" component = {_ApplyTopTab} />
            <ApplyStack.Screen name = "ApplyRoutineDetail" component = {ApplyRoutineDetailScreen}/>
            <ApplyStack.Screen name = "ApplyWorkoutAdd" component = {ApplyWorkoutAddScreen} />
        </ApplyStack.Navigator>
    )
}

const _ApplyTopTab = () => {
    return (
        <ApplyTopTab.Navigator screenOptions = {{swipeEnabled : false}}>
            <ApplyTopTab.Screen name = "ApplyRoutineStack" component = {ApplyRoutineScreen} />
            <ApplyTopTab.Screen name = "ApplyWorkoutStack" component = {ApplyWorkoutScreen} />
        </ApplyTopTab.Navigator>
    )
}

const _ApplyRoutineStack = () => {
    return (
        <ApplyRoutineStack.Navigator>
            <ApplyRoutineStack.Screen name = "ApplyRoutine" component = {ApplyRoutineScreen} />
            {/* <ApplyRoutineStack.Screen name = "ApplyRoutineDetail" component = {ApplyRoutineDetailScreen} /> */}
        </ApplyRoutineStack.Navigator>
    )
}

const _ApplyWorkoutStack = () => {
    return (
        <ApplyWorkoutStack.Navigator>
            <ApplyWorkoutStack.Screen name = "ApplyWorkout" component = {ApplyWorkoutScreen} />
            <ApplyWorkoutStack.Screen name = "ApplyWorkoutAdd" component = {ApplyWorkoutAddScreen} />
        </ApplyWorkoutStack.Navigator>
    )
}

export { Route, Auth };