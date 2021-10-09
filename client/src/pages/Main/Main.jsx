import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Calendar from './Calendar';
import Routine from './Routine';


const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator screenOptions = {{headerShown : false}}>
            <Tab.Screen name = "Calendar" component = {Calendar} />
            <Tab.Screen name = "Routine" component = {Routine} />
        </Tab.Navigator>
    )
}

export default Main

const styles = StyleSheet.create({})
