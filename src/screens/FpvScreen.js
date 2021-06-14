import React, { useEffect, useState } from "react";
import { Button, Container, Text, View, Thumbnail } from "native-base";
import FpvRemote from "./FpvScreen/FpvRemote";
import { lockAsync, OrientationLock } from "expo-screen-orientation";
import Gamepad from "./GamepadScreen/Gamepad";
import * as RNFS from "react-native-fs";
import { RNFFmpeg, RNFFmpegConfig } from "react-native-ffmpeg";
import { PermissionsAndroid } from "react-native";
import dgram from "react-native-udp";

const FpvScreen = (
    { navigation }
) => {

    const [openStream, setOpenStream] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(null);
    const [isFpvRemoteView, setFpvRemoteView] = useState(true);
    const [currentInterval, setCurrentInterval] = useState(null);

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
            //let input = `file://${ RNFS.DownloadDirectoryPath }/sample-mp4-file.mp4`;
            let input = `file://${ RNFS.DownloadDirectoryPath }/sample-video.mp4`;
            //let input = "udp://0.0.0.0:11111"; // ???
            //let input = "udp://127.0.0.1:11111"; // OK
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
                    //console.log("Statistics; XXX", statistics);
                    //setListOfFrames([...listOfFrames]);
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

                /*socket.bind(8001);
                socket.on('close', (msg, info) => {
                    console.log('Close', msg);
                    setOpenStream(false);
                });
                socket.on('message', (msg, info) => console.log('Message', msg));
                socket.once('listening', () => {*/
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
                //});
            }
        },
        toggleFrame: () => {
            setCurrentFrame(ffmpeg.output() + '?' + Date.now());
        }
    };

    useEffect(() => {
        lockAsync(OrientationLock.LANDSCAPE_LEFT);
        return () => {
            clearInterval(currentInterval);
            setCurrentInterval(null);
        }
    }, []);

    useEffect(() => {
        return navigation.addListener('focus', () => {
            lockAsync(OrientationLock.LANDSCAPE_LEFT);
        });
    }, [navigation]);

    useEffect(() => {
        if (openStream) {
            setCurrentInterval(setInterval(ffmpeg.toggleFrame, 500));
        } else {
            setCurrentFrame(null);
            clearInterval(currentInterval);
            setCurrentInterval(null);
        }
    }, [openStream]);

    useEffect(() => {
        console.log('CURRENT FRAME', currentFrame);
    }, [currentFrame]);

    return (
        <Container>
            <View style={{ ...styles.content }}>

                { isFpvRemoteView &&
                    <View style={{ ...styles.padView }}>
                        <View style={{ ...styles.streamView }}>

                            <Button onPress={ async () => await ffmpeg.core() }
                                    block danger rounded>
                                <Text>Run FFMPEG</Text>
                            </Button>

                            <Button onPress={ () => ffmpeg.close() }
                                    block danger rounded>
                                <Teàxt>Close FFMPEG</Teàxt>
                            </Button>

                            { openStream && currentFrame &&
                                <Thumbnail square large source={{ uri: currentFrame }}
                                           fadeDuration={ 0.5 }
                                           style={{ width: 300, height: 200 }} />
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
    streamView: { flex: 2 },
    remoteView: { flex: 1 },
};

export default FpvScreen;