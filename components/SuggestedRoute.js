import { Image, Text, View } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { iconSize, gap, spaceBetween, textBold, round } from '../constants/styles'
import { Icon } from '@rneui/base'
import { Colors } from '../constants/colors'
import { useDispatch } from 'react-redux'

// Van toc nguoi di bo (met/min)
const walkingSpeed = 80
// Van toc xe buyt (met/min)
const busSpeed = 313


export default SuggestedRoute = ({ suggestedRoute }) => {
    const dispatch = useDispatch();
    const listRouteName = suggestedRoute.filter(item => item.routeNumber).map(item => item.routeNumber).join(", ")
    const ammount = 1000
    var cost = 0
    var time = 0
    const totalDistance = (listPoint) => {
        var totalDistance = listPoint.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.distance;
        }, 0);
        return totalDistance
    }
    suggestedRoute.forEach(item => {
        if (item.routeNumber) {
            item.totalDistance = totalDistance(item.listPoint)
            cost += item.cost
            time += item.totalDistance / busSpeed
        } else {
            time += item.totalDistance / walkingSpeed

        }
    });
    return (
        <View style={styles.container}>
            <View style={{ ...spaceBetween , marginBottom: 10}}>
                <Text style={textBold(14)}>Đi tuyến số  - {listRouteName}</Text>
                <View style={gap(5)}>
                    <Text style={round(Colors.blue, 10)}>{Math.round(time)} phút</Text>
                    <Text style={round(Colors.primary, 10)}>{cost.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                </View>
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
