import React, { useEffect, useState } from "react";

import { Item, SectionHeader, ModalOverview } from "./History";
import {Box, SectionList, useToast} from "native-base";

import Headline from "../../../core/Headline";

import { load } from "./../../../tools"

const History = (
    {
        navigation,
        state: {
            loading, setLoading,
            appUser, setAppUser,
        }
    }
) => {

    const toast = useToast();

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ item: null });
    const [listOfSessions, setListOfSessions] = useState([]);

    useEffect(() => {
        load.home.history.listOfSessions({ toast, navigation }, {
            setListOfSessions,
            setAppUser, setLoading
        });
    }, []);

    return (
        <>
            <Box flex={ 1 }>
                <Headline icon="stats-chart">flights</Headline>
            </Box>

            <Box flex={ 5 } mx={ 5 }>
                <SectionList
                    sections={
                        listOfSessions.length > 0
                            ? [{ title: "Mes derniers vols", data: listOfSessions }]
                            : []
                    }
                    renderItem={ ({ item }) => <Item item={ item } state={{ setShowModal, setModalContent }} /> }
                    keyExtractor={ (item, index) => index }
                    renderSectionHeader={ ({ section: { title } }) => <SectionHeader title={ title } /> }
                />
            </Box>

            <ModalOverview state={{
                showModal, setShowModal, modalContent
            }} />
        </>
    );
}

export default History
