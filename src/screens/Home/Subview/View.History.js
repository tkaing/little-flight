import React, {useState} from "react";
import styles from "./Styles.History";

import {Item, ModalOverview, SectionHeader} from "./History";
import {Box, Center, Column, Icon, Row, SectionList, Text} from "native-base";

import * as app_common from './../../../App/Common';
import Headline from "../../../core/Headline";

const History = ({ navigation }) => {

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState();

    const data = [
        {
            title: "Juillet",
            data: ["3m", "1h45", "45m"],
        },
        {
            title: "Juin",
            data: ["15m", "5m", "30s"],
        },
    ];

    return (
        <>
            <Box flex={ 1 }>
                <Headline icon="stats-chart">flights</Headline>
            </Box>

            <Box flex={ 5 } mx={ 5 }>
                <SectionList
                    sections={ data }
                    keyExtractor={ (item, index) => item + index }
                    renderItem={ ({ item }) => <Item item={ item } state={{ setShowModal, setModalContent }} /> }
                    renderSectionHeader={ ({ section: { title } }) => <SectionHeader title={ title } /> }
                />
            </Box>

            <ModalOverview state={{
                showModal, setShowModal,
                modalContent
            }} />
        </>
    );
}

export default History
