import React, { useEffect, useState } from "react";
import styles from "./Fpv/Styles";

import { Container, View } from "native-base";
import { lockAsync, OrientationLock } from "expo-screen-orientation";
import { StreamView, RemoteView } from "./Fpv";

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

                { isFpvRemoteView &&
                    <View style={[ styles.padView ]}>
                        <View style={[ styles.streamView ]}>
                            <StreamView />
                        </View>
                        <View style={[ styles.remoteView ]}>
                            <RemoteView setFpvRemoteView={ setFpvRemoteView } />
                        </View>
                    </View>
                }

                { !isFpvRemoteView &&
                    <Gamepad setFpvRemoteView={ setFpvRemoteView } />
                }
            </View>
        </Container>
    );
};

export default FpvScreen
