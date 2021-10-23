import React from 'react'
import { View, Text } from 'react-native'

const ApplyRoutineDetailScreen = ({navigation, route }) => {
    const { routineId, routineName } = route.params;
    return (
        <View>
            <Text>{routineId}, {routineName}</Text>
            <Text>루틴 적용하고 - 거기서 디테일 뷰 </Text>
        </View>
    )
}

export default ApplyRoutineDetailScreen
