import React, { useEffect, useState } from 'react'

import {Button, Image, Row, Text} from "native-base"
import { translate } from "../locale/local"

import TelloClass from "./../App/class/TelloClass"
import DroneConnectedImg from "../../assets/wi-fi.png"
import DroneDisconnectedImg from "../../assets/wi-fi-disconnect.png"

import { drone } from "./../tools"

const MyDrone = (
    {
        droneSocket,
        state: {
            hasVR,
            openVR,
            setOpenVR,
            connected,
            setConnected
        }
    }
) => {

    const [time, setTime] = useState(null);

    useEffect(() => {

        (async () => {

            const intervalCallback = () => {

                return setInterval(async function () {

                    console.log("=== INTERVAL ===");

                    await drone.checkConnection(droneSocket);

                    setTimeout(function () {
                        setTime( (new Date()).getTime() );
                    }, 2500);

                }, 5000);
            };

            TelloClass.listOfIntervals.push( intervalCallback() );

        })();

    }, []);

    useEffect(() => {
        if (time) {
            setConnected(TelloClass.countConnections > 0);
            TelloClass.countConnections = 0;
        }
    }, [time]);

    return (
        <Row
            bg="#37393E"
            width="100%"
            paddingY={2}
            paddingRight={4}
            justifyContent="flex-end">

            <Row flex={1}>
                { hasVR && openVR &&
                    <Button ml={3}
                            variant="green"
                            onPress={ () => setOpenVR(false) }>
                        <Text fontWeight="bold">FPV</Text>
                    </Button>
                }
            </Row>

            <Row flex={2} justifyContent="flex-end">
                <Text marginTop={1} marginRight={3}> {translate("DRONE_CONNECTION")} </Text>
                <Image
                    alt="xxx"
                    style={{ width: 30, height: 30 }}
                    source={ connected ? DroneConnectedImg : DroneDisconnectedImg }
                />
            </Row>

        </Row>
    );
}

export default MyDrone
