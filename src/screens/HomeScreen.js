import React, {useState} from "react";
import {Button, Container, Content, Icon, Text, Footer, FooterTab} from "native-base";
import { StyleSheet} from 'react-native'

import { FpvRoute } from "../app/app_route";
import MyCarousel from "../components/slider";

const HomeScreen = ({ navigation }) => {

    const [currentTab, setCurrentTab] = useState(true);
    const Handling = {
        switchTab: (tabName) => setCurrentTab(tabName)
    };

    return (
        <Container>
            <Content style={{ flexDirection: 'column' }}
                     padder
                     contentContainerStyle={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                <MyCarousel/>
                <Button block success rounded iconLeft
                        onPress={ () => navigation.navigate(FpvRoute.name) }>
                    <Icon name='videocam-outline' />
                    <Text>Go to FPV !</Text>
                </Button>
            </Content>
            <Footer>
                <FooterTab style={styles.footer}>
                <Button vertical onPress={ () => Handling.switchTab("history")}>
                    <Icon name="analytics-outline" />
                    <Text>History</Text>
                </Button>
                <Button vertical onPress={ () => Handling.switchTab("recordings")}>
                    <Icon name="film"/>
                    <Text style={{fontSize:9}}>Recordings</Text>
                </Button>
                <Button vertical onPress={ () => Handling.switchTab("settings")}>
                    <Icon name="settings" />
                    <Text>Settings</Text>
                </Button>
                <Button vertical onPress={ () => Handling.switchTab("user")}>
                    <Icon name="person" />
                    <Text>Profile</Text>
                </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
};

const styles = StyleSheet.create({
    main_container: {
      height: 190
    },
    footer: {
      backgroundColor: '#705c82'
    }
  })

export default HomeScreen;