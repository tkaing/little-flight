import React, { useEffect, useState, cloneElement } from "react";

import { Box } from "native-base";
import { FooterTabs } from "./Home";
import { lockAsync, OrientationLock } from "expo-screen-orientation";

import * as app_screen from '../App/Screen';

const HomeScreen = ({ navigation }) => {

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
                        navigation: navigation
                    }
                )}
            </Box>

            <FooterTabs state={{ tabIndex, setTabIndex }} />

        </Box>
    );
};

export default HomeScreen
