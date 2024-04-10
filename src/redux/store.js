import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer';
import NotesDataSlice from './NotesDataSlice';
import ChatRosterSlice from './ChatRosterSlice';

let persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['notesData']
}

let rootReducer = combineReducers({
    notesData: NotesDataSlice,
    chatRoster: ChatRosterSlice,
})

let persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }),
})