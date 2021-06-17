import React from "react";

import { HomeCarousel } from "../../components";
import { Button, Content, Icon, Text } from "native-base";

import { FpvRoute } from "../../App/Route";

const HomeView = ({ navigation }) => {

    return (
        <Content style={{ flexDirection: 'column' }}
                 padder
                 contentContainerStyle={
                     { flex: 1, justifyContent: 'center', alignSelf: 'center' }
                 }>
            <HomeCarousel />

            <Button block success rounded iconLeft
                    onPress={ () => navigation.navigate(FpvRoute.name) }>
                <Icon name='videocam-outline' />
                <Text>Go to FPV !</Text>
            </Button>
        </Content>
    )
};

export default HomeView
