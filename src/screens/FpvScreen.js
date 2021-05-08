import React, { useEffect } from "react";
import { OrientationLock, lockAsync } from "expo-screen-orientation";
import { Container, Text, View } from "native-base";
import DroneUri from './../../assets/255-2557343_drone-dji-ryze-tech-tello-camera-hd-tello.png';
import AxisPad from 'react-native-axis-pad';

const FpvScreen = (
    { navigation }
) => {

    useEffect(() => {
        lockAsync(OrientationLock.LANDSCAPE);
    }, []);

    useEffect(() => {
        return navigation.addListener('focus', () => {
            lockAsync(OrientationLock.LANDSCAPE);
        });
    }, [navigation]);

    return (
        <Container>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ flex: 2, backgroundColor: 'red' }}>
                    <Text>xxx</Text>
                </View>
                <View style={{ flex: 1, backgroundColor: 'blue' }}>
                    <AxisPad
                        size={ 100 }
                        handlerSize={ 60 }
                        resetOnRelease
                        autoCenter
                        onValue={({ x, y }) => {
                            // values are between -1 and 1
                            console.log(x, y);
                        }} />
                </View>
            </View>
        </Container>
    );
};

export default FpvScreen;