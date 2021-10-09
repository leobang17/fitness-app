import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const FriendList = ({ index, friend, selectHandler, selected }) => {
    return (
        <TouchableOpacity onPress = {() => selectHandler(index)}>
            <View key = {index} style = {
                    (selected === index)? styles.friendList__selected : styles.friendList
            }>
                <Text style = {styles.friendList}>
                    {friend.name[0]}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default FriendList

const styles = StyleSheet.create({
    friendList : {
        marginHorizontal: 5,
        height: 30,
        width: 30,
        borderRadius: 75,
        textAlign: 'center',
        lineHeight: 30,
        border: 2 
    },
    friendList__selected: {
        marginHorizontal: 5,
        height: 30,
        width: 30,
        borderRadius: 75,
        textAlign: 'center',
        lineHeight: 30,
        backgroundColor: "#87C5D6",  
    }

})