import React, { useEffect, useState } from "react";

import { Container, View } from "native-base";
import { lockAsync, OrientationLock } from "expo-screen-orientation";
import {styles, StreamView, RemoteViewLeft, RemoteViewRight} from "./Fpv";

import Gamepad from "./GamepadScreen/Gamepad";

const FpvScreen = ({ navigation }) => {

    const [isFpvRemoteView, setFpvRemoteView] = useState(true);

    useEffect(() => {
        lockAsync(OrientationLock.LANDSCAPE_LEFT);
    }, []);

    useEffect(() => {
        return navigation.addListener(
            'focus', () => lockAsync(OrientationLock.LANDSCAPE_LEFT)
        );
    }, [navigation]);

    return (
        <Container>
            <View style={[ styles.content ]}>

                <View style={[ styles.remote ]}>
                    <RemoteViewLeft />
                </View>

                <View style={[ styles.stream ]}>
                    <StreamView />
                </View>
                <View style={[ styles.remote ]}>
                    <RemoteViewRight />
                </View>

            </View>
        </Container>
    );
};

export default FpvScreen
