import React, { useEffect, useState } from "react"

import dgram from "react-native-udp"
import MyDrone from "../components/MyDrone"
import TelloClass from "./../App/class/TelloClass"

import { Stream, Remote } from "./Fpv"
import { Box, Column, Row, useToast } from "native-base"
import { lockAsync, OrientationLock } from "expo-screen-orientation"

import { on, drone } from "./../tools"
import { MainLoader } from "../core"

// === Drone Socket ===

const droneSocket = dgram.createSocket({ type: 'udp4', debug: true });

droneSocket.bind(8001);

droneSocket.on('close', message => {
    console.log('=== DRONE.CLOSE ===', message.toString());
});

droneSocket.on('message', (message, info) => {
    console.log('=== DRONE.MESSAGE ===', message.toString());

    let telloData = message.toString();

    if (telloData.includes("mm")) {
        telloData = telloData.replace("mm", "");
        if (telloData > TelloClass.tof)
            TelloClass.tof = telloData;
    }
    if (telloData.includes("s")) {
        telloData = telloData.replace("s", "");
        TelloClass.time = telloData;
        console.log("=== TELLO TIME ===", TelloClass.time);
    }
    if (telloData.includes("C")) {
        TelloClass.temp = telloData;
    }
    if (telloData.includes("dm")) {
        telloData = telloData.replace("dm", "");
        if (telloData > TelloClass.height)
            TelloClass.height = telloData;
    }
    if (isNaN(telloData) === false) {
        TelloClass.battery = telloData;
    }

    TelloClass.countConnections = TelloClass.countConnections + 1;
});

const FpvScreen = (
    {
        navigation,
        state: {
            loading, setLoading
        }
    }
) => {

    const toast = useToast();

    const [openVR, setOpenVR] = useState(false);
    const [newFrame, setNewFrame] = useState();
    const [connected, setConnected] = useState(false);

    // === FFMPEG Execution Id ===

    const [liveExecId, setLiveExecId] = useState();
    const [recordingExecId, setRecordingExecId] = useState();

    useEffect(() => {
        (async () => {
            console.log("=== FPV Screen ===");

            setLoading(true);

            await lockAsync(OrientationLock.LANDSCAPE_LEFT);

            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (liveExecId || recordingExecId) {
            (async () => {

                if (liveExecId)
                    TelloClass.liveExecId = liveExecId;
                if (recordingExecId)
                    TelloClass.recordingExecId = recordingExecId;

                await drone.streamOnOrOff({droneSocket, onOrOff: 'on'});
            })();
        }
    }, [liveExecId, recordingExecId]);

    return (
        <Column flex={1}>

            <MyDrone
                droneSocket={ droneSocket }
                state={{ connected, setConnected }}
                />

            <Row flex={1} justifyContent="center">

                { !openVR &&
                    <Box flex={1}>
                        <Remote.Left
                            droneSocket={ droneSocket }
                            state={{ setOpenVR }}
                            />
                    </Box>
                }

                <Box flex={2}>
                    <Stream
                        droneSocket={ droneSocket }
                        state={{
                            openVR,
                            newFrame,
                            setOpenVR,
                            liveExecId,
                            setNewFrame,
                            setLiveExecId
                        }}
                        />
                </Box>

                { !openVR &&
                    <Box flex={1}>
                        <Remote.Right
                            droneSocket={ droneSocket }
                            toast={ toast }
                            state={{
                                liveExecId,
                                setNewFrame,
                                setLiveExecId,
                                recordingExecId,
                                setRecordingExecId,
                            }}
                            />
                    </Box>
                }

            </Row>

            { loading && <MainLoader /> }

        </Column>
    );
}

export default FpvScreen
