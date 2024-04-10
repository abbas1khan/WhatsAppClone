import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { colors } from '../utils/Theme'
import ThreeDotsSVG from '../assets/SVG_Components/ThreeDotsSVG'
import ChatCard from '../components/ChatCard'
import DraggableFlatList from "react-native-draggable-flatlist";
import useScreenFocus from '../hooks/useScreenFocus'
import * as NavigationBar from 'expo-navigation-bar';
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

const HomeScreen = () => {



    const chatRoster = useSelector((state) => state.chatRoster.chats)
    // console.log("🚀 ~ HomeScreen ~ chatRoster:", JSON.stringify(chatRoster))




    const navigation = useNavigation()
    const { navigate } = useNavigation()
    const flatListRef = useRef()



    const renderChatCard = ({ item, drag, isActive }) => {
        return (
            <ChatCard
                item={item}
                drag={drag}
                isActive={isActive}
            />
        )
    }


    useScreenFocus(() => {
        NavigationBar.setBackgroundColorAsync(colors.header);
        NavigationBar.setButtonStyleAsync("light");
    })

    return (
        <View style={{ flex: 1, backgroundColor: colors.background, }}>

            {/* ------------------------- Header ------------------------ */}
            <View style={{ height: 56, paddingLeft: 16, paddingRight: 12, backgroundColor: colors.header, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", }}>
                <Text style={{ fontSize: 22, color: colors.white }}>
                    WhatsApp
                </Text>

                {/* Three dots Button */}
                <ThreeDotsSVG size={18} />
            </View>







            {/* ------------------------- Body ------------------------ */}
            <View style={{ flex: 1 }}>
                <DraggableFlatList
                    data={chatRoster}
                    ref={flatListRef}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    renderItem={renderChatCard}
                    contentContainerStyle={{ paddingTop: 6, paddingBottom: 20 }}
                    onDragEnd={({ data }) => {
                        // dispatch(updateNotesDraggableList(data))
                    }}
                />
            </View>



            {/* Floating Create New Chat Button */}
            <Pressable
                onPress={() => { navigate("AddNewChatScreen") }}
                style={{ width: 56, height: 56, bottom: 17, right: 16, borderRadius: 16, backgroundColor: colors.createNewChatButton, position: "absolute", justifyContent: 'center', alignItems: 'center', }}
            >
                <AntDesign name="plussquare" size={20} color="black" />
            </Pressable>


        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})