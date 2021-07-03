import React, { useEffect, useState } from "react";

import { Column, Row, Button, Box, ScrollView, Wrap, Image } from "native-base";
import { lockAsync, OrientationLock } from "expo-screen-orientation";

import MyDrone from "../components/MyDrone"

import { Stream, Remote } from "./Fpv";

const VrScreen = ({  }) => {

    useEffect(() => {
        lockAsync(OrientationLock.LANDSCAPE_LEFT);
    }, []);

    return (
        <Column flex={1}>

            <MyDrone />

            <Row flex={1} justifyContent="center">

                <Box flex={1}>
                    <Stream />
                </Box>

                <Box flex={1}>
                    <Stream />
                </Box>

            </Row>

        </Column>
    );
};

export default VrScreen