import React from "react"

import { Modal, Button, Text, FlatList } from "native-base"

import * as app_common from "./../../../../App/Common"

import { Item } from "../Profile";

const ModalOverview = (
    {
        state: {
            pending,
            showModal,
            setShowModal,
            listOfFriends,
            setListOfFriends,
            appUser, setAppUser
        },
        navigation
    }
) => {

    return (
        <Modal isOpen={ showModal } onClose={ () => setShowModal(false) }>
            <Modal.Content maxWidth="400px">
                <Modal.Header>
                    <Text { ...app_common.Text.forModal }>
                        { pending ? 'Demandes d\'ajout' : 'Ma Liste d\'amis' }
                    </Text>
                </Modal.Header>
                <Modal.Body mt={5}>
                    <FlatList
                        data={ pending
                            ? listOfFriends.requestByOthers.pending
                            : listOfFriends.requestByOthers.accepted
                                .concat(listOfFriends.requestByMe.accepted)
                                .concat(listOfFriends.requestByMe.pending)
                        }
                        renderItem={ ({ item }) => (
                            <Item item={ item } state={{
                                pending,
                                setAppUser,
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
