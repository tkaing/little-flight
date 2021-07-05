import React from "react";

import {Modal, Button, Text, Icon} from "native-base";

import * as app_common from "./../../../../App/Common";

const ModalOverview = (
    {
        state: {
            showModal, setShowModal,
            modalContent: { item }
        }
    }
) => {

    const getBatteryIcon = () => {
        switch (item.battery) {
            case 100:
                return "battery-full-sharp";
            case 0:
                return "battery-dead-sharp";
            default:
                return "battery-half-sharp";
        }
    }

    return (
        <Modal isOpen={ showModal } onClose={ () => setShowModal(false) }>
            <Modal.Content maxWidth="400px">
                <Modal.Header>
                    <Text { ...app_common.Text.forModal }>Overview</Text>
                </Modal.Header>
                <Modal.Body mt={5} justifyContent="center">
                    { item &&
                        <>
                            <Button
                                mb={2}
                                variant="green"
                                startIcon={ <Icon { ...app_common.Icon.forButton } name='hourglass-outline' /> }>
                                <Text>Duration : { item.time }s</Text>
                            </Button>

                            <Button
                                mb={2}
                                variant="red"
                                startIcon={ <Icon { ...app_common.Icon.forButton } name={ getBatteryIcon() } /> }>
                                <Text>Battery : { item.battery }%</Text>
                            </Button>

                            <Button
                                mb={2}
                                variant="blue"
                                startIcon={ <Icon { ...app_common.Icon.forButton } name='thermometer-outline' /> }>
                                <Text>Temperature : { item.temp }</Text>
                            </Button>
                        </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group variant="ghost" space={2}>
                        <Button onPress={ () => setShowModal(false) }>
                            Fermer
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
}

export default ModalOverview
