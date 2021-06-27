import React from "react";

import {Modal, Button, Text, Icon} from "native-base";

import * as app_common from "./../../../../App/Common";

const ModalOverview = (
    {
        state: {
            showModal, setShowModal,
            modalContent
        }
    }
) => {

    return (
        <Modal isOpen={ showModal } onClose={ () => setShowModal(false) }>
            <Modal.Content maxWidth="400px">
                <Modal.Header>
                    <Text { ...app_common.Text.forModal }>Overview</Text>
                </Modal.Header>
                <Modal.Body mt={5}>
                    { modalContent && modalContent.text &&
                        <>
                            <Button
                                mb={2}
                                width="70%"
                                variant="blue"
                                startIcon={ <Icon { ...app_common.Icon.forButton } name='stats-chart' /> }>
                                <Text>Points</Text>
                            </Button>

                            <Button
                                mb={2}
                                width="70%"
                                variant="red"
                                startIcon={ <Icon { ...app_common.Icon.forButton } name='stats-chart' /> }>
                                <Text>Altitude</Text>
                            </Button>

                            <Button
                                width="70%"
                                variant="green"
                                startIcon={ <Icon { ...app_common.Icon.forButton } name='stats-chart' /> }>
                                <Text>Duration</Text>
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
