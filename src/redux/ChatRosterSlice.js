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
            const { chatId, message } = action.payload;
            return {
                ...state,
                chats: state?.chats?.map(chat => {
                    if (chat?.chatId === chatId) {
                        return {
                            ...chat,
                            messages: [message, ...chat.messages]
                        };
                    }
                    return chat;
                })
            };
        },
    }
})

export const { addNewChatToRoster, sendMessage } = ChatRosterSlice.actions

export default ChatRosterSlice.reducer