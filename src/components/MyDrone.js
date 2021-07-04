import React, { useEffect, useState } from 'react'

import dgram from "react-native-udp"
import { Image, Row, Text } from "native-base"
import { lockAsync, OrientationLock } from "expo-screen-orientation"
import { translate } from "../locale/local"

import DroneConnectedImg from "../../assets/wi-fi.png";
import DroneDisconnectedImg from "../../assets/wi-fi-disconnect.png";

const PORT = 8889;

const HOST = '192.168.10.1';

const drone = dgram.createSocket({ type: 'udp4', debug: true });

drone.bind(8001);

var isConnected = 0;

const MyDrone = (
    { ppp }
) => {

    const [time, setTime] = useState(null);
    const [connected, setConnected] = useState(false);

    const handleError = (err) => {
        if (err) console.log('=== ERROR ===', err);
    }

    const checkConnection = async () => {
        await drone.send('command', undefined, undefined, PORT, HOST, handleError);
        await drone.send('battery?', undefined, undefined, PORT, HOST, handleError);
    }

    useEffect(() => {

        drone.on('close', message => {
            console.log('=== CLOSE ===', message.toString());
        });
        drone.on('message', message => {
            console.log('=== DRONE ===', message.toString());
            //if (message.toString() === "ok")
                isConnected = isConnected + 1;
        });

        const id = setInterval(async function () {

            console.log("=== INTERVAL ===");

            await checkConnection();

            setTimeout(function () {
                setTime( (new Date()).getTime() );
            }, 3000);
        }, 10000);

        lockAsync(OrientationLock.LANDSCAPE_LEFT);

        return () => {
            clearInterval(id);
        };
    }, []);

    useEffect(() => {
        if (time) {
            //console.log(isConnected);
            setConnected(isConnected > 0);
            isConnected = 0;
        }
    }, [time]);

    console.log(isConnected);

    return (
        <Row bg="#37393E" width="100%" justifyContent="flex-end" paddingY={2} paddingRight={4}>
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
