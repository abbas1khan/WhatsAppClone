import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, sizes } from '../../utils/Theme'
import { openFile } from '../../services/ChatHelper'
import { convertBytes, getFileTypeFromName } from '../../utils/Helper'
import FileGreySVG from '../../assets/SVG_Components/FileGreySVG'
import DoubleBlueTickSVG from '../../assets/SVG_Components/DoubleBlueTickSVG'
import moment from 'moment'

const ChatFile = ({ item, isLongPressed = false, toggleSelection = () => { } }) => {

    const size = convertBytes(item?.size)
    const fileType = getFileTypeFromName(item?.name)?.toUpperCase()
    const isPDF = fileType === "PDF"
    const fileTypeFontSize = fileType?.length ? (22 / fileType?.length) : 6

    return (
        <Pressable
            onPress={() => isLongPressed ? toggleSelection(item) : openFile(item)}
            onLongPress={() => toggleSelection(item, true)}
        >
            <View style={{ width: sizes.width * 0.73, padding: 5, paddingBottom: 0, borderRadius: 12, backgroundColor: colors.messageBackground }}>
                <View style={{ borderRadius: 8, flexDirection: 'row', backgroundColor: colors.chatFileBackground, }}>
                    <View style={{ paddingLeft: 8, paddingTop: 15 }}>
                        <View style={{ marginHorizontal: -3 }}>
                            <FileGreySVG />
                            <Text style={{ fontSize: fileTypeFontSize, marginTop: 12, fontWeight: '800', color: colors.white, position: 'absolute', alignSelf: "center" }}>
                                {fileType}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, padding: 8 }}>
                        <Text style={{ fontSize: 15, color: colors.white }}>
                            {item?.name}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={styles.textStyle}>
                                {size}
                            </Text>

                            {size && fileType &&
                                <Text style={[styles.textStyle, { letterSpacing: 1 }]}>
                                    {" • "}
                                </Text>
                            }

                            <Text style={styles.textStyle}>
                                {fileType}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 4, marginBottom: 3, marginRight: 7, flexDirection: 'row', alignSelf: 'flex-end', }}>
                    <Text style={{ fontSize: 12, marginRight: 5, color: colors.messageTime }}>
                        {moment(item?.createdAt).format('h:mm a')}
                    </Text>

                    <DoubleBlueTickSVG color={colors.blueTick} />
                </View>
            </View>
        </Pressable>
    )
}

export default React.memo(ChatFile)

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 12,
        color: colors.fileSize,
    },
})  