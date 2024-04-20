import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as IntentLauncher from 'expo-intent-launcher';
import * as FileSystem from 'expo-file-system';
import { Keyboard, ToastAndroid } from 'react-native';

export async function shareMedia(item) {
    try {
        await Sharing.shareAsync(item?.uri, {
            mimeType: item?.mimeType,
        })
    } catch (error) {
        // console.error("🚀 ~ shareMedia ~ error:", error)
    }
}

export async function saveMedia(item) {
    try {
        await MediaLibrary.saveToLibraryAsync(item?.uri)
            .then(() => {
                ToastAndroid.show("Saved successfully", ToastAndroid.SHORT)
            })
    } catch (error) {
        // console.error("🚀 ~ saveMedia ~ error:", error)
    }
}

export async function openFile(item) {
    try {
        Keyboard.dismiss()
        await FileSystem.getContentUriAsync(item?.uri)
            .then(async (cUri) => {
                await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                    data: cUri,
                    flags: 1,
                    type: item?.mimeType,
                })
            })
    } catch (error) {
        // console.error("🚀 ~ openFile ~ error:", error)
    }
}