import React, { useState } from "react"

import { Center, Column, Icon, IconButton, Row, Text } from "native-base"

import DirectionalButton from '../../components/DirectionnalButton'

import * as app_common from "./../../App/Common"

import { drone } from "../../tools";

const RemoteRight = ({  }) => {

    const [loading, setLoading] = useState(false);

    return (
        <Column flex={ 1 } bg="#595758">

            <Row flex={ 1 } pt={ 1 } justifyContent="space-evenly" alignItems="center">
                <IconButton { ...app_common.IconButton.forRemote }
                            icon={ <Icon { ...app_common.Icon.forRemote } name="videocam" /> } />
                <IconButton { ...app_common.IconButton.forRemote }
                            icon={ <Icon { ...app_common.Icon.forRemote } name="camera-outline" /> } />
            </Row>

            <Center flex={ 3 }>
                <DirectionalButton
                    top={ () => drone.move('forward') }
                    left={ () => drone.move('left') }
                    right={ () => drone.move('right') }
                    bottom={ () => drone.move('back') }
                    />
            </Center>

            <Center mb={ 5 }>
                <Text>🔄 direction 🔄</Text>
            </Center>

        </Column>
    );
};

export default RemoteRight