import React, { cloneElement, useEffect, useState } from "react";

import { lockAsync, OrientationLock } from "expo-screen-orientation";
import { Button, Container, Icon, Text, Footer, FooterTab } from "native-base";

import * as app_screen from '../App/Screen';
import * as app_service from "../App/Service";

const HomeScreen = ({ navigation }) => {

    const [tabIndex, setTabIndex] = useState(0);

    const on = {
        TabSwitch: (tab) => setTabIndex(tab)
    };

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
        <Container>
            { cloneElement(
                currentTab.content, { navigation: navigation }
            )}
            <Footer>
                <FooterTab>
                    { app_screen.Home.listOfTabs.map((it, index) =>
                        <Button key={ it.name }
                                active={ tabIndex === index }
                                onPress={ () => on.TabSwitch(index) }>
                            <Icon name={ it.icon } />
                            <Text style={ it.style } numberOfLines={ 1 }>
                                { app_service.capitalize(it.name) }
                            </Text>
                        </Button>
                    )}
                </FooterTab>
            </Footer>
        </Container>
    );
};

export default HomeScreen
