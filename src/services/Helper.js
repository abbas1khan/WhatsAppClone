import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { ToastAndroid } from 'react-native';


export async function shareMedia(item) {
    try {
        await Sharing.shareAsync(item?.uri, {
            mimeType: "video/mp4",
            dialogTitle: "Video",
        });
    } catch (error) {
        // console.error('Error sharing:', error.message);
    }
}

export async function saveMedia(item) {
    try {
        const asset = await MediaLibrary.saveToLibraryAsync(item?.uri);
        ToastAndroid.show("Saved successfully", ToastAndroid.SHORT);
    } catch (error) {
        // console.error("🚀 ~ onSave ~ error:", error)
    }
}