import { FlatList, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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

const ChatSpecificScreen = () => {




    const route = useRoute()
    const chatId = route.params?.chatId
    const chatRoster = useSelector((state) => state.chatRoster.chats)
    const thisChatData = chatRoster.find((item) => item?.chatId == chatId)
    const messages = thisChatData?.messages || []
    // console.log("🚀 ~ ChatSpecificScreen ~ messages:", messages)




    const sortedMessages = generateItems(messages);
    console.log("🚀 ~ ChatSpecificScreen ~ sortedMessages:", JSON.stringify(sortedMessages))






    const [messageText, setMessageText] = useState("")
    const [showAddMediaMenu, setShowAddMediaMenu] = useState(false)




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
                <View style={{ alignItems: 'flex-end', paddingRight: 16 }}>
                    <View style={{ maxWidth: sizes.width * 0.8, paddingVertical: 5, paddingHorizontal: 10, marginVertical: 1.5, backgroundColor: colors.messageBackground, borderRadius: 12 }}>
                        <Text style={{ fontSize: 16, color: colors.white }}>
                            {item?.content}
                        </Text>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'flex-end', }}>
                            <Text style={{ fontSize: 11, marginTop: 6, marginRight: 4, color: colors.messageTime }}>
                                {moment(item?.createdAt).format('LT')}
                            </Text>

                            <DoubleBlueTickSVG size={18} color={colors.blueTick} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }






    function onSendMessage() {
        if (messageText?.trim()?.length > 0) {
            const localDate = Date.now()
            dispatch(sendMessage({
                chatId: chatId,
                message: {
                    _id: localDate,
                    type: "text",
                    content: messageText?.trim(),
                    messageId: localDate,
                    createdAt: localDate,
                }
            }))
            setMessageText("")
            setTimeout(() => {
                flatListRef?.current?.scrollToOffset({ offset: 0, animated: true })
            }, 0);
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
                    // onDragEnd={({ data }) => {
                    //     dispatch(updateNotesDraggableList(data))
                    // }}
                    />

                </View>











                {/* ------------------------- Footer ------------------------ */}
                <View style={{ padding: 4, flexDirection: 'row', alignItems: 'flex-end' }}>

                    <View style={{ flex: 1, minHeight: 47, maxHeight: 137, marginRight: 4, borderRadius: 25, backgroundColor: colors.textInputBackground, flexDirection: 'row', alignItems: 'flex-end' }}>


                        {/* Media Button */}
                        <Menu
                            visible={showAddMediaMenu}
                            onDismiss={() => setShowAddMediaMenu(false)}
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
                        >
                            <Menu.Item onPress={() => { }} title="Item 1" />
                            <Menu.Item onPress={() => { }} title="Item 2" />
                            <Menu.Item onPress={() => { }} title="Item 3" />
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

const styles = StyleSheet.create({})