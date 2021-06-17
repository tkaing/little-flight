import React from "react";
import { Text } from "native-base";

const ErrorMessage = ({ children, style }) => {

    return (
        <Text style={{ ...style, color: '#d9534f', marginTop: 8, fontSize: 12 }}>{ children }</Text>
    );
};

export default ErrorMessage
