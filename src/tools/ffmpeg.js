import * as RNFS from "react-native-fs"

import { RNFFmpeg, RNFFmpegConfig } from "react-native-ffmpeg"

import * as app_service from './../App/Service'
import * as VideoThumbnails from 'expo-video-thumbnails'

import { on, drone } from "./../tools"

import LiveConst from "./../App/const/LiveConst"
import RecordingConst from "../App/const/RecordingConst";
import ScreenshotConst from "../App/const/ScreenshotConst"

const ffmpeg = {
    launchLive: async ({ toast }, {
        liveExecId,
        setNewFrame,
        setLiveExecId
    }) => {

        await on.fpv.askForFolderPermissions({ toast }, {});

        RNFFmpeg.listExecutions().then(value => {
            if (value.length === 0) {
                ffmpeg.instance({}, {
                    liveExecId,
                    setNewFrame,
                    setLiveExecId
                });
            } else {
                RNFFmpeg.cancel();
                ffmpeg.instance({}, {
                    liveExecId,
                    setNewFrame,
                    setLiveExecId
                });
            }
        });
    },
    config: ({}, { setNewFrame, liveExecId }) => {

        RNFFmpegConfig.enableLogCallback(
            (log) => { /*console.log(`Logs; ${log.executionId}:${log.message}`)*/ }
        );
        RNFFmpegConfig.enableStatisticsCallback(
            (statistics) => {
                try {
                    //if (statistics.executionId === liveExecId) {
                        const now = Date.now();
                        //console.log(now);
                        //const number = statistics.videoFrameNumber;
                        setNewFrame({ uri: LiveConst.OUTPUT + `?${ now }`, number: now });
                    //}
                } catch (failure) {
                    console.log('=== FRAME FAILED ===', failure);
                }
            }
        );
    },
    instance: async ({ }, {
        liveExecId,
        setNewFrame,
        setLiveExecId,
    }) => {

        ffmpeg.config({}, { setNewFrame, liveExecId });

        try {
            console.log(LiveConst.FULL_COMMAND);

            const executionId = await RNFFmpeg.executeAsync(
                LiveConst.FULL_COMMAND, (execution) => console.log(execution)
            );
            console.log(`=== LIVE with executionId ${executionId} ===`);
            setLiveExecId(executionId);

        } catch (reason) {
            console.log("=== LIVE FAILED ===", reason);
            app_service.toast(toast, 'danger', 'Oups! Impossible de lancer le live', 2000);
        }
    },
    launchRecording: async ({ toast }, { setRecordingExecId }) => {

        let recordingId = 0;
        let recordingExist = await RNFS.exists(RecordingConst.OUTPUT(recordingId));

        while (recordingExist) {
            recordingId += 1;
            recordingExist = await RNFS.exists(RecordingConst.OUTPUT(recordingId));
        }

        try {
            const executionId = await RNFFmpeg.executeAsync(
                RecordingConst.FULL_COMMAND(recordingId), (execution) => {
                    if (execution.returnCode === 1) {
                        console.log("=== RECORDING FAILED ===");
                        app_service.toast(toast, 'danger', 'Oups! Impossible d\'enregistrer le recording', 2000);
                    }
                }
            );
            console.log(`=== RECORDING with executionId ${executionId} ===`);
            setRecordingExecId(executionId);

        } catch (reason) {
            console.log("=== RECORDING FAILED ===", reason);
            app_service.toast(toast, 'danger', 'Oups! Impossible de lancer le recording', 2000);
        }
    },
    copyFrameFromLiveToImage: async ({ toast }) => {
        try {
            let screenshotId = 0;
            let screenshotExist = await RNFS.exists(RecordingConst.OUTPUT(screenshotId));

            while (screenshotExist) {
                screenshotId += 1;
                screenshotExist = await RNFS.exists(RecordingConst.OUTPUT(screenshotId));
            }
            await RNFS.moveFile(
                LiveConst.OUTPUT, ScreenshotConst.OUTPUT(screenshotId)
            );
        } catch (reason) {
            console.log("=== SCREENSHOT FAILED ===", reason);
            app_service.toast(toast, 'danger', 'Oups! Impossible prendre un screenshot. Veuillez réessayer', 2000);
        }
    }
};

export default ffmpeg
