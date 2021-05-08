import React from "react";
import { Button, Content, Icon, Text } from "native-base";
import HomeCarousel from "../../components/HomeCarousel";

import { FpvRoute } from "../../app/app_route";

const Home = ({ navigation }) => {
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

export default Home;