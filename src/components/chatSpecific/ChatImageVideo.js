import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, sizes } from '../../utils/Theme';
import ChatVideo from './ChatVideo';
import moment from 'moment';
import DoubleBlueTickSVG from '../../assets/SVG_Components/DoubleBlueTickSVG';
import { LinearGradient } from 'expo-linear-gradient';

const ChatImageVideo = ({ item, chatId, isLongPressed = false, toggleSelection = () => { } }) => {
    return (
        <View style={{ width: sizes.width * 0.65, height: sizes.height * 0.448, padding: 4, borderRadius: 12, backgroundColor: colors.messageBackground }}>

            {item?.type === "image" ?
                <View style={{ borderRadius: 8, overflow: 'hidden' }}>
                    <Image
                        source={{ uri: item?.uri }}
                        style={{ width: '100%', height: "100%", borderRadius: 8, }}
                    />

                    <LinearGradient
                        colors={[colors.transparent, colors.rgbaBlack(0.55)]}
                        style={{ width: 250, height: 50, transform: [{ rotate: '-15deg' }], position: 'absolute', bottom: -30, right: -25, alignSelf: 'center', }}
                    />
                </View>
                :
                item?.type === "video" ?
                    <ChatVideo
                        item={item}
                        chatId={chatId}
                        isLongPressed={isLongPressed}
                        toggleSelection={toggleSelection}
                    />
                    :
                    <></>
            }

            <View style={{ position: 'absolute', bottom: 7, right: 12, flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'flex-end', }}>
                <Text style={{ fontSize: 12, marginRight: 4, color: colors.white }}>
                    {moment(item?.createdAt).format('h:mm a')}
                </Text>
                <DoubleBlueTickSVG color={colors.blueTick} />
            </View>

        </View>
    )
}

export default React.memo(ChatImageVideo)

const styles = StyleSheet.create({})