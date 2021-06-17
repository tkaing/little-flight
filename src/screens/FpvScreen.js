import React, { useEffect, useState } from "react";
import {Button, Container, Text, View, Thumbnail, Icon} from "native-base";
import FpvRemote from "./FpvScreen/FpvRemote";
import { lockAsync, OrientationLock } from "expo-screen-orientation";
import Gamepad from "./GamepadScreen/Gamepad";
import * as RNFS from "react-native-fs";
import { RNFFmpeg, RNFFmpegConfig } from "react-native-ffmpeg";
import { PermissionsAndroid } from "react-native";
import dgram from "react-native-udp";
import * as app_drone from "../app/utils/app_drone";

const FpvScreen = (
    { navigation }
) => {

    const [newFrame, setNewFrame] = useState();
    const [openStream, setOpenStream] = useState(false);
    const [listOfFrames, setListOfFrames] = useState([]);
    const [isFpvRemoteView, setFpvRemoteView] = useState(true);

    const ffmpeg = {
        core: async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('=== FFMPEG ===');
                    RNFFmpeg.listExecutions().then(value => {
                        if (value.length === 0) {
                            ffmpeg.instance();
                        } else {
                            RNFFmpeg.cancel();
                            ffmpeg.instance();
                        }
                    });
                }
            } catch (e) {
                console.log('Permission Denied.');
            }
        },
        close: () => {
            RNFFmpeg.cancel();
            setOpenStream(false);
        },
        input: () => {
            //let input = `file://${ RNFS.DownloadDirectoryPath }/sample-video.mp4`;
            //let input = `file://${ RNFS.DownloadDirectoryPath }/sample-mp4-file.mp4`;
            //let input = "udp://0.0.0.0:11111"; // ???
            let input = "udp://127.0.0.1:11111"; // OK
            //let input = "udp://192.168.10.1:11111"; // ???
            return input;
        },
        output: () => {
            let output = `file://${ RNFS.DownloadDirectoryPath }/output_frame.jpg`;
            return output;
        },
        config: () => {
            RNFFmpegConfig.enableLogCallback(
                (log) => {
                    //console.log(`Logs; ${log.executionId}:${log.message}`);
                }
            );
            RNFFmpegConfig.enableStatisticsCallback(
                (statistics) => {
                    try {
                        const now = Date.now();
                        const number = statistics.videoFrameNumber;
                        setNewFrame({ number: now, uri: ffmpeg.output() + `?${ now }` });
                    } catch (failure) {
                        console.log('Cannot convert local file to base64.');
                    }
                    //console.log(`Statistics; executionId: ${statistics.executionId}, video frame number: ${statistics.videoFrameNumber}, video fps: ${statistics.videoFps}, video quality: ${statistics.videoQuality}, size: ${statistics.size}, time: ${statistics.time}, bitrate: ${statistics.bitrate}, speed: ${statistics.speed}`);
                }
            );
        },
        instance: async () => {

            // Full command
            // = full cmd from api = '-r 30 -s 960x720 -codec:v mpeg1video -b:v 800k -f h264'
            // = override single image = '-q:v 4 -r 1 -update 1'
            // Ne pas utiliser
            // = -vf fps=1/X
            // Informations utiles
            // = qscale:v = qualité vidéo (1-31)
            // = R = '-r 1/20';
            // = R = '-r 30 -f image2';

            const exists = await RNFS.exists(ffmpeg.output());

            if (exists) {

                console.log('Supprimer fichier d\'abord.');

            } else {

                const socket = dgram.createSocket({type: 'udp4', debug: true});
                const command = `-i ${ffmpeg.input()} -q:v 4 -r 1 -update 1 ${ffmpeg.output()}`;

                socket.bind(8001);
                socket.on('close', (msg, info) => {
                    console.log('Close', msg);
                    setOpenStream(false);
                });
                socket.on('message', (msg, info) => console.log('Message', msg));
                socket.once('listening', () => {
                    ffmpeg.config();
                    RNFFmpeg.executeAsync(command, (execution) => {
                        console.log(execution);
                        setOpenStream(false);
                    })
                        .then(executionId => {
                            console.log(`Async FFmpeg process started with executionId ${executionId}.`);
                            setOpenStream(true);
                        })
                        .catch(reason => {
                            console.log(reason);
                            setOpenStream(false);
                        })
                    ;
                });
            }
        },
        toggleFrame: () => {}
    };

    useEffect(() => {
        lockAsync(OrientationLock.LANDSCAPE_LEFT);
        setNewFrame();
        setListOfFrames([]);
        return () => {
            setNewFrame();
            setListOfFrames([]);
        }
    }, []);

    useEffect(() => {
        return navigation.addListener('focus', () => {
            lockAsync(OrientationLock.LANDSCAPE_LEFT);
        });
    }, [navigation]);

    useEffect(() => {
        if (newFrame) {
            switch (listOfFrames.length) {
                case 0:
                    setListOfFrames([newFrame]);
                    break;
                case 1:
                    setListOfFrames([listOfFrames[0], newFrame]);
                    break;
                case 2:
                    setListOfFrames([listOfFrames[1], newFrame]);
                    break;
            }
        }
    }, [newFrame]);

    useEffect(() => {
        if (!openStream) {
            setNewFrame();
            setListOfFrames([]);
        }
    }, [openStream]);

    useEffect(() => {
        if (listOfFrames.length === 0)
            console.log([]);
        else
            console.log(
                listOfFrames.map(_it => _it.uri.substr(0, 100))
            );
    }, [listOfFrames]);

    return (
        <Container>
            <View style={{ ...styles.content }}>

                { isFpvRemoteView &&
                    <View style={{ ...styles.padView }}>
                        <View style={{ ...styles.streamView }}>

                            {/* Command Drone / Stream / FFMPEG */}
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Button onPress={ () => app_drone.run('command') } block primary rounded>
                                    <Icon name="airplane-outline" />
                                </Button>
                                <Button onPress={ () => app_drone.run('streamon') } block primary rounded>
                                    <Icon name="videocam-outline" />
                                </Button>
                                <Button onPress={ () => app_drone.run('battery') } block primary rounded>
                                    <Icon name="battery-full-outline" />
                                </Button>
                                <Button onPress={ async () => {
                                    if (openStream) {
                                        ffmpeg.close();
                                    } else {
                                        await ffmpeg.core();
                                    }
                                }} block danger rounded>
                                    <Text>{ openStream ? 'Stopper' : 'Lancer' } le stream</Text>
                                </Button>
                            </View>

                            { openStream &&
                                <View style={[ styles.frameView ]}>
                                    { listOfFrames.map(_it => (
                                        <Thumbnail fadeDuration={ 0 }
                                            source={{ uri: _it.uri }}
                                            square
                                            style={[ styles.frame ]}
                                            large
                                            key={ _it.number } />
                                    ))}
                                </View>
                            }

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
    streamView: {
        flex: 2,
        flexDirection: 'column'
    },
    remoteView: { flex: 1 },
    frame: {
        width: '100%',
        height: '100%',
        bottom: 0,
        position: 'absolute',
        resizeMode: "contain"
    },
    frameView: {
        width: '100%',
        height: '100%',
    }
};

export default FpvScreen;
