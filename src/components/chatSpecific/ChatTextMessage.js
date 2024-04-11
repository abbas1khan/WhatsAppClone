import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, sizes } from '../../utils/Theme'
import moment from 'moment'
import DoubleBlueTickSVG from '../../assets/SVG_Components/DoubleBlueTickSVG'

const chatTextMessage = ({ item }) => {
    return (
        <View style={{ maxWidth: sizes.width * 0.8, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 12, backgroundColor: colors.messageBackground, }}>
            <Text style={{ fontSize: 16, color: colors.white }}>
                {item?.content}
            </Text>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'flex-end', }}>
                <Text style={{ fontSize: 11, marginTop: 6, marginRight: 4, color: colors.messageTime }}>
                    {moment(item?.createdAt).format('LT')}
                </Text>

                <DoubleBlueTickSVG size={18} color={colors.blueTick} />
            </View>
        </View>
    )
}

export default React.memo(chatTextMessage)

const styles = StyleSheet.create({})