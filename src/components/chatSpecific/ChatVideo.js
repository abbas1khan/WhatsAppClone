import { ActivityIndicator, Image, Keyboard, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as VideoThumbnails from 'expo-video-thumbnails';
import { colors, sizes } from '../../utils/Theme';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { Video, ResizeMode } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { formatTime } from '../../utils/Helper';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatVideo = ({ item, chatId, isLongPressed = false, toggleSelection = () => { } }) => {



    const [thumbnail, setThumbnail] = useState(null);
    const [loading, setLoading] = useState(true);




    const navigation = useNavigation()
    const { navigate } = useNavigation()




    const formatteTime = formatTime(item?.duration)



    async function openFullScreenVideo() {
        Keyboard.dismiss()
        navigate("VideoFullScreen", { item, chatId })
    }

    const generateThumbnail = useCallback(async (url) => {
        setLoading(true)
        try {
            const thumbnailExist = await AsyncStorage.getItem(`videoThumbnail_${item?.messageId}`)
            if (thumbnailExist) {
                setThumbnail(thumbnailExist)
            } else {
                const { uri } = await VideoThumbnails.getThumbnailAsync(url, { time: 1 })
                setThumbnail(uri)
                await AsyncStorage.setItem(`videoThumbnail_${item?.messageId}`, uri)
            }
        } catch (e) {
            // console.warn(e);
        } finally {
            setLoading(false)
        }
    }, [])








    useEffect(() => {
        if (item?.uri) {
            generateThumbnail(item?.uri)
        }
    }, [])

    return (
        <View>
            {loading ?
                <View style={{ width: '100%', height: "100%", borderRadius: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.black, }}>
                    <ActivityIndicator size={"large"} color={colors.white} />
                </View>
                :
                <Pressable
                    onPress={() => isLongPressed ? toggleSelection(item) : openFullScreenVideo()}
                    onLongPress={() => toggleSelection(item, true)}
                    style={{ borderRadius: 8, overflow: 'hidden' }}
                >
                    {thumbnail &&
                        <Image
                            source={{ uri: thumbnail }}
                            style={{ width: '100%', height: "100%", borderRadius: 8, }}
                        />
                    }

                    <LinearGradient
                        colors={[colors.transparent, colors.rgbaBlack(0.4)]}
                        style={{ width: "100%", height: 34, borderRadius: 8, position: 'absolute', bottom: -0.1, alignSelf: 'center', }}
                    />

                    <View style={{ width: '100%', height: "100%", position: 'absolute', justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ width: 48, height: 48, borderRadius: 50, backgroundColor: colors.rgbaBlack(0.4), justifyContent: 'center', alignItems: 'center', }}>
                            <View style={{ marginRight: -3 }}>
                                <FontAwesome5 name="play" size={24} color={colors.white} />
                            </View>
                        </View>
                    </View>


                    <View style={{ position: 'absolute', bottom: 4, left: 7, flexDirection: "row", }}>
                        <MaterialCommunityIcons name="video" size={18} color={colors.white} />

                        <Text style={{ fontSize: 13, marginLeft: 4, fontWeight: "500", color: colors.white }}>
                            {formatteTime}
                        </Text>
                    </View>

                </Pressable>
            }
        </View>
    )
}

export default React.memo(ChatVideo)

const styles = StyleSheet.create({})