import React, { cloneElement, useEffect, useState } from "react";

import { lockAsync, OrientationLock } from "expo-screen-orientation";
import { Button, Container, Icon, Text, Footer, FooterTab } from "native-base";

import * as app_home from '../app/screen/app_home';
import { capitalize } from "../app/utils/app_string";

const HomeScreen = ({ navigation }) => {

    const [tabIndex, setTabIndex] = useState(0);

    const On = {
        TabSwitch: (tab) => setTabIndex(tab)
    };

    useEffect(() => {
        lockAsync(OrientationLock.DEFAULT);
    }, []);

    useEffect(() => {
        return navigation.addListener('focus', () => {
            lockAsync(OrientationLock.DEFAULT);
        });
    }, [navigation]);

    const currentTab = app_home.listOfTabs[tabIndex];

    return (
        <Container>
            { cloneElement(
                currentTab.content, { navigation: navigation }
            )}
            <Footer>
                <FooterTab>
                    { app_home.listOfTabs.map((it, index) =>
                        <Button key={ it.name }
                                active={ tabIndex === index }
                                onPress={ () => On.TabSwitch(index) }>
                            <Icon name={ it.icon } />
                            <Text style={ it.style } numberOfLines={ 1 }>
                                { capitalize(it.name) }
                            </Text>
                        </Button>
                    )}
                </FooterTab>
            </Footer>
        </Container>
    );
};

export default HomeScreen;