import * as RNFS from "react-native-fs"

import { RNFFmpeg, RNFFmpegConfig } from "react-native-ffmpeg"

import * as app_service from './../App/Service'
import { on, drone } from "./../tools"

import LiveConst from "./../App/const/LiveConst"
import RecordingConst from "../App/const/RecordingConst";
import ScreenshotConst from "../App/const/ScreenshotConst"
import TelloClass from "../App/class/TelloClass";

const ffmpeg = {
    launchLive: async ({ toast }, {
        liveExecId,
        setNewFrame,
        setLiveExecId
    }) => {

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
                    const now = Date.now();
                    console.log(TelloClass.liveId);
                    if (TelloClass.liveId)
                        setNewFrame({ uri: LiveConst.OUTPUT(TelloClass.liveId) + `?${ now }`, number: now });
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
            let liveId = 1;
            let liveExist = await RNFS.exists(LiveConst.OUTPUT(liveId));

            while (liveExist) {
                liveId += 1;
                liveExist = await RNFS.exists(LiveConst.OUTPUT(liveId));
            }

            TelloClass.liveId = liveId;

            await RNFS.scanFile(LiveConst.OUTPUT(liveId));

            console.log(LiveConst.FULL_COMMAND(TelloClass.liveId));

            const executionId = await RNFFmpeg.executeAsync(
                LiveConst.FULL_COMMAND(TelloClass.liveId), (execution) => console.log(execution)
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
            if (TelloClass.liveId) {
                const exist = await RNFS.exists(
                    LiveConst.OUTPUT(TelloClass.liveId)
                );
                if (exist) {
                    await RNFS.scanFile(
                        LiveConst.OUTPUT(TelloClass.liveId)
                    );
                    const response = await RNFS.moveFile(
                        LiveConst.OUTPUT(TelloClass.liveId), ScreenshotConst.OUTPUT(screenshotId)
                    );
                    console.log("=== SCREENSHOT RESPONSE ===", response);
                } else {
                    console.log("=== SCREENSHOT FAILED ===");
                    app_service.toast(toast, 'danger', 'Oups! Échec du Screenshot. Réessayer !', 2000);
                }
            }
        } catch (reason) {
            console.log("=== SCREENSHOT FAILED ===", reason);
            app_service.toast(toast, 'danger', 'Oups! Échec du Screenshot. Réessayer !', 2000);
        }
    }
};

export default ffmpeg
