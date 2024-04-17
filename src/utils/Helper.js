// Commonly used helper functions(not dependent)

export function formatTime(milliseconds) {
    var hours = Math.floor(milliseconds / 3600000);
    var remainingMilliseconds = milliseconds % 3600000;
    var minutes = Math.floor(remainingMilliseconds / 60000);
    var seconds = Math.floor((remainingMilliseconds % 60000) / 1000);

    var formattedTime = "";
    if (hours > 0) {
        formattedTime += hours + ":" + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    } else {
        formattedTime += minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return formattedTime;
}

export function convertBytes(bytes) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${Math.ceil(bytes / Math.pow(k, i))} ${sizes[i]}`
}

export function getFileTypeFromName(name) {
    let fileType = name?.substring(name?.lastIndexOf(".") + 1);
    return fileType
}