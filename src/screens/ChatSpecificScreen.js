import { FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { colors, sizes } from '../utils/Theme'
import ThreeDotsSVG from '../assets/SVG_Components/ThreeDotsSVG'
import { Ionicons, Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import useScreenFocus from '../hooks/useScreenFocus'
import * as NavigationBar from 'expo-navigation-bar';
import SendIconSVG from '../assets/SVG_Components/SendIconSVG'
import PaperClipSVG from '../assets/SVG_Components/PaperClipSVG'
import CameraChatSpecificSVG from '../assets/SVG_Components/CameraChatSpecificSVG'
import DraggableFlatList from "react-native-draggable-flatlist";
import { sendMessage } from '../redux/ChatRosterSlice'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import DoubleBlueTickSVG from '../assets/SVG_Components/DoubleBlueTickSVG'
import generateItems from '../services/generateItems'
import { Menu } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import ChatImageVideo from '../components/chatSpecific/ChatImageVideo'
import ChatTextMessage from '../components/chatSpecific/ChatTextMessage'

const ChatSpecificScreen = () => {




    const route = useRoute()
    const chatId = route.params?.chatId
    const chatRoster = useSelector((state) => state.chatRoster.chats)
    const thisChatData = chatRoster.find((item) => item?.chatId == chatId)
    const messages = thisChatData?.messages || []
    // console.log("🚀 ~ ChatSpecificScreen ~ messages:", messages)




    const sortedMessages = generateItems(messages);
    // console.log("🚀 ~ ChatSpecificScreen ~ sortedMessages:", JSON.stringify(sortedMessages))






    const [messageText, setMessageText] = useState("")
    const [showAddMediaMenu, setShowAddMediaMenu] = useState(false)
    const [showScrollDown, setShowScrollDown] = useState(false)




    const navigation = useNavigation()
    const { navigate } = useNavigation()
    const flatListRef = useRef()
    const dispatch = useDispatch()




    const renderMessages = ({ item, index }) => {
        if (item?.type === 'day') {
            return (
                <View style={{ alignItems: 'center', marginTop: 9, marginBottom: 8 }}>
                    <View style={{ height: 28, paddingHorizontal: 10, borderRadius: 8, backgroundColor: colors.dayTimeBackground, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontSize: 13, color: colors.textinputPlaceHolder, fontWeight: '500' }}>
                            {item.date}
                        </Text>
                    </View>
                </View>
            )
        }
        return (
            <View>
                <Pressable
                    onLongPress={() => { }}
                >
                    <View style={{ alignItems: 'flex-end', paddingRight: 16, marginVertical: 1.5, }}>
                        {item?.type === "text" ?
                            <ChatTextMessage
                                item={item}
                            />
                            :
                            (item?.type === "image" || item?.type === "video") ?
                                <ChatImageVideo
                                    item={item}
                                />
                                : <></>
                        }
                    </View>
                </Pressable>
            </View>
        )
    }






    function onSendMessage() {
        if (messageText?.trim()?.length > 0) {
            const localDate = Date.now()
            let message = {
                _id: localDate,
                type: "text",
                content: messageText?.trim(),
                messageId: localDate,
                createdAt: localDate,
            }
            dispatch(sendMessage({ message: message, chatId: chatId }))
            setMessageText("")
            setTimeout(() => {
                flatListRef?.current?.scrollToOffset({ offset: 0, animated: true })
            }, 0);
        }
    }

    async function galleryPress() {
        setShowAddMediaMenu(false)

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
            console.log("🚀 ~ galleryPress ~ result.assets:", JSON.stringify(result.assets))
            result.assets?.map((item) => {
                const localDate = Date.now()

                let message = {
                    _id: localDate,
                    type: item?.type,
                    uri: item?.uri,
                    messageId: localDate,
                    createdAt: localDate,
                }

                if (item?.type === "video") {
                    message.duration = item?.duration
                }

                dispatch(sendMessage({ message: message, chatId: chatId }))
            })
        }
    }

    function onScroll(e) {
        const y = e.nativeEvent.contentOffset.y;
        if (y > 327) {
            if (!showScrollDown) {
                setShowScrollDown(true)
            }
        } else {
            if (showScrollDown) {
                setShowScrollDown(false)
            }
        }
    }




    useScreenFocus(() => {
        NavigationBar.setBackgroundColorAsync(colors.chatScreenNavigationBackground);
        NavigationBar.setButtonStyleAsync("light");
    })


    return (
        <View style={{ flex: 1, backgroundColor: colors.chatBackground, }}>




            {/* ------------------------- Header ------------------------ */}
            <View style={{ height: 56, backgroundColor: colors.header, flexDirection: 'row', justifyContent: "space-between", }}>

                {/* Back Button and Profile Picture */}
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={{ paddingLeft: 6, paddingRight: 9, flexDirection: 'row', alignItems: 'center', }}
                >

                    {/* Back Icon */}
                    <Ionicons name="arrow-back-sharp" size={23} color={colors.white} />

                    {/* Profie Picture of User */}
                    <Image
                        source={{ uri: thisChatData?.profilePic }}
                        style={{ width: 35, height: 35, marginLeft: 1, borderRadius: 40 }}
                    />
                </TouchableOpacity>

                {/* Name of User */}
                <TouchableOpacity
                    onPress={() => { }}
                    style={{ flex: 1, justifyContent: 'center', }}
                >
                    <Text
                        numberOfLines={1}
                        style={{ fontSize: 18, color: colors.white, }}
                    >
                        {thisChatData?.name}
                    </Text>
                </TouchableOpacity>

                {/* Three dots Button */}
                <TouchableOpacity
                    onPress={() => { }}
                    style={{ paddingHorizontal: 16, justifyContent: 'center', }}
                >
                    <ThreeDotsSVG size={18} />
                </TouchableOpacity>
            </View>








            {/* ------------------------- Body & Footer ------------------------ */}
            <ImageBackground
                tintColor={colors.chatBackgroundImage}
                source={require("../assets/images/ChatBackground.png")}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1 }}>

                    <FlatList
                        data={sortedMessages}
                        extraData={sortedMessages}
                        inverted={true}
                        ref={flatListRef}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index}
                        renderItem={renderMessages}
                        onScroll={onScroll}
                    />

                </View>











                {/* ------------------------- Footer ------------------------ */}
                <View style={{ padding: 4, flexDirection: 'row', alignItems: 'flex-end' }}>

                    <View style={{ flex: 1, minHeight: 47, maxHeight: 137, marginRight: 4, borderRadius: 25, backgroundColor: colors.textInputBackground, flexDirection: 'row', alignItems: 'flex-end' }}>


                        {/* Media Button */}
                        <Menu
                            visible={showAddMediaMenu}
                            onDismiss={() => { setShowAddMediaMenu(false) }}
                            anchor={
                                <TouchableOpacity
                                    onPress={() => { setShowAddMediaMenu(true) }}
                                    style={{ width: 48, height: 47, justifyContent: 'center', alignItems: 'center', }}
                                >
                                    <View style={{ transform: [{ rotate: '90deg' }, { scaleX: -1 }] }}>
                                        <PaperClipSVG size={20} color={colors.paperClip} />
                                    </View>
                                </TouchableOpacity>
                            }
                            contentStyle={{ backgroundColor: colors.addMediaPopupBackground, marginBottom: 48, borderRadius: 15 }}
                        >
                            <View style={{ width: sizes.width * 0.95, paddingVertical: 22, flexDirection: 'row', justifyContent: 'space-evenly', alignSelf: 'center' }}>

                                {/* Document Button */}
                                <Pressable
                                    onPress={() => { documentPress() }}
                                    style={styles.addMediaButtonParentView}
                                >
                                    <View style={styles.addMediaIconCircleView}>
                                        <View style={styles.addMediaIconColorsView}>
                                            <View style={[styles.flexOneView, { backgroundColor: colors.addMediaDocumentIconTop }]} />
                                            <View style={[styles.flexOneView, { backgroundColor: colors.addMediaDocumentIconBottom }]} />
                                        </View>
                                    </View>

                                    <Text style={styles.addMediaButtonText}>
                                        Document
                                    </Text>
                                </Pressable>

                                {/* Camera Button */}
                                <Pressable
                                    onPress={() => { cameraPress() }}
                                    style={styles.addMediaButtonParentView}
                                >
                                    <View style={styles.addMediaIconCircleView}>
                                        <View style={styles.addMediaIconColorsView}>
                                            <View style={[styles.flexOneView, { backgroundColor: colors.addMediaCameraIconTop }]} />
                                            <View style={[styles.flexOneView, { backgroundColor: colors.addMediaCameraIconBottom }]} />
                                        </View>

                                        <View style={{}}>
                                            <CameraChatSpecificSVG size={21} color={colors.white} />
                                        </View>
                                    </View>

                                    <Text style={styles.addMediaButtonText}>
                                        Camera
                                    </Text>
                                </Pressable>

                                {/* Gallery Button */}
                                <Pressable
                                    onPress={() => { galleryPress() }}
                                    style={styles.addMediaButtonParentView}
                                >
                                    <View style={styles.addMediaIconCircleView}>
                                        <View style={styles.addMediaIconColorsView}>
                                            <View style={[styles.flexOneView, { backgroundColor: colors.addMediaGalleryIconTop }]} />
                                            <View style={[styles.flexOneView, { backgroundColor: colors.addMediaGalleryIconBottom }]} />
                                        </View>
                                    </View>

                                    <Text style={styles.addMediaButtonText}>
                                        Gallery
                                    </Text>
                                </Pressable>
                            </View>
                        </Menu>


                        {/* Message Text Input */}
                        <TextInput
                            value={messageText}
                            placeholder='Message'
                            multiline={true}
                            cursorColor={colors.sendMessageButton}
                            placeholderTextColor={colors.textinputPlaceHolder}
                            onChangeText={(text) => setMessageText(text)}
                            style={{ minHeight: 47, fontSize: 18, flex: 1, paddingVertical: 6, color: colors.white }}
                        />


                        {/* Camera Button */}
                        <TouchableOpacity
                            style={{ width: 50, height: 47, justifyContent: 'center', alignItems: 'center', }}
                        >
                            <CameraChatSpecificSVG size={21} color={colors.cameraChatSpecific} />
                        </TouchableOpacity>

                    </View>


                    {/* Send Message Button */}
                    <TouchableOpacity
                        onPress={() => onSendMessage()}
                        style={{ width: 47, height: 47, borderRadius: 50, backgroundColor: colors.sendMessageButton, justifyContent: 'center', alignItems: 'center', }}
                    >
                        <View style={{ transform: [{ rotate: '45deg' }], marginLeft: -4 }}>
                            <SendIconSVG size={20} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>


        </View>
    )
}

export default ChatSpecificScreen

const styles = StyleSheet.create({
    addMediaIconColorsView: {
        width: '100%',
        height: '100%',
        position: "absolute",
    },
    addMediaButtonParentView: {
        alignItems: 'center',
    },
    addMediaButtonText: {
        fontSize: 13,
        marginTop: 5,
        color: colors.cameraChatSpecific
    },
    flexOneView: {
        flex: 1,
    },
    addMediaIconCircleView: {
        width: 54,
        height: 54,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: "hidden",
    },
})  
