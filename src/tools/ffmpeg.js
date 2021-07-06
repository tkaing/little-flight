import * as RNFS from "react-native-fs"

import { RNFFmpeg, RNFFmpegConfig } from "react-native-ffmpeg"

import * as app_service from './../App/Service'

import LiveConst from "./../App/const/LiveConst"
import RecordingConst from "../App/const/RecordingConst";
import ScreenshotConst from "../App/const/ScreenshotConst"
import TelloClass from "../App/class/TelloClass";

const ffmpeg = {
    launchLive: async ({ toast }, {
        setNewFrame,
        setLiveExecId
    }) => {

        RNFFmpeg.listExecutions().then(value => {
            if (value.length === 0) {
                ffmpeg.instance({}, {
                    setNewFrame,
                    setLiveExecId
                });
            } else {
                RNFFmpeg.cancel();
                ffmpeg.instance({}, {
                    setNewFrame,
                    setLiveExecId
                });
            }
        });
    },
    config: ({}, { setNewFrame }) => {

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
        setNewFrame,
        setLiveExecId,
    }) => {

        ffmpeg.config({}, { setNewFrame });

        try {
            TelloClass.liveId = Date.now();

            await RNFS.scanFile(LiveConst.OUTPUT(TelloClass.liveId));

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
        try {
            const executionId = await RNFFmpeg.executeAsync(
                RecordingConst.FULL_COMMAND(Date.now()), (execution) => {
                    if (execution.returnCode === 1) {
                        console.log("=== RECORDING FAILED ===");
                        app_service.toast(toast, 'danger', 'Oups! Impossible d\'enregistrer le recording', 2000);
                    }
                }
            );
            console.log(`=== RECORDING with executionId ${executionId} ===`);
            setRecordingExecId(executionId);
            app_service.toast(toast, 'success', 'Enregistrement en cours', 2000);
        } catch (reason) {
            console.log("=== RECORDING FAILED ===", reason);
            app_service.toast(toast, 'danger', 'Oups! Impossible de lancer le recording', 2000);
        }
    },
    copyFrameFromLiveToImage: async ({ toast }) => {
        try {
            if (TelloClass.liveId) {
                const exist = await RNFS.exists(
                    LiveConst.OUTPUT(TelloClass.liveId)
                );
                if (exist) {
                    await RNFS.scanFile(
                        LiveConst.OUTPUT(TelloClass.liveId)
                    );
                    const response = await RNFS.copyFile(
                        LiveConst.OUTPUT(TelloClass.liveId), ScreenshotConst.OUTPUT(Date.now())
                    );
                    console.log("=== SCREENSHOT SUCCESS ===", response);
                    app_service.toast(toast, 'success', 'Screenshot enregistré !', 2000);
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
