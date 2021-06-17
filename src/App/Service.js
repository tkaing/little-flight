import { Toast } from "native-base";

const toast = (type, message, duration = 10000) => {
    Toast.show({
        type: type, // danger, warning, success
        text: message,
        duration: duration
    });
};

const capitalize = (string) => {
    return (typeof string !== 'string') ? '' : string.charAt(0).toUpperCase() + string.slice(1);
};

export { toast, capitalize };
