import React, { useEffect, useState } from "react";
import { Container, Text, View } from "native-base";
import FpvRemote from "./FpvScreen/FpvRemote";
import { lockAsync, OrientationLock } from "expo-screen-orientation";
import Gamepad from "./GamepadScreen/Gamepad";

const FpvScreen = (
    { navigation }
) => {

    const [isFpvRemoteView, setFpvRemoteView] = useState(true);

    useEffect(() => {
        lockAsync(OrientationLock.LANDSCAPE_LEFT);
    }, []);

    useEffect(() => {
        return navigation.addListener('focus', () => {
            lockAsync(OrientationLock.LANDSCAPE_LEFT);
        });
    }, [navigation]);

    return (
        <Container>
            <View style={{ ...styles.content }}>

                { isFpvRemoteView &&
                    <View style={{ ...styles.padView }}>
                        <View style={{ ...styles.streamView }}>
                            <Text>xxx</Text>
                        </View>

                        <View style={{ ...styles.remoteView }}>
                            <FpvRemote setFpvRemoteView={ setFpvRemoteView } />
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

const styles = {
    content: {
        flex: 1
    },
    padView: {
        flex: 1,
        flexDirection: 'row'
    },
    streamView: { flex: 2 },
    remoteView: { flex: 1 },
};

export default FpvScreen;