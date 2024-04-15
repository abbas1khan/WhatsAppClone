import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { ToastAndroid } from 'react-native';


export async function shareMedia(item) {
    const isVideo = item?.type === "video"
    try {
        await Sharing.shareAsync(item?.uri, {
            mimeType: item?.mimeType,
            dialogTitle: isVideo ? "Video" : "Image",
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