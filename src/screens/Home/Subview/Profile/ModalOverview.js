import React from "react"

import { Modal, Button, Text, FlatList } from "native-base"

import * as app_common from "./../../../../App/Common"

import { Item } from "../Profile";

const ModalOverview = (
    {
        state: {
            appUser, setAppUser,
            showModal, setShowModal,
            pendingFriend,
            setListOfFriends,
            listOfFriendsByPending,
            listOfFriendsByAccepted,
        },
        navigation
    }
) => {

    return (
        <Modal isOpen={ showModal } onClose={ () => setShowModal(false) }>
            <Modal.Content maxWidth="400px">
                <Modal.Header>
                    <Text { ...app_common.Text.forModal }>
                        { pendingFriend ? 'En attente' : 'Liste d\'amis' }
                    </Text>
                </Modal.Header>
                <Modal.Body mt={5}>
                    <FlatList
                        data={ pendingFriend ? listOfFriendsByPending : listOfFriendsByAccepted }
                        renderItem={ ({ item }) => (
                            <Item item={ item } state={{
                                setAppUser,
                                pendingFriend,
                                setListOfFriends
                            }} navigation={ navigation } />
                        ) }
                        keyExtractor={ (item, index) => item + index }
                    />
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
