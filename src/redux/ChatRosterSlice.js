import { createSlice } from '@reduxjs/toolkit'
import uuid from 'react-native-uuid';

const ChatRosterSlice = createSlice({
    name: 'ChatRosterSlice',
    initialState: {
        chats: []
    },
    reducers: {
        addNewChatToRoster(state, action) {
            let chatId = action.payload?.chatId;
            let newChat = {
                _id: chatId,
                chatId: chatId,
                createdAt: Date.now(),
                name: action.payload?.name,
                profilePic: action.payload?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
                messages: []
            }
            state.chats = [...state.chats, newChat]
        },
        sendMessage(state, action) {
            const chatIndex = state?.chats?.findIndex(item => item?.chatId === action.payload?.chatId)
            if (chatIndex !== -1) {
                state.chats[chatIndex] = {
                    ...state.chats[chatIndex],
                    messages: [action.payload?.message, ...state.chats[chatIndex].messages]
                };
            }
        },
        deleteMessage(state, action) {
            const chatIndex = state?.chats?.findIndex(item => item?.chatId === action.payload?.chatId)
            if (chatIndex !== -1) {
                state.chats[chatIndex] = {
                    ...state.chats[chatIndex],
                    messages: [...state.chats[chatIndex].messages]?.filter(item => item?.messageId !== action.payload?.messageId)
                };
            }
        },
    }
})

export const {
    addNewChatToRoster,
    sendMessage,
    deleteMessage
} = ChatRosterSlice.actions

export default ChatRosterSlice.reducer