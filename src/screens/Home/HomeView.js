import React from "react";

import { HomeCarousel } from "../../components";
import { Button, Content, Icon, Text } from "native-base";

import * as app_route from "../../App/Route";
import BarConnect from "../../components/BarConnect";

const HomeView = ({ navigation }) => {

    return (
        <Content style={[ { flexDirection: 'column' } ]}
                 padder
                 contentContainerStyle={
                     { flex: 1, justifyContent: 'center', alignSelf: 'center' }
                 }>
            <BarConnect/>
            
            <HomeCarousel />

            <Button block success rounded iconLeft
                    onPress={ () => navigation.navigate(app_route.fpv.name) }>
                <Icon name='videocam-outline' />
                <Text>Go to FPV !</Text>
            </Button>
        </Content>
    )
};

export default HomeView
