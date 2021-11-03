import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

const { width } = Dimensions.get('window');

const SetBox = ( params, index) => {
    const {set, weight, reps} = {...params};
    // params -> { reps, weight, set }
    return (
        <View style = {styles.container}>
            <Text>
                set {set}
            </Text>
            <Text>
                {weight} kg
            </Text>
            <Text>
                {reps} reps
            </Text>
        </View>
    )
}

export default SetBox

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: width * 0.7,
        height: 35,
        borderRadius: 20,
        borderColor: "black",
        backgroundColor: "#FFFFFF",
        marginVertical: 5,
        // shadow
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 3.84,
    }
})
