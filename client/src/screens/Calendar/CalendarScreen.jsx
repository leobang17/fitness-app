import React, {useState, useCallback, useEffect} from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, RefreshControl, ScrollView, Button } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import {Calendar, CalendarList, Agenda, Arrow, WeekCalendar} from 'react-native-calendars';
import axios from "axios";

import FriendList from '../../components/friendList/FriendList';
import { UserDataSet } from '../../DataSet';
import RoutineBox from '../../components/routineBox/RoutineBox';
import AddStartBtn from '../../components/addStartBtn/AddStartBtn';


const {width} = Dimensions.get("window");

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const CalendarScreen = ({ navigation }) => {
    let today = new Date()
    today = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const [test, setTest] = useState([]);

    useEffect(() => {

        const response = axios.get(`http://localhost:3000/api/user`)
        response.then((res) => {
            console.log(res.data.user);
            console.log(typeof res.data.user);
            setTest(res.data.user);
        }).catch((err) => console.log(err));


        // const getFriendLists = async () => {
        //     try {
        //         const res = await axios.get(`http://localhost:3000/api/user`)
        //             // .then((res) => {
        //                 // console.log
        //             // })
        //         console.log(res.data.user);
        //         console.log(typeof(res.data.user));
        //         setTest(res.data.user);
                
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }
        // getFriendLists();
    }, []);

    useEffect(() => {
        console.log(test[0]);
    }, [test])

    // States
    const [friendsList, setFriendsList] = useState(UserDataSet);
    const [selectedId, setSelectedId] = useState(0);
    const [selectedDate, setSelectedDate] = useState(today);
    const [refreshing, setRefreshing] = useState(false);
    

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
            <Text>{test.username}</Text>

            {/* {
                test.map((iter) => {
                    return (
                        <View>
                            <Text>{iter}</Text>
                        </View>
                    )
                })
            } */}
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
                        routines.map((routine, index) => {
                            return <RoutineBox key = {index} routine = {routine} />
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

const routines = [
    "벤치프레스", "오버헤드프레스", "풀업", "덤벨프레스", "싯업", "백익스텐션"
]