import React, { useState } from "react"

import { Button, Center, Column, Row, Text } from "native-base"

import DirectionalButton from '../../components/DirectionnalButton'

import { drone } from "./../../tools"

import * as app_service from "./../../App/Service";

const RemoteLeft = (
    {
        droneSocket,
        state: {
            setOpenVR
        }
    }
) => {

    const [takeoff, setTakeoff] = useState(false);

    return (
        <Column flex={1} bg="#595758">

            <Row flex={1}
                 alignItems="center"
                 justifyContent="center">

                <Button variant="green"
                        marginRight= {10}
                        onPress={ () => setOpenVR(true) }>
                    <Text fontWeight="bold">VR</Text>
                </Button>

                <Button variant={ !takeoff ? 'blue': 'red' }
                        onPress={ () => {
                            drone.takeOffOrLand(
                                { droneSocket }, { takeoff, setTakeoff }
                            );
                        }}>
                    <Text fontWeight="bold">
                        { !takeoff
                            ? app_service.capitalize('START')
                            : app_service.capitalize('STOP')
                        }
                    </Text>
                </Button>

            </Row>

            <Center flex={3}>
                <DirectionalButton
                    top={ () => drone.upOrDown({ droneSocket, direction: 'up' }) }
                    left={ () => drone.rotation({ droneSocket, direction: 'ccw' }) }
                    right={ () => drone.rotation({ droneSocket, direction: 'cw' }) }
                    bottom={ () => drone.upOrDown({ droneSocket, direction: 'down' }) }
                    />
            </Center>

            <Center mb={5}>
                <Text>🔄 rotation 🔄</Text>
            </Center>

        </Column>
    );
};

export default RemoteLeft
