import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../utils/Theme'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

const CommonContainer = ({ title = "", children }) => {

    const navigation = useNavigation()
    const { navigate } = useNavigation()

    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 56, backgroundColor: colors.header, flexDirection: 'row', alignItems: 'center' }}>

                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}
                    style={{ width: 48, height: 56, marginRight: 4, justifyContent: 'center', alignItems: 'center' }}
                >
                    <MaterialIcons name="arrow-back" size={24} color={colors.white} />
                </TouchableOpacity>

                {title &&
                    <Text style={{ fontSize: 22, color: colors.white }}>
                        New Chat
                    </Text>
                }
            </View>
            {children}
        </View>
    )
}

export default CommonContainer

const styles = StyleSheet.create({})