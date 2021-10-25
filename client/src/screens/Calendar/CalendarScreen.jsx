import React, {useState, useCallback, useEffect} from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, RefreshControl, ScrollView, Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import {Calendar, CalendarList, Agenda, Arrow, WeekCalendar} from 'react-native-calendars';
import axios from "axios";

import FriendList from '../../components/friendList/FriendList';
import { UserDataSet } from '../../DataSet';
import RoutineBox from '../../components/routineBox/RoutineBox';
import AddStartBtn from '../../components/addStartBtn/AddStartBtn';
import { URI } from '..';

const {width} = Dimensions.get("window");

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const CalendarScreen = ({ navigation }) => {
    // Value
    let today = new Date()
    today = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    // States
    const [friendsList, setFriendsList] = useState([]);
    const [selectedId, setSelectedId] = useState(0);
    const [selectedDate, setSelectedDate] = useState(today);
    const [refreshing, setRefreshing] = useState(false);
    const [records, setRecords] = useState([]);

    // Hooks
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
                const uri = `${URI}/workout`;
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
    

    // Event Handlers
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(500).then(() => setRefreshing(false));
        setSelectedDate(today);
      }, []);

    const selectHandler = (key) => {
        setSelectedId(key)
    }

    // map component
    const friend_components = (friendsList)? friendsList.map((friend, index) => {
        return (
                <FriendList friend = {friend} key = {index} selectHandler = {selectHandler} index = {index} selected = {selectedId}/>
            )
        }): null

    return (
        <View style = {styles.container}>
            <ScrollView 
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
            </ScrollView>
            <View style = {styles.btn__area}>
                <AddStartBtn 
                    params = {{innerText: "운동 추가", type: "mainAdd"}}
                    onPress = {() => navigation.navigate("ApplyStack")} 
                />
                <AddStartBtn 
                    params = {{innerText: "운동 시작", type: "mainStart"}} 
                    onPress = {() => navigation.navigate("StartWorkout")} 
                />
            </View>
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
    },
    btn__area: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: "1%",
        flex: 1, 
        flexDirection: 'row', 
        width: width * 0.7, 
        alignSelf: 'center', 
        justifyContent: 'space-around'
    }
})