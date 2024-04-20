import { ActivityIndicator, Animated, InteractionManager, Pressable, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Video, ResizeMode } from 'expo-av';
import { colors, hexToRGBA, sizes } from '../utils/Theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import useScreenFocus from '../hooks/useScreenFocus';
import * as NavigationBar from 'expo-navigation-bar';
import Slider from '@react-native-community/slider';
import * as Progress from 'react-native-progress';
import { FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import useDebounce from '../hooks/useDebounce';
import moment from 'moment';
import ForwardSVG from '../assets/SVG_Components/ForwardSVG';
import { Button, Dialog, Menu, Portal } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { deleteMessage } from '../redux/ChatRosterSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { saveMedia, shareMedia } from '../services/ChatHelper';
import { formatTime } from '../utils/Helper';

let disabled = false

const VideoFullScreen = () => {



    const route = useRoute()
    const item = route.params?.item
    const chatId = route.params?.chatId




    const [isPlaying, setIsPlaying] = useState(true)
    const [duration, setDuration] = useState(0)
    const [position, setPosition] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [showIcons, setShowIcons] = useState(true)
    const [showMenu, setShowMenu] = useState(false)
    const [showDeletePopUp, setShowDeletePopUp] = useState(false)




    const slideAnimation = useRef(new Animated.Value(0)).current;

    const translateY = slideAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0],
    });





    const value = position / duration
    const videoRef = useRef(null)
    const navigation = useNavigation()
    const { navigate } = useNavigation()
    const dispatch = useDispatch()




    const handleHideIcons = useDebounce(() => {
        if (isPlaying && !disabled) {
            setShowIcons(false)
        }
    }, 2500);

    async function onReadyForDisplay() {
        if (videoRef?.current) {
            await videoRef?.current?.playAsync()
            setTimeout(() => {
                setShowIcons(false)
            }, 1000);
        }
    }

    const handlePlayPause = async () => {
        if (isPlaying) {
            await videoRef?.current?.pauseAsync()
        } else {
            await videoRef?.current?.playAsync()
        }
        setIsPlaying((isPlaying) => !isPlaying);

        handleHideIcons()
    }

    const handleSliderChange = async (value) => {
        disabled = false
        videoRef?.current?.setPositionAsync(value * duration)
        setPosition(value * duration)

        handleHideIcons()
    }

    const handleVideoReady = (status) => {
        setDuration(status.durationMillis)
    }

    const handleVideoProgress = async (status) => {
        setPosition(status.positionMillis)
        setIsLoading(status.isBuffering)
        if (status.didJustFinish) {
            setPosition(0)
            setIsPlaying(false)
            setShowIcons(true)
            await videoRef?.current?.setPositionAsync(0)
            await videoRef?.current?.pauseAsync()
        }
    }

    const handlePress = () => {
        setShowIcons((prev) => !prev); // Toggle showIcons state

        handleHideIcons()
    };

    function closeMenu() {
        setShowMenu(false)
    }

    async function onShare() {
        closeMenu()
        shareMedia(item)
    }

    async function onSave() {
        closeMenu()
        saveMedia(item)
    }

    function onDelete() {
        closeMenu()
        setShowDeletePopUp(true)
    }

    function deleteThisMessage() {
        hideDeletePopup()
        navigation.goBack()
        dispatch(deleteMessage({ messageId: item?.messageId, chatId: chatId }))
        ToastAndroid.show("Message deleted", ToastAndroid.SHORT);
    }

    function hideDeletePopup() {
        setShowDeletePopUp(false)
    }






    useScreenFocus(() => {
        NavigationBar.setBackgroundColorAsync(colors.black)
        NavigationBar.setButtonStyleAsync("light")
    })

    useEffect(() => {
        Animated.timing(slideAnimation, {
            toValue: showIcons ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [showIcons])


    return (
        <View style={{ flex: 1, backgroundColor: colors.black, }}>
            <StatusBar backgroundColor={showIcons ? colors.videoFullScreenHeaderBackground : colors.black} barStyle={showIcons ? "light-content" : "dark-content"} />

            <Video
                source={{ uri: item?.uri }}
                ref={videoRef}
                resizeMode={ResizeMode.CONTAIN}
                onFullscreenUpdate={false}
                style={{ width: '100%', height: '100%' }}
                onLoad={handleVideoReady}
                onPlaybackStatusUpdate={handleVideoProgress}
                onReadyForDisplay={onReadyForDisplay}
            />



            <Pressable
                onPress={() => handlePress()}
                style={{ width: '100%', height: '100%', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}
            >
                {isLoading &&
                    <Progress.CircleSnail thickness={4} size={95} color={colors.rgbaWhite(0.5)} />
                }

                {showIcons &&
                    <Pressable
                        onPress={() => handlePlayPause()}
                        style={{ width: 70, height: 70, borderRadius: 80, backgroundColor: colors.rgbaBlack(0.4), position: 'absolute', justifyContent: 'center', alignItems: 'center', }}
                    >
                        {isPlaying ?
                            <View>
                                <Fontisto name="pause" size={26} color={colors.white} />
                            </View>
                            :
                            <View style={{ marginRight: -3 }}>
                                <FontAwesome5 name="play" size={24} color={colors.white} />
                            </View>
                        }
                    </Pressable>
                }

            </Pressable>



            <View style={{ opacity: showIcons ? 1 : 0, height: 56, width: "100%", position: 'absolute', flexDirection: 'row', backgroundColor: hexToRGBA(colors.background, 0.5), }}>
                <Pressable
                    disabled={!showIcons}
                    onPress={() => navigation.goBack()}
                    style={{ width: 50, height: '100%', justifyContent: 'center', alignItems: 'center', }}
                >
                    <MaterialIcons name="arrow-back" size={24} color={colors.white} />
                </Pressable>


                <View style={{ flex: 1, justifyContent: 'center', }}>
                    <Text style={{ fontSize: 16, color: colors.white }}>
                        You
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.white }}>
                        {moment(item?.createdAt).format('DD MMMM, h:mm a')}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => { }}
                    disabled={!showIcons}
                    style={styles.topRightButtonsView}
                >
                    <ForwardSVG size={20} />
                </TouchableOpacity>


                <Menu
                    visible={showMenu}
                    onDismiss={() => closeMenu()}
                    anchor={
                        <TouchableOpacity
                            disabled={!showIcons}
                            onPress={() => { setShowMenu(true) }}
                            style={styles.topRightButtonsView}
                        >
                            <MaterialCommunityIcons name="dots-vertical" size={24} color={colors.white} />
                        </TouchableOpacity>
                    }
                    contentStyle={{ backgroundColor: colors.header, marginTop: 12, borderRadius: 12 }}
                >
                    <Menu.Item
                        title="Share"
                        titleStyle={{ color: colors.white }}
                        onPress={() => onShare()}
                    />
                    <Menu.Item
                        title="Save"
                        titleStyle={{ color: colors.white }}
                        onPress={() => onSave()}
                    />
                    <Menu.Item
                        title="Delete"
                        titleStyle={{ color: colors.white }}
                        onPress={() => onDelete()}
                    />
                </Menu>

            </View>




            <Animated.View
                style={{
                    height: 78, width: '100%', paddingHorizontal: 24, flexDirection: 'row', position: 'absolute', bottom: 0, justifyContent: 'space-between', alignItems: 'center',
                    transform: [{ translateY }],
                }}
            >
                <Text style={styles.durationText}>
                    {formatTime(position)}
                </Text>

                <Slider
                    style={{ flex: 1, height: 78 }}
                    minimumValue={0}
                    maximumValue={1}
                    value={value}
                    onSlidingStart={() => { disabled = true }}
                    onSlidingComplete={handleSliderChange}
                    maximumTrackTintColor={colors.white}
                    minimumTrackTintColor={colors.createNewChatButton}
                />

                <Text style={styles.durationText}>
                    {formatTime(duration)}
                </Text>

                <LinearGradient
                    // Background Linear Gradient
                    colors={[colors.transparent, colors.black]}
                    style={{ width: sizes.width, height: '80%', position: 'absolute', zIndex: -1 }}
                />
            </Animated.View>








            {/* Delete Message PopUp */}
            <Portal>
                <Dialog
                    visible={showDeletePopUp}
                    onDismiss={hideDeletePopup}
                    style={{ backgroundColor: colors.deletePopupBackground }}
                >
                    <Dialog.Content>
                        <Text variant="bodyMedium" style={{ color: colors.textinputPlaceHolder }}>
                            Delete message?
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDeletePopup} textColor={colors.createNewChatButton}>
                            Cancel
                        </Button>
                        <Button onPress={deleteThisMessage} textColor={colors.createNewChatButton}>
                            Delete
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>


        </View>
    )
}

export default VideoFullScreen

const styles = StyleSheet.create({
    topRightButtonsView: {
        width: 44,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    durationText: {
        color: colors.white,
        fontWeight: '700'
    },
})