import React from 'react';
import { Toast } from "native-base";
import ErrorMessage from "../../components/core/ErrorMessage";

const showToast = (message) => {
    Toast.show({
        text: message,
        type: 'danger',
        duration: 10000
    });
};

const isNotValid = (touched, errors, property) => {
    return (touched[property] && errors[property]) !== undefined;
}

const showDangerText = (touched, errors, property) => {
    return isNotValid(touched, errors, property) && <ErrorMessage>{ errors[property] }</ErrorMessage>;
};

export { showToast, isNotValid, showDangerText }