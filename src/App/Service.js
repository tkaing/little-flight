import React from "react";

import { Box, Text } from "native-base";

import Color from "./Color";

const toast = (_toast, _type, _message, _duration = 5000) => {
    _toast.show({
        title: _message,
        //status: _type, // (danger, warning, success)
        duration: _duration,
        render: () => (
            <Box bg={ Color.red } px={4} py={3} rounded="md" mb={5} mx={4}>
                <Text>{ _message }</Text>
            </Box>
        )
    });
};

const capitalize = (string) => {
    return (typeof string !== 'string') ? '' : string.charAt(0).toUpperCase() + string.slice(1);
};

export { toast, capitalize };
