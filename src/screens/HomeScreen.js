import React, { useEffect, useState, cloneElement } from "react";

import { Box } from "native-base";
import { FooterTabs } from "./Home";
import { lockAsync, OrientationLock } from "expo-screen-orientation";

import * as app_screen from '../App/Screen';
import {MainLoader} from "../core";

const HomeScreen = (
    {
        state: {
            appUser, setAppUser,
            loading, setLoading,
        },
        navigation
    }
) => {

    // == useState ===

    const [tabIndex, setTabIndex] = useState(0);

    // === useEffect ===

    useEffect(() => {
        lockAsync(OrientationLock.DEFAULT);
    }, []);

    useEffect(() => {
        return navigation.addListener(
            'focus', () => lockAsync(OrientationLock.DEFAULT)
        );
    }, [navigation]);

    const subview = app_screen.home.listOfTabs[tabIndex];

    return (
        <Box flex={ 1 } variant="black" safeAreaBottom>

            <Box flex={ 1 }>
                { cloneElement(
                    subview.content, {
                        state: {
                            loading, setLoading,
                            appUser, setAppUser,
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
