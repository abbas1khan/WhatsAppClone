import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, sizes } from '../../utils/Theme';
import ChatVideo from './ChatVideo';

const ChatImageVideo = ({ item, isSelected = false, toggleSelection = () => { } }) => {
    return (
        <View style={{ width: sizes.width * 0.65, height: sizes.height * 0.448, padding: 4, borderRadius: 12, backgroundColor: colors.messageBackground }}>

            {item?.type === "image" ?
                <Image
                    source={{ uri: item?.uri }}
                    style={{ width: '100%', height: "100%", borderRadius: 8, }}
                />
                :
                item?.type === "video" ?
                    <ChatVideo
                        item={item}
                        isSelected={isSelected}
                        toggleSelection={toggleSelection}
                    />
                    :
                    <></>
            }

        </View>
    )
}

export default React.memo(ChatImageVideo)

const styles = StyleSheet.create({})