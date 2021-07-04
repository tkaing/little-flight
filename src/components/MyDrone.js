import React, { useEffect, useState } from 'react'

import { Image, Row, Text } from "native-base"
import { lockAsync, OrientationLock } from "expo-screen-orientation"
import { translate } from "../locale/local"

import TelloClass from "./../App/class/TelloClass"
import DroneConnectedImg from "../../assets/wi-fi.png"
import DroneDisconnectedImg from "../../assets/wi-fi-disconnect.png"

import { drone } from "./../tools"

const MyDrone = (
    {
        droneSocket,
        state: {
            connected,
            setConnected
        }
    }
) => {

    const [time, setTime] = useState(null);

    useEffect(() => {

        const id = setInterval(async function () {

            console.log("=== INTERVAL ===");

            await drone.checkConnection(droneSocket);

            setTimeout(function () {
                setTime( (new Date()).getTime() );
            }, 2500);
        }, 5000);

        lockAsync(OrientationLock.LANDSCAPE_LEFT);

        return () => { clearInterval(id) };

    }, []);

    useEffect(() => {
        if (time) {
            setConnected(
                TelloClass.countConnections > 0
            );
            TelloClass.countConnections = 0;
        }
    }, [time]);

    return (
        <Row 
            bg="#37393E" 
            width="100%" 
            justifyContent="flex-end" 
            paddingY={2} 
            paddingRight={4}>
            <Text marginTop={1} marginRight={3}> {translate("DRONE_CONNECTION")} </Text>
            <Image
                alt="xxx"
                style={{ width: 30, height: 30 }}
                source={ connected ? DroneConnectedImg : DroneDisconnectedImg }
                />

        </Row>
    );
}

export default MyDrone
