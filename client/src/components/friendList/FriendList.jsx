import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const FriendList = ({ index, friend, selectHandler, selected }) => {
    return (
        <TouchableOpacity onPress = {() => selectHandler(index)}>
            <View key = {index}>
                <Text style = {[styles.friendList, (selected === index)? styles.friendList__selected : null]}>
                    {friend.username[0]}
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
        lineHeight: 30,
        borderRadius: 75,
        textAlign: 'center',
        backgroundColor: '#DDDDDD',
    },
    friendList__selected: {
        color: 'white',
        backgroundColor: "#87C5D6",  
    }

})