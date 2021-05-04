import React from "react";
import {Button, Container, Content, Icon, Text, Footer, FooterTab} from "native-base";
import { StyleSheet} from 'react-native'

import { FpvRoute } from "../app/app_route";
import MyCarousel from "../components/slider";

const HomeScreen = ({ navigation }) => {

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
                    <Button vertical>
                        <Icon name="analytics-outline" />
                        <Text>History</Text>
                    </Button>
                    <Button vertical>
                        <Icon name="film"/>
                        <Text style={{fontSize:9}}>Recordings</Text>
                    </Button>
                    <Button vertical>
                        <Icon name="settings" />
                        <Text>Settings</Text>
                    </Button>
                    <Button vertical>
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