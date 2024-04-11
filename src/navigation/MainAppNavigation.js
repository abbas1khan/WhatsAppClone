import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ChatSpecificScreen from '../screens/ChatSpecificScreen';
import AddNewChatScreen from '../screens/AddNewChatScreen';
import MediaEditScreen from '../screens/MediaEditScreen';

const Stack = createStackNavigator();

const MainAppNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ChatSpecificScreen" component={ChatSpecificScreen} />
            <Stack.Screen name="AddNewChatScreen" component={AddNewChatScreen} />
            <Stack.Screen name="MediaEditScreen" component={MediaEditScreen} />
        </Stack.Navigator>
    )
}

export default MainAppNavigation