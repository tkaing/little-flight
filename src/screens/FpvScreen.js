import React, { useEffect } from "react";

import { Box, Column, Row } from "native-base";
import { lockAsync, OrientationLock } from "expo-screen-orientation";

import { Stream, Remote } from "./Fpv";

import MyDrone from "../components/MyDrone";

import { drone } from "./../tools"

const FpvScreen = ({ navigation }) => {

    useEffect(() => {
        drone.streamOnOrOff('on');
        lockAsync(OrientationLock.LANDSCAPE_LEFT);
        return () => {
            drone.streamOnOrOff('off');
        };
    }, []);

    useEffect(() => {
        return navigation.addListener(
            'focus', () => lockAsync(OrientationLock.LANDSCAPE_LEFT)
        );
    }, [navigation]);

    return (
        <Column flex={1}>

            <MyDrone />

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

        </Column>
    );
};

export default FpvScreen
