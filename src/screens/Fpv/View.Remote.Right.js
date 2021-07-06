import React, { useState } from "react"

import { Center, Column, Icon, IconButton, Row, Text, useToast } from "native-base"

import * as app_common from "./../../App/Common"

import ModalBugOverview from './Subview/ModalBugOverview'
import DirectionalButton from '../../components/DirectionnalButton'

import { on, drone } from "../../tools"

const RemoteRight = (
    {
        toast,
        droneSocket,
        state: {
            liveExecId,
            setNewFrame,
            setLiveExecId,
            recordingExecId,
            setRecordingExecId,
        }
    }
) => {

    const [showModal, setShowModal] = useState(false);

    const [loadingRecordingBtn, setLoadingRecordingBtn] = useState(false);
    const [loadingScreenshotBtn, setLoadingScreenshotBtn] = useState(false);

    return (
        <Column flex={1} bg="#595758">

            <Row flex={1} pt={1} justifyContent="space-evenly" alignItems="center">
                <IconButton
                    { ...app_common.IconButton.forFpvRecording }
                    icon={ !loadingRecordingBtn ? <Icon { ...app_common.Icon.forRemote } name="videocam" /> : null }
                    onPress={ () => on.fpv.recordingTap(
                        { toast }, {
                            liveExecId,
                            setNewFrame,
                            setLiveExecId,
                            recordingExecId,
                            setRecordingExecId,
                            setLoadingRecordingBtn
                        }
                    )}
                    variant={ recordingExecId ? 'red' : 'blue' }
                    isLoading={ loadingRecordingBtn }
                    isDisabled={ loadingRecordingBtn }
                    />
                <IconButton
                    { ...app_common.IconButton.forRemote }
                    icon={ !loadingScreenshotBtn ? <Icon { ...app_common.Icon.forRemote } name="camera" /> : null }
                    onPress={ () => on.fpv.screenshotTap(
                        { toast }, {
                            setLoadingScreenshotBtn
                        }
                    )}
                    isLoading={ loadingScreenshotBtn }
                    isDisabled={ loadingScreenshotBtn || recordingExecId !== null }
                    />
                <IconButton
                    { ...app_common.IconButton.forRemote }
                    icon={ <Icon { ...app_common.Icon.forRemote } name="bug" /> }
                    onPress={ () => setShowModal(true) }
                    />
            </Row>

            <Center flex={3}>
                <DirectionalButton
                    top={ () => drone.move({ droneSocket, direction: 'forward' }) }
                    left={ () => drone.move({ droneSocket, direction: 'left' }) }
                    right={ () => drone.move({ droneSocket, direction: 'right' }) }
                    bottom={ () => drone.move({ droneSocket, direction: 'back' }) }
                    />
            </Center>

            <Center mb={5}>
                <Text>🔄 direction 🔄</Text>
            </Center>

            <ModalBugOverview state={{ showModal, setShowModal }} />

        </Column>
    );
};

export default RemoteRight
