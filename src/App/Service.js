import React from "react";

import { Box, Text } from "native-base";

import Color from "./Color";

const toast = (_toast, _type, _message, _duration = 5000) => {
    _toast.show({
        title: _message,
        duration: _duration,
        render: () => (
            <Box bg={ _type === 'danger' ? Color.red : Color.green } px={4} py={3} mb={5} mx={4} rounded="md">
                <Text>{ _message }</Text>
            </Box>
        )
    });
};

const capitalize = (string) => {
    return (typeof string !== 'string') ? '' : string.charAt(0).toUpperCase() + string.slice(1);
};

export { toast, capitalize };
