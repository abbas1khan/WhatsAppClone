import { Image, InteractionManager, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colors, sizes } from '../utils/Theme'
import * as ImagePicker from 'expo-image-picker';
import CommonContainer from '../layout/CommonContainer';
import { MaterialIcons } from '@expo/vector-icons'
import CheckSVG from '../assets/SVG_Components/CheckSVG';
import { useDispatch, useSelector } from 'react-redux'
import { addNewChatToRoster } from '../redux/ChatRosterSlice';
import { useNavigation } from '@react-navigation/native'
import uuid from 'react-native-uuid';

const AddNewChatScreen = () => {



    const [imageSelected, setImageSelected] = useState("")
    const [title, setTitle] = useState("")




    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { navigate } = useNavigation()



    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        // console.log(result);

        if (!result.canceled) {
            setImageSelected(result.assets[0].uri);
        }
    };

    function onSave() {
        const chatId = uuid.v4()
        dispatch(addNewChatToRoster({ name: title?.trim(), chatId: chatId, profilePic: imageSelected }))
        navigation.replace("ChatSpecificScreen", { chatId })
    }



    return (
        <CommonContainer title="New Chat">
            <View style={{ flex: 1, paddingTop: 30, backgroundColor: colors.background, alignItems: 'center', }}>

                <Pressable
                    onPress={() => { imageSelected ? setImageSelected("") : pickImage() }}
                >
                    <Image
                        source={{ uri: imageSelected || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" }}
                        style={{ width: 150, height: 150, borderRadius: 150 }}
                    />
                </Pressable>




                <TextInput
                    value={title}
                    placeholder='Chat name'
                    maxLength={25}
                    autoFocus={true}
                    placeholderTextColor={colors.paperClip}
                    onChangeText={(text) => setTitle(text)}
                    style={{ width: sizes.width * 0.7, height: 35, fontSize: 16, marginTop: 50, color: colors.white, borderBottomWidth: 2, borderColor: colors.createNewChatButton, }}
                />




                {/* Floating Save Button */}
                {title?.trim()?.length > 0 &&
                    <Pressable
                        onPress={() => onSave()}
                        style={{ width: 56, height: 56, bottom: 17, right: 16, borderRadius: 16, backgroundColor: colors.createNewChatButton, position: "absolute", justifyContent: 'center', alignItems: 'center', }}
                    >
                        <CheckSVG size={20} />
                    </Pressable>
                }

            </View>
        </CommonContainer>
    )
}

export default AddNewChatScreen

const styles = StyleSheet.create({})