import dgram from "react-native-udp";

import * as RNFS from "react-native-fs";

import { PermissionsAndroid } from "react-native";
import { RNFFmpeg, RNFFmpegConfig } from "react-native-ffmpeg";

const ffmpeg = {
    core: async (setNewFrame) => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('=== FFMPEG ===');
                RNFFmpeg.listExecutions().then(value => {
                    if (value.length === 0) {
                        ffmpeg.instance(setNewFrame);
                    } else {
                        RNFFmpeg.cancel();
                        ffmpeg.instance(setNewFrame);
                    }
                });
            }
        } catch (e) {
            console.log('Permission Denied.');
        }
    },
    close: () => {
        RNFFmpeg.cancel();
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
    config: (setNewFrame) => {
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
                    console.log('Cannot generate frame.', failure);
                }
                //console.log(`Statistics; executionId: ${statistics.executionId}, video frame number: ${statistics.videoFrameNumber}, video fps: ${statistics.videoFps}, video quality: ${statistics.videoQuality}, size: ${statistics.size}, time: ${statistics.time}, bitrate: ${statistics.bitrate}, speed: ${statistics.speed}`);
            }
        );
    },
    instance: async (setNewFrame) => {

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

            const socket = dgram.createSocket({ type: 'udp4', debug: true });
            const command = `-i ${ ffmpeg.input() } -q:v 4 -r 1 -update 1 ${ ffmpeg.output() }`;

            socket.bind(8001);
            socket.on('close', (msg) => {
                console.log('Close', msg);
            });
            //socket.on('message', (msg) => console.log('Message', msg));
            socket.once('listening', () => {

                ffmpeg.config(setNewFrame);

                RNFFmpeg.executeAsync(command, (execution) => {
                    console.log(execution);
                })
                    .then(executionId => {
                        console.log(`Async FFmpeg process started with executionId ${executionId}.`);
                    })
                    .catch(reason => {
                        console.log(reason);
                    })
                ;

            });
        }
    }
};

export default ffmpeg
