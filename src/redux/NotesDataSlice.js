import { createSlice } from '@reduxjs/toolkit'
import { useColorScheme } from 'react-native';

const NotesDataSlice = createSlice({
    name: 'NotesDataSlice',
    initialState: {
        data: [],
        appTitle: "Thoughts",
        theme: "light", // device or dark or light
    },
    reducers: {
        updateNote(state, action) {
            const existingIndex = action.payload?._id ? state?.data?.findIndex(note => note && note?._id === action.payload?._id) : -1
            if (existingIndex !== -1) {
                // If _id exists, update the existing note
                state.data[existingIndex] = {
                    ...state.data[existingIndex],
                    text: action.payload?.text,
                    modifiedAt: Date.now()
                };
            } else {
                // If _id doesn't exist, add a new note
                const localDate = Date.now();
                state.data.unshift({
                    text: action.payload?.text,
                    _id: localDate,
                    createdAt: localDate,
                    modifiedAt: localDate
                });
            }
        },
        updateNotesDraggableList(state, action) {
            if (action.payload?.length > 0) {
                state.data = action.payload
            }
        },
        deleteNote(state, action) {
            state.data = state.data.filter(note => note?._id !== action.payload);
        },
        updateAppTitle(state, action) {
            if (action.payload) {
                state.appTitle = action.payload
            } else {
                state.appTitle = "Thoughts"
            }
        },
        updateTheme(state, action) {
            state.theme = action.payload
        },
    }
})

export const { updateNote, updateNotesDraggableList, updateAppTitle, deleteNote, updateTheme } = NotesDataSlice.actions

export default NotesDataSlice.reducer