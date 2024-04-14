import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { colors, sizes } from '../utils/Theme'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { Video, ResizeMode } from 'expo-av';

const MediaEditScreen = () => {

    const route = useRoute()
    const data = route.params?.data
    // console.log("🚀 ~ MediaEditScreen ~ data:", JSON.stringify(data))




    const navigation = useNavigation()
    const { navigate } = useNavigation()
    const flatListRef = useRef()




    const renderMedia = ({ item, index }) => {
        return (
            <View style={{ width: sizes.width, height: sizes.height }}>

                {item?.type === "image" ?
                    <Image
                        source={{ uri: item?.uri }}
                        style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                    />
                    :
                    item?.type === "video" ?
                        <Video
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: item?.uri }}
                            useNativeControls
                            resizeMode={ResizeMode.CONTAIN}
                        />
                        :
                        <></>
                }

            </View>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>


            <View style={{ width: '100%', padding: 9, position: 'absolute', zIndex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={styles.topButtonsView}
                >
                    <Ionicons name="close" size={26} color={colors.white} />
                </TouchableOpacity>


                {/* <TouchableOpacity
                    onPress={() => { }}
                    style={styles.topButtonsView}
                >
                    <Entypo name="crop" size={24} color={colors.white} />
                </TouchableOpacity> */}
            </View>


            <FlatList
                data={data}
                ref={flatListRef}
                bounces={false}
                horizontal
                pagingEnabled
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderMedia}
            />
        </View>
    )
}

export default MediaEditScreen

const styles = StyleSheet.create({
    topButtonsView: {
        width: 48,
        height: 48,
        borderRadius: 50,
        backgroundColor: colors.rgbaBlack(0.55),
        justifyContent: 'center',
        alignItems: 'center',
    },
}) 
