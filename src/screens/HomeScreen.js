import React from "react";
import {Button, Container, Content, Icon, Text} from "native-base";
import { FpvRoute } from "../app/app_route";

const HomeScreen = ({ navigation }) => {

    return (
        <Container>
            <Content style={{ flexDirection: 'column' }}
                     padder
                     contentContainerStyle={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                <Button block success rounded iconLeft
                        onPress={ () => navigation.navigate(FpvRoute.name) }>
                    <Icon name='videocam-outline' />
                    <Text>Go to FPV !</Text>
                </Button>
            </Content>
        </Container>
    );
};

export default HomeScreen;