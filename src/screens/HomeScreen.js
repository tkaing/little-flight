import React, { useEffect, useState, cloneElement } from "react"

import TelloClass from "../App/class/TelloClass"

import {Box, useToast} from "native-base"
import { RNFFmpeg } from "react-native-ffmpeg"
import { FooterTabs } from "./Home"
import { MainLoader } from "../core"
import { on, redirect_to } from "../tools"
import { lockAsync, OrientationLock } from "expo-screen-orientation"

import * as app_screen from '../App/Screen'
import * as app_service from "../App/Service"

const HomeScreen = (
    {
        state: {
            appUser, setAppUser,
            loading, setLoading,
        },
        navigation
    }
) => {

    const toast = useToast();

    // == useState ===

    const [tabIndex, setTabIndex] = useState(0);

    // === useEffect ===

    useEffect(() => {
        (async () => {
            //setLoading(true);
            //await lockAsync(OrientationLock.DEFAULT);
            //setLoading(false);
        })();
    }, []);

    useEffect(() => {
        //if (!appUser)
            //redirect_to.auth(navigation);
    }, [appUser]);

    useEffect(() => {
        return navigation.addListener(
            'focus', async () => {

                //setLoading(true);

               //await lockAsync(OrientationLock.DEFAULT);

                /*setLoading(false);

                TelloClass.listOfIntervals.forEach(_it => clearInterval(_it));

                await on.fpv.telloOverviewSave();

                if (TelloClass.liveExecId) {
                    RNFFmpeg.cancelExecution(TelloClass.liveExecId);
                    TelloClass.liveExecId = null;
                }
                if (TelloClass.recordingExecId) {
                    RNFFmpeg.cancelExecution(TelloClass.recordingExecId);
                    TelloClass.recordingExecId = null;
                }

                RNFFmpeg.cancel();*/
            }
        );
    }, [navigation]);

    const subview = app_screen.home.listOfTabs[tabIndex];

    return (
        <Box flex={ 1 } variant="black" safeAreaBottom>

            <Box flex={ 1 }>
                { cloneElement(
                    subview.content, {
                        state: {
                            appUser, setAppUser,
                            loading, setLoading,
                        },
                        navigation
                    }
                )}
            </Box>

            <FooterTabs state={{ tabIndex, setTabIndex }} />

            { loading && <MainLoader /> }

        </Box>
    );
};

export default HomeScreen
