import { Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export const sizes = {
    width,
    height,

    screenWidth,
    screenHeight,
}

export const fontFamily = {
    black: 'HelveticaNeueBlack',
    blackItalic: 'HelveticaNeueBlackItalic',
    bold: 'HelveticaNeueBold',
    boldItalic: 'HelveticaNeueBoldItalic',
    heavy: 'HelveticaNeueHeavy',
    heavyItalic: 'HelveticaNeueHeavyItalic',
    italic: 'HelveticaNeueItalic',
    light: 'HelveticaNeueLight',
    lightItalic: 'HelveticaNeueLightItalic',
    medium: 'HelveticaNeueMedium',
    mediumItalic: 'HelveticaNeueMediumItalic',
    roman: 'HelveticaNeueRoman',
    thin: 'HelveticaNeueThin',
    thinItalic: 'HelveticaNeueThinItalic',
    ultraLight: 'HelveticaNeueUltraLight',
    ultraLightItalic: 'HelveticaNeueUltraLightItalic',
}

export const isAndroid = Platform.OS === 'android'
export const isIOS = Platform.OS === 'ios'

export const colors = {

    // home
    header: "#1f2c34",
    background: "#121b22",
    createNewChatButton: "#00a884",


    // chat screen
    chatBackground: "#09131a",
    messageBackground: "#005d4b",
    textInputBackground: "#1f2c34",
    sendMessageButton: "#00a884",
    chatScreenNavigationBackground: "#0b141b",
    textinputPlaceHolder: "#8696a0",
    paperClip: "#85969f",
    cameraChatSpecific: "#8596a0",
    chatBackgroundImage: "#182429",
    dayTimeBackground: "#1c272d",
    messageTime: "#94bfb8",
    blueTick: "#52beea",
    deletePopupBackground: "#3a494f",
    videoFullScreenHeaderBackground: "#070c10",
    chatFileBackground: "#025043",
    fileSize: "#8198a0",
    blueTick: "#54bee8",
    scrollDownBackground: "#283239",

    addMediaPopupBackground: "#26343d",
    addMediaDocumentIconTop: "#745de9",
    addMediaDocumentIconBottom: "#7f66ff",
    addMediaCameraIconTop: "#e82b6d",
    addMediaCameraIconBottom: "#fd2e74",
    addMediaGalleryIconTop: "#b659e5",
    addMediaGalleryIconBottom: "#c861fa",

    black: "#000000",
    white: "#ffffff",

    transparent: "transparent",

    rgbaWhite: opacity => `rgba(255,255,255, ${opacity})`,
    rgbaBlack: opacity => `rgba(0,0,0, ${opacity})`,
}

export const hexToRGBA = (hex, opacity) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
            result[3],
            16,
        )},${opacity})`
        : null;
}