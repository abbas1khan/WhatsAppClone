import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, fontFamily, sizes } from '../utils/Theme'
import { useNavigation } from '@react-navigation/native'

const ChatCard = ({ item, drag, isActive }) => {


    const navigation = useNavigation()
    const { navigate } = useNavigation()


    return (
        <Pressable
            onPress={() => navigate("ChatSpecificScreen", { chatId: item?.chatId })}
            onLongPress={drag}
            style={{ width: sizes.width, height: 76, backgroundColor: colors.background, flexDirection: 'row' }}
        >

            {/* Image View */}
            <View style={{ width: 76, justifyContent: 'center', alignItems: 'center', }}>

                {/* Profie Picture of User */}
                <Image
                    source={{ uri: item?.profilePic }}
                    style={{ width: 50, height: 50, borderRadius: 60 }}
                />
            </View>


            {/* Right View */}
            <View style={{ flex: 1, marginRight: 16, justifyContent: 'center', }}>

                {/* Top Text View */}
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                    {/* Name of User */}
                    <View style={{ flex: 1, marginRight: 12 }}>
                        <Text
                            numberOfLines={1}
                            style={{ fontSize: 17, fontWeight: '500', color: colors.white, }}
                        >
                            {item?.name}
                        </Text>
                    </View>

                    {/* Time of last message */}
                    <Text
                        numberOfLines={1}
                        style={{ fontSize: 12, color: colors.rgbaWhite(0.6) }}
                    >
                        8:38 pm
                    </Text>
                </View>

                {/* Bottom Text View */}
                <View style={{ marginTop: 2 }}>

                    {/* Last Message */}
                    <Text
                        numberOfLines={1}
                        style={{ fontSize: 15, color: colors.rgbaWhite(0.6) }}
                    >
                        Suraj ki kirno jaisi uski aankhen uski aadayen mujhe be misal lagti hai
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ChatCard

const styles = StyleSheet.create({})