import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Video, ResizeMode } from 'expo-av';
import { colors, sizes } from '../../utils/Theme';

const ChatImageVideo = ({ item }) => {
    return (
        <View style={{ width: sizes.width * 0.65, height: sizes.height * 0.448, padding: 4, borderRadius: 12, backgroundColor: colors.messageBackground }}>

            {item?.type === "image" ?
                <Image
                    source={{ uri: item?.uri }}
                    style={{ width: '100%', height: "100%", borderRadius: 8, }}
                />
                :
                item?.type === "video" ?
                    <Video
                        style={{ width: '100%', height: '100%', borderRadius: 8, }}
                        source={{ uri: item?.uri }}
                        useNativeControls
                        resizeMode={ResizeMode.COVER}
                    />
                    :
                    <></>
            }

        </View>
    )
}

export default React.memo(ChatImageVideo)

const styles = StyleSheet.create({})