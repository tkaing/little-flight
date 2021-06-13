import React, { useEffect, useState } from "react";
import { Button, Container, Text, View } from "native-base";
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
        input: () => {
            //let input = `file://${ RNFS.DownloadDirectoryPath }/sample-mp4-file.mp4`;
            //let input = "udp://0.0.0.0:11111";
            //let input = "udp://192.168.10.1:11111";
            let input = "udp://127.0.0.1:11111";
            return input;
        },
        output: () => {
            let output = `file://${ RNFS.DownloadDirectoryPath }/outputbis.mp4`;
            return output;
        },
        config: () => {
            RNFFmpegConfig.enableLogCallback(
                (log) =>
                    console.log(`Logs; ${log.executionId}:${log.message}`)
            );
            RNFFmpegConfig.enableStatisticsCallback(
                (statistics) =>
                    console.log(`Statistics; executionId: ${statistics.executionId}, video frame number: ${statistics.videoFrameNumber}, video fps: ${statistics.videoFps}, video quality: ${statistics.videoQuality}, size: ${statistics.size}, time: ${statistics.time}, bitrate: ${statistics.bitrate}, speed: ${statistics.speed}`)
            );
        },
        instance: () => {
            //const options = '-r 30 -s 960x720 -codec:v mpeg1video -b:v 800k -f h264';
            const options = '-vcodec copy';
            const command = `-i ${ ffmpeg.input() } ${ options } ${ ffmpeg.output() }`;
            console.log(command);

            const socket = dgram.createSocket({ type: 'udp4', debug: true });
            console.log(socket);
            socket.bind(8001);

            socket.on('close', (msg, info) => {
                console.log('Close', msg);
            });
            socket.on('message', (msg, info) => {
                console.log('Message', msg);
            });
            socket.once('listening', () => {
                ffmpeg.config();
                /*RNFFmpeg.executeAsync(command, function (completedExec) {
                    console.log(completedExec);
                })
                    .then(executionId => console.log(`Async FFmpeg process started with executionId ${executionId}.`))
                    .catch(reason => console.log(reason))
                ;*/
                RNFFmpeg.executeAsync(command, (execution) => console.log(execution))
                    .then(executionId => console.log(`Async FFmpeg process started with executionId ${executionId}.`))
                    .catch(reason => console.log(reason))
                ;
            });
        }
    };

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

                            <Button onPress={ async () => await ffmpeg.core() } block danger rounded>
                                <Text>Start FFMPEG</Text>
                            </Button>

                            <Button onPress={ () => RNFFmpeg.cancel() } block danger rounded>
                                <Text>Stop FFMPEG</Text>
                            </Button>

                            {/*<Button onPress={ () => {
                                console.log('READ IMG');
                                RNFS.readFile(output, 'ascii')
                                    .then(result => console.log('READ IMG = SUCCESS', result))
                                    .catch(failure => console.log('READ IMG = FAILURE', failure));
                            }}>
                                <Text>READ IMG</Text>
                            </Button>

                            <Button onPress={ async () => {
                                console.log('WRITE IMG');
                                RNFS.writeFile(output, 'xxx',  'ascii')
                                    .then(result => console.log('WRITE IMG = SUCCESS', result))
                                    .catch(failure => console.log('WRITE IMG = FAILURE', failure));
                            }}>
                                <Text>WRITE IMG</Text>
                            </Button>*/}
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