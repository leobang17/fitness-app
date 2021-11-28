import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const WorkoutStartBox = ( params ) => {
    const { index, innerText, setCount, setAvg, onPress, repsDone } = params;

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
                        let [ isRightEnd, isLeftEnd ] = [false, false]
                        if (index === 0) {
                            isLeftEnd = true;
                        } else if (index === repsDone.length - 1) {
                            isRightEnd = true;
                        }

                        return (
                            <View 
                                key = {index}
                                style = {dstyles(calcBarWidth(setCount), repsDoneIter, isLeftEnd, isRightEnd).bar}
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
        flexDirection: "row",
        justifyContent: "space-between"
    }, 
    status__bar: {
    },
})

const dstyles = (barWidth, isDone, isLeftEnd, isRightEnd) => StyleSheet.create({
    bar: {
        width: barWidth,
        height: "100%",
        backgroundColor: isDone ? "yellow" : "white",
        borderTopLeftRadius: isLeftEnd ? 3 : null,
        borderBottomLeftRadius: isLeftEnd ? 3 : null,
        borderTopRightRadius: isRightEnd ? 3 : null,
        borderBottomRightRadius: isRightEnd ? 3 : null
    }
})