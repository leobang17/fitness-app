import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const WorkoutStartBox = ( params ) => {
    const { index, innerText, setCount, setAvg, onPress, } = params;
    const repsDone = new Array(setCount).fill(false);

    const calcBarWidth = (barCount) => {
        return `${(100 - (barCount - 1)) / barCount}%`
    }
    return (
        <TouchableOpacity
            style = {styles.container}
            onPress = {() => onPress(index)}
        >
            <View style = {styles.text__area}>
                <Text style = {styles.text__innerText}>
                    {innerText}
                </Text>
                <Text style = {styles.text__setText}>
                    {setCount} x {setAvg}
                </Text>
            </View>
            <View style = {styles.status__area}>
                {
                    repsDone?
                    repsDone.map((repsDoneIter, index) => {
                        return (
                            <View 
                                key = {index}
                                style = {dstyles(calcBarWidth(setCount)).container}
                            >
                            </View>
                        )
                    })
                    : null
                }
                <View style = {styles.status__bar}>

                </View>
            </View>
        </TouchableOpacity>
    )
}

export default WorkoutStartBox

const styles = StyleSheet.create({
    container: {
        width: "80%",
        alignSelf: 'center',
        backgroundColor: "#87C5D6"
    }, 
    text__area: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    text__innerText: {},
    text__setText: {},
    status__area: {
        width: "80%",
        height: 10,
        backgroundColor: "yellow",
        flexDirection: "row",
        justifyContent: "space-between"
    }, 
    status__bar: {
    },
})

const dstyles = (props) => StyleSheet.create({
    container: {
        width: props,
        height: "100%",
        backgroundColor: "blue"
    }
})