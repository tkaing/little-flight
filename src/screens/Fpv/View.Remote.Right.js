import React, { useState } from "react"

import { Center, Column, Icon, IconButton, Row, Text, useToast } from "native-base"

import DirectionalButton from '../../components/DirectionnalButton'

import * as app_drone from "./../../App/Drone"
import * as app_common from "./../../App/Common"

import { drone } from "../../tools"

import { on, load } from '../../tools'

import ModalBugOverview from './Subview/ModalBugOverview'


const RemoteRight = ({  }) => {

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    const handle = {
        BugReportButtonPress: () => {
            setShowModal(true);
        }
    };

    return (
        <Column flex={ 1 } bg="#595758">

            <Row flex={ 1 } pt={ 1 } justifyContent="space-evenly" alignItems="center">

                <IconButton { ...app_common.IconButton.forRemote }
                            icon={ <Icon { ...app_common.Icon.forRemote } name="videocam" /> }
                            />

                <IconButton { ...app_common.IconButton.forRemote }
                            icon={ <Icon { ...app_common.Icon.forRemote } name="camera-outline" /> }
                            />

                <IconButton { ...app_common.IconButton.forRemote }
                    icon={ <Icon { ...app_common.Icon.forRemote } name="bug-outline" /> } 
                    onPress={ () => handle.BugReportButtonPress() }
                />
            </Row>

            <Center flex={ 3 }>
                <DirectionalButton
                    top={ () => drone.move('forward') } // forward
                    left={ () => drone.move('left') } // left
                    right={ () => drone.move('right') } // right
                    bottom={ () => drone.move('back') } // back
                    />
            </Center>

            <Center mb={ 5 }>
                <Text>🔄 direction 🔄</Text>
            </Center>

            <ModalBugOverview state={{
                showModal,
                setShowModal
            }} />

        </Column>
    );
};

export default RemoteRight
