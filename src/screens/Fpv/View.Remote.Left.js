import React, { useState } from "react"

import { Box, Button, Center, Column, Text, Row } from "native-base"

import DirectionalButton from '../../components/DirectionnalButton'

import { drone } from "./../../tools"
import * as app_route from "../../App/Route";

const RemoteLeft = ({ navigation }) => {

    const [takeoff, setTakeoff] = useState(false);

    return (
        <Column flex={ 1 } bg="#595758">

            <Box flex={ 1 } justifyContent="center" alignItems="center">
                <Row>
                    <Button
                        variant="green"
                        onPress={ () => navigation.navigate(app_route.fpv.name) }>
                        <Text>VR</Text>
                    </Button>
                    <Button variant="blue" onPress={ () => drone.takeOffOrLand({ takeoff, setTakeoff }) }>
                        <Text>{ !takeoff ? 'START' : 'STOP' }</Text>
                    </Button>
                </Row>
            </Box>

            <Center flex={ 3 }>
                <DirectionalButton
                    top={ () => drone.upOrDown('up') }
                    left={ () => drone.rotate('ccw') }
                    right={ () => drone.rotate('cw') }
                    bottom={ () => drone.upOrDown('down') }
                    />
            </Center>

            <Center mb={ 5 }>
                <Text>🔄 rotation 🔄</Text>
            </Center>

        </Column>
    );
};

export default RemoteLeft
