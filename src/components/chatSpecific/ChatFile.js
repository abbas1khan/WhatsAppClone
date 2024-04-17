import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, sizes } from '../../utils/Theme'
import { openFile } from '../../services/ChatHelper'
import { convertBytes, getFileTypeFromName } from '../../utils/Helper'

const ChatFile = ({ item, isSelected = false, toggleSelection = () => { } }) => {

    const size = convertBytes(item?.size)
    const fileType = getFileTypeFromName(item?.name)?.toUpperCase()

    return (
        <Pressable
            onPress={() => isSelected ? toggleSelection(item) : openFile(item)}
            onLongPress={() => toggleSelection(item, true)}
        >
            <View style={{ width: sizes.width * 0.73, padding: 5, borderRadius: 12, backgroundColor: colors.messageBackground }}>
                <View style={{ padding: 8, backgroundColor: colors.chatFileBackground, borderRadius: 8 }}>
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
        </Pressable>
    )
}

export default ChatFile

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 12,
        color: colors.fileSize,
    },
})  