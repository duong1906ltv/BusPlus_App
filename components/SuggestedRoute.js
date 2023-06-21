import { Image, Text, View } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { iconSize, gap, spaceBetween, textBold, round } from '../constants/styles'
import { Icon } from '@rneui/base'
import { Colors } from '../constants/colors'
import { useDispatch } from 'react-redux'

export default SuggestedRoute = ({ suggestedRoute }) => {
    const dispatch = useDispatch();
    const listRouteName = suggestedRoute.filter(item => item.routeNumber).map(item => item.routeNumber).join(", ")
    const ammount = 1000
    const totalDistance = (listPoint) => {
        var totalDistance = listPoint.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.distance;
        }, 0);
        return totalDistance
    }
    suggestedRoute.forEach(item => {
        if (item.routeNumber) {
            item.totalDistance = totalDistance(item.listPoint)
        }
    });
    return (
            <View style={styles.container}>
                <View style={spaceBetween}>
                    <Text style={textBold(14)}>Đi tuyến số  - {listRouteName}</Text>
                    <Text style={round(Colors.orange, 15)}>1.000</Text>
                </View>
                <View style={gap(10)}>
                    {
                        suggestedRoute.map((item, index) => (
                            <>
                                {
                                    !!index
                                        ? (
                                            <Icon style={{ marginTop: 5 }} name="ios-chevron-forward-outline" type="ionicon" />
                                        )
                                        : <></>
                                }
                                {
                                    item.routeNumber === null
                                        ? (
                                            <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                                                <Image style={iconSize(30)} source={require('../assets/images/icon_walking_person.png')} />
                                                <Text>{item.totalDistance}m</Text>
                                            </View>
                                        ) : <></>
                                }
                                {
                                    item.routeNumber
                                        ? (
                                            <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3 }}>
                                                    <Image style={iconSize(25)} source={require('../assets/images/icon_bus.png')} />
                                                    <Text style={styles.roundSmall}>{item.routeNumber}</Text>
                                                </View>
                                                <Text>{item.totalDistance}m</Text>
                                            </View>
                                        ) : <></>
                                }
                            </>
                        ))
                    }
                </View>
            </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 15,

    },
    roundSmall: {
        color: 'black',
        borderWidth: 1,
        borderColor: 'black',
        padding: 2,
        borderRadius: 5,
        fontSize: 9
    }
})
