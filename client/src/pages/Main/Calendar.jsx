import React, {useState} from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import FriendList from '../../components/friendList/FriendList';
import { UserDataSet } from '../../DataSet';

const {width} = Dimensions.get("window");

const Calendar = () => {
    const [friendsList, setFriendsList] = useState(UserDataSet);
    const [selectedId, setSelectedId] = useState(0);

    const selectHandler = (key) => {
        setSelectedId(key)
    }
    
    const friend_components = friendsList.map((friend, index) => {
        return (
            // <TouchableOpacity>
                <FriendList friend = {friend} key = {index} selectHandler = {selectHandler} index = {index} selected = {selectedId}/>
            // </TouchableOpacity>
        )
    })

    return (
        <View>
            <View style = {styles.calender__header} />
            <View style = {styles.friends__container}>
                {friend_components}
            </View>
            <View>
                <Text>{friendsList[selectedId].username}</Text>
            </View>
        </View>
    )
}

export default Calendar

const styles = StyleSheet.create({
    container: {},
    calender__header: {
        height: 50,
    },
    friends__container: {
        width: width * 0.9,
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
    }
})
