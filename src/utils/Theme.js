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







    primary: 'rgb(38 38 38)',
    secondary: '#eab308',

    lightBlue: '#F5FEFF',


    black: "#000",
    white: "#fff",

    gray: "#C1C3C5",
    lightGray: "#FCFBFC",
    lightGray1: "#F5F5F6",
    lightGray2: "#F6F6F7",
    lightGray3: "#EFEFF1",
    lightGray4: "#F8F8F9",
    lightGray5: 'rgb(209 213 219)',
    darkgray: "#C3C6C7",
    darkgray1: '#898C95',
    darkgray2: 'rgba(23, 23, 23, 0.8)',
    mygrey: '#808080',


    darkBlack1: "#121211",
    darkBlack2: "#181818",
    darkBlack3: "#282828",
    darkBlack4: "#383838",


    neutral300: 'rgb(212 212 212)',
    neutral400: 'rgb(163 163 163)',
    neutral500: 'rgb(115 115 115)',
    neutral700: 'rgb(64 64 64)',

    border: "#374957",

    transparent: "transparent",

    rgbaWhite: opacity => `rgba(255,255,255, ${opacity})`,
    rgbaBlack: opacity => `rgba(0,0,0, ${opacity})`,

    "grey": {
        "50": "#fafafa",
        "100": "#f5f5f5",
        "200": "#eeeeee",
        "300": "#e0e0e0",
        "400": "#bdbdbd",
        "500": "#9e9e9e",
        "600": "#757575",
        "700": "#616161",
        "800": "#424242",
        "900": "#212121"
    },
    "bluegrey": {
        "50": "#eceff1",
        "100": "#cfd8dc",
        "200": "#b0bec5",
        "300": "#90a4ae",
        "400": "#78909c",
        "500": "#607d8b",
        "600": "#546e7a",
        "700": "#455a64",
        "800": "#37474f",
        "900": "#263238"
    }

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