import React, {useState, useCallback, useEffect} from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, RefreshControl, ScrollView, Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import {Calendar, CalendarList, Agenda, Arrow, WeekCalendar} from 'react-native-calendars';
import axios from "axios";

import FriendList from '../../components/friendList/FriendList';
import { UserDataSet } from '../../DataSet';
import RoutineBox from '../../components/routineBox/RoutineBox';
import AddStartBtn from '../../components/addStartBtn/AddStartBtn';

const URI = `http://192.168.0.17:3000/api`;

const {width} = Dimensions.get("window");

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const CalendarScreen = ({ navigation }) => {
    let today = new Date()
    today = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    // States
    const [friendsList, setFriendsList] = useState([]);
    const [selectedId, setSelectedId] = useState(0);
    const [selectedDate, setSelectedDate] = useState(today);
    const [refreshing, setRefreshing] = useState(false);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const getFriendLists = async () => {
            try {
                const res = await axios.get(`${URI}/user`)
                setFriendsList(res.data.user);
            } catch (err) {
                console.log(err);
            }
        }
        getFriendLists();

    }, []);

    useEffect(() => {
        const getRecordLists = async () => {
            try {
                const uri = `${URI}/record/${selectedId}/${selectedDate}`;
                const params = {
                    id : selectedId,
                    date : selectedDate,
                }
                const res = await axios.get(uri, { params });

                setRecords(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getRecordLists();
    }, [selectedId, selectedDate]);
    

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
        setSelectedDate(today);
      }, []);

    const selectHandler = (key) => {
        setSelectedId(key)
    }

    const friend_components = (friendsList)? friendsList.map((friend, index) => {
        return (
                <FriendList friend = {friend} key = {index} selectHandler = {selectHandler} index = {index} selected = {selectedId}/>
            )
        }): null

    return (
        <ScrollView 
            style = {styles.container}
            contentContainerStyle={styles.scrollView}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            showsVerticalScrollIndicator = {false}
        >

            <View style = {styles.calender__header} />
            <View style = {styles.friends__container}>
                {friend_components}
                <TouchableOpacity>
                    <AntDesign name="pluscircle" size={25} color="black" style = {{marginLeft: 5}} />
                </TouchableOpacity>
            </View>
            <View style = {styles.selected__user}>
                { 
                    friendsList[selectedId] ? (
                        <Text style = {styles.selected__user__text}>{friendsList[selectedId].username}</Text>
                    ) : null
                }
            </View>
            <Calendar
                onDayPress={(day) => {setSelectedDate(day.dateString)}}
                markedDates={{
                    [selectedDate] : {selected: true, selectedColor: '#87C5D6'},
                }}
                style = {{borderRadius: 10}}
            />
            {/* <Agenda 
                onDayPress={(day) => {setSelectedDate(day.dateString)}}
                markedDates = {{
                    [selectedDate] : {selected: true, selectedColor: '#87C5D6'}
                }}
                // hideKnob={true}
                // renderItem={(item, firstItemInDay) => {return (<View />);}}

                style = {{borderRadius: 10, borderBottomRightRadius: 10}}

            /> */}
            <View style = {{marginTop: 10}}>
                <ScrollView showsVerticalScrollIndicator = {false}>
                    {
                        records.map((record, index) => {
                            return <RoutineBox key = {index} record = {record} />
                        })
                    }
                </ScrollView>
            </View>
            <View style = {{flex: 1, flexDirection: 'row', width: width * 0.5, alignSelf: 'center', justifyContent: 'space-around'}}>
                <AddStartBtn params = {"운동 추가"} onPress = {() => navigation.navigate("ApplyStack")} />
                <AddStartBtn params = {"운동 시작"} onPress = {() => navigation.navigate("StartWorkout")} />
            </View>
        </ScrollView>
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