import React, { useEffect, useState, cloneElement } from "react";

import { Ionicons } from "@expo/vector-icons";
import { lockAsync, OrientationLock } from "expo-screen-orientation";
import { Icon, Text, Row, Pressable, Center, Box } from "native-base";

import * as app_screen from '../App/Screen';
import * as app_service from "../App/Service";

import { on } from "./../tools";
import DefaultProps from "../App/DefaultProps";

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

    const currentTab = app_screen.Home.listOfTabs[tabIndex];

    return (
        <Box flex={ 1 } variant="black" safeAreaBottom>

            { cloneElement(
                currentTab.content, { navigation: navigation }
            )}

            <Row bg="rose.900" alignItems="center" safeAreaBottom shadow={ 6 }>
                { app_screen.Home.listOfTabs.map((_it, index) =>
                    <Pressable
                        py={ 2 }
                        flex={ 1 }
                        opacity={ tabIndex === index ? 1 : 0.5 }
                        onPress={ () => on.home.tabChange({ index },{ setTabIndex }) }>
                        <Center>
                            <Icon { ...DefaultProps.Icon.forFooterTab } name={ _it.icon } />
                            <Text { ...DefaultProps.Text.forFooterTab } numberOfLines={ 1 }>
                                { app_service.capitalize(_it.name) }
                            </Text>
                        </Center>
                    </Pressable>
                ) }
            </Row>

        </Box>
    );
};

export default HomeScreen
