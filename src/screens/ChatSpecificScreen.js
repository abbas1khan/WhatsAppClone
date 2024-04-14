import { BackHandler, FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { colors, hexToRGBA, sizes } from '../utils/Theme'
import { Ionicons, Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import useScreenFocus from '../hooks/useScreenFocus'
import * as NavigationBar from 'expo-navigation-bar';
import SendIconSVG from '../assets/SVG_Components/SendIconSVG'
import PaperClipSVG from '../assets/SVG_Components/PaperClipSVG'
import CameraChatSpecificSVG from '../assets/SVG_Components/CameraChatSpecificSVG'
import DraggableFlatList from "react-native-draggable-flatlist";
import { deleteMessage, sendMessage } from '../redux/ChatRosterSlice'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import DoubleBlueTickSVG from '../assets/SVG_Components/DoubleBlueTickSVG'
import generateItems from '../services/generateItems'
import { Menu } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import ChatImageVideo from '../components/chatSpecific/ChatImageVideo'
import ChatTextMessage from '../components/chatSpecific/ChatTextMessage'
import { Button, Dialog, Portal, PaperProvider } from 'react-native-paper';
import DocumentSVG from '../assets/SVG_Components/DocumentSVG'
import GallerySVG from '../assets/SVG_Components/GallerySVG'

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
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [showAddMediaMenu, setShowAddMediaMenu] = useState(false)
    const [showScrollDown, setShowScrollDown] = useState(false)
    const [showDeletePopUp, setShowDeletePopUp] = useState(false)
    const [isLongPressed, setIsLongPressed] = useState(false)




    const navigation = useNavigation()
    const { navigate } = useNavigation()
    const flatListRef = useRef()
    const dispatch = useDispatch()




    const renderMessages = ({ item, index }) => {
        const isSelected = selectedMessages?.some((selectedMessage) => selectedMessage?.messageId === item?.messageId)

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
                    onPress={() => toggleSelection(item)}
                    onLongPress={() => toggleSelection(item)}
                >
                    <View style={{ alignItems: 'flex-end', paddingRight: 16, paddingVertical: 1.5, }}>
                        {item?.type === "text" ?
                            <Pressable
                                onPress={() => toggleSelection(item)}
                                onLongPress={() => toggleSelection(item)}
                            >
                                <ChatTextMessage
                                    item={item}
                                />
                            </Pressable>
                            :
                            (item?.type === "image" || item?.type === "video") ?
                                <ChatImageVideo
                                    item={item}
                                    chatId={chatId}
                                    isSelected={isSelected}
                                    toggleSelection={toggleSelection}
                                />
                                : <></>
                        }
                    </View>

                    {isSelected ?
                        <View style={{ width: '100%', height: '100%', backgroundColor: isSelected ? hexToRGBA(colors.createNewChatButton, 0.28) : colors.transparent, position: 'absolute' }} />
                        : <></>
                    }
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
        } else {
            ToastAndroid.show("Please enter message", ToastAndroid.SHORT);
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
            // console.log("🚀 ~ galleryPress ~ result.assets:", JSON.stringify(result.assets))
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

    async function documentPress() {
        setShowAddMediaMenu(false)
    }

    async function cameraPress() {
        setShowAddMediaMenu(false)
    }

    const toggleSelection = (item) => {
        setSelectedMessages((prevSelectedMessages) => {
            const index = prevSelectedMessages?.findIndex((selectedItem) => selectedItem?.messageId === item?.messageId);
            if (index !== -1) {
                // If item is already selected, deselect it
                return prevSelectedMessages?.filter((selectedItem) => selectedItem?.messageId !== item?.messageId);
            } else {
                // If item is not selected, select it
                return [...prevSelectedMessages, item];
            }
        })
    }

    function onDeletePress() {
        setShowDeletePopUp(true)
    }

    function deleteSelectedMessages() {
        hideDeletePopup()
        selectedMessages?.map(item => {
            dispatch(deleteMessage({ messageId: item?.messageId, chatId: chatId }))
        })
        setSelectedMessages([])
        ToastAndroid.show(selectedMessages?.length > 1 ? selectedMessages?.length + " messages deleted" : "Message deleted", ToastAndroid.SHORT);
    }

    function hideDeletePopup() {
        setShowDeletePopUp(false)
    }








    useScreenFocus(() => {
        NavigationBar.setBackgroundColorAsync(colors.chatScreenNavigationBackground);
        NavigationBar.setButtonStyleAsync("light");
    })


    useEffect(() => {
        const backAction = () => {
            setSelectedMessages([])
            return true;
        };

        let backHandler

        if (selectedMessages?.length > 0) {
            backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
            return () => backHandler.remove()
        } else {
            return () => {
                if (backHandler) {
                    backHandler.remove()
                }
            }
        }
    }, [selectedMessages])


    return (
        <View style={{ flex: 1, backgroundColor: colors.chatBackground, }}>




            {/* ------------------------- Header ------------------------ */}
            <View style={{ height: 56, backgroundColor: colors.header, }}>

                {selectedMessages?.length > 0 ?
                    <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: "space-between", }}>
                        <Pressable
                            onPress={() => { setSelectedMessages([]) }}
                            style={{ height: '100%', paddingLeft: 16, paddingRight: 9, justifyContent: 'center', }}
                        >
                            <MaterialIcons name="arrow-back" size={24} color={colors.white} />
                        </Pressable>

                        <Pressable
                            onPress={() => { onDeletePress() }}
                            style={{ paddingLeft: 6, paddingRight: 16, flexDirection: 'row', alignItems: 'center', }}
                        >
                            <MaterialIcons name="delete" size={24} color={colors.white} />
                        </Pressable>

                    </View>
                    :
                    <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: "space-between", }}>
                        {/* Back Button and Profile Picture */}
                        <TouchableOpacity
                            onPress={() => { navigation.goBack() }}
                            style={{ paddingLeft: 6, paddingRight: 9, flexDirection: 'row', alignItems: 'center', }}
                        >

                            {/* Back Icon */}
                            <MaterialIcons name="arrow-back" size={24} color={colors.white} />

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
                            <MaterialCommunityIcons name="dots-vertical" size={24} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                }
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
                        keyExtractor={(item, index) => item?.messageId}
                        keyboardShouldPersistTaps="always"
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

                                        <View style={{}}>
                                            <DocumentSVG size={24} color={colors.white} />
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

                                        <View style={{}}>
                                            <GallerySVG size={21} color={colors.white} />
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
                    <Pressable
                        onPress={() => onSendMessage()}
                        style={{ width: 47, height: 47, borderRadius: 50, backgroundColor: colors.sendMessageButton, justifyContent: 'center', alignItems: 'center', }}
                    >
                        <View style={{ transform: [{ rotate: '45deg' }], marginLeft: -4 }}>
                            <SendIconSVG size={20} />
                        </View>
                    </Pressable>
                </View>
            </ImageBackground>





            {/* Delete Message PopUp */}
            <Portal>
                <Dialog
                    visible={showDeletePopUp}
                    onDismiss={hideDeletePopup}
                    style={{ backgroundColor: colors.deletePopupBackground }}
                >
                    <Dialog.Content>
                        <Text variant="bodyMedium" style={{ color: colors.textinputPlaceHolder }}>
                            Delete {selectedMessages?.length > 1 ? (selectedMessages?.length + " messages?") : "message?"}
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDeletePopup} textColor={colors.createNewChatButton}>
                            Cancel
                        </Button>
                        <Button onPress={deleteSelectedMessages} textColor={colors.createNewChatButton}>
                            Delete
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>




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
