import { ActivityIndicator, Image, Keyboard, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as VideoThumbnails from 'expo-video-thumbnails';
import { colors, sizes } from '../../utils/Theme';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { Video, ResizeMode } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const ChatVideo = ({ item, chatId, isSelected = false, toggleSelection = () => { } }) => {



    const [thumbnail, setThumbnail] = useState(null);
    const [loading, setLoading] = useState(true);




    const navigation = useNavigation()
    const { navigate } = useNavigation()




    function formatTime(milliseconds) {
        var hours = Math.floor(milliseconds / 3600000);
        var remainingMilliseconds = milliseconds % 3600000;
        var minutes = Math.floor(remainingMilliseconds / 60000);
        var seconds = Math.floor((remainingMilliseconds % 60000) / 1000);

        var formattedTime = "";
        if (hours > 0) {
            formattedTime += hours + ":" + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        } else {
            formattedTime += minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }

        return formattedTime;
    }

    const formatteTime = formatTime(item?.duration)



    async function openFullScreenVideo() {
        Keyboard.dismiss()
        navigate("VideoFullScreen", { item, chatId })
    }

    const generateThumbnail = useCallback(async (url) => {
        setLoading(true)
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(url, { time: 100 });
            setThumbnail(uri)
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
                    onPress={() => isSelected ? toggleSelection(item) : openFullScreenVideo()}
                    onLongPress={() => toggleSelection(item, true)}
                >
                    {thumbnail &&
                        <Image
                            source={{ uri: thumbnail }}
                            style={{ width: '100%', height: "100%", borderRadius: 8, }}
                        />
                    }

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