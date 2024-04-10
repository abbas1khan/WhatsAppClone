import { createSlice } from '@reduxjs/toolkit'

const ChatRosterSlice = createSlice({
    name: 'ChatRosterSlice',
    initialState: {
        chats: []
    },
    reducers: {
        addNewChatToRoster(state, action) {
            let localDate = action.payload?.date || Date.now();
            state.chats.push({
                _id: localDate,
                chatId: localDate,
                createdAt: localDate,
                name: action.payload?.name,
                profilePic: action.payload?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
                messages: []
            });
        },
        sendMessage(state, action) {
            const userIndex = action.payload?.chatId ? state?.chats?.findIndex(item => item?.chatId === action.payload?.chatId) : -1;
            if (userIndex !== -1) {
                state.chats[userIndex] = {
                    ...state.chats[userIndex],
                    messages: [action.payload?.message, ...state.chats[userIndex].messages]
                };
            }
        },
    }
})

export const { addNewChatToRoster, sendMessage } = ChatRosterSlice.actions

export default ChatRosterSlice.reducer