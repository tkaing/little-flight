import React, { useEffect } from "react";

import { Box, Row } from "native-base";
import { lockAsync, OrientationLock } from "expo-screen-orientation";

import { Stream, Remote } from "./Fpv";

const FpvScreen = ({ navigation }) => {

    useEffect(() => {
        lockAsync(OrientationLock.LANDSCAPE_LEFT);
    }, []);

    useEffect(() => {
        return navigation.addListener(
            'focus', () => lockAsync(OrientationLock.LANDSCAPE_LEFT)
        );
    }, [navigation]);

    return (
        <Row flex={1} justifyContent="center">

            <Box flex={1}>
                <Remote.Left />
            </Box>

            <Box flex={2}>
                <Stream />
            </Box>

            <Box flex={1}>
                <Remote.Right />
            </Box>

        </Row>
    );
};

export default FpvScreen
