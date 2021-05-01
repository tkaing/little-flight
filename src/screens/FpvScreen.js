import React from "react";
import {Container, Content, Thumbnail} from "native-base";
import DroneUri from './../../assets/255-2557343_drone-dji-ryze-tech-tello-camera-hd-tello.png';

const FpvScreen = ({}) => {

    return (
        <Container>
            <Content style={{ flexDirection: 'column' }}
                     padder
                     contentContainerStyle={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                <Thumbnail square source={ DroneUri } style={{ width: 250, height: 250 }} />
            </Content>
        </Container>
    );
};

export default FpvScreen;