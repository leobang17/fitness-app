import React, {useState} from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import {Calendar, CalendarList, Agenda, Arrow} from 'react-native-calendars';


import FriendList from '../../components/friendList/FriendList';
import { UserDataSet } from '../../DataSet';


const {width} = Dimensions.get("window");

const CalendarScreen = () => {
    let today = new Date()
    today = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

    // States
    const [friendsList, setFriendsList] = useState(UserDataSet);
    const [selectedId, setSelectedId] = useState(0);
    const [selectedDate, setSelectedDate] = useState(today);

    const selectHandler = (key) => {
        setSelectedId(key)
    }

    const friend_components = (friendsList)? friendsList.map((friend, index) => {
        return (
                <FriendList friend = {friend} key = {index} selectHandler = {selectHandler} index = {index} selected = {selectedId}/>
            )
        }): null
    
    return (
        <View style = {styles.container}>
            <View style = {styles.calender__header} />
            <View style = {styles.friends__container}>
                {friend_components}
                <TouchableOpacity>
                    <AntDesign name="pluscircle" size={25} color="black" style = {{marginLeft: 5}} />
                </TouchableOpacity>
            </View>
            <View style = {styles.selected__user}>
                <Text style = {styles.selected__user__text}>{friendsList[selectedId].username}</Text>
            </View>
            <Calendar
                onDayPress={(day) => {setSelectedDate(day.dateString)}}
                markedDates={{
                    "2021-10-10" : {selected: true, selectedColor: '#87C5D6'},
                }}
                
            />
        </View>
    )
}

export default CalendarScreen

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        alignSelf: 'center',
        flex: 1
    },
    calender__header: {
        height: 50,
    },
    friends__container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    selected__user: {
        marginVertical: 20,
    },
    selected__user__text: {
        fontSize: 18
    }
})
