import React, { useState } from "react"
import styles from "./Styles.Profile"

import { Ionicons } from "@expo/vector-icons"
import { Text, Image, ScrollView } from "react-native"
import { Box, Center, Column, Row } from "native-base";

import SearchBar from "../../../components/SearchBar";

import * as app_common from "../../../App/Common";

import { on, load } from './../../../tools'

const Profile = (
    { navigation }
) => {

    const [username, setUsername] = useState();
    const [errorManager, setErrorManager] = useState({});

    return (
        <Box flex={1}>

            <ScrollView showsVerticalScrollIndicator={ false }>

                <SearchBar state={{ username, setUsername }} />

                <Center>

                    <Box width={200} height={200} borderRadius={100} overflow="hidden">
                        <Image flex={1} source={ require("./../../../../assets/ken.jpeg") } resizeMode="center" />
                    </Box>

                    <Box bg="#41444B"
                         alignItems="center"
                         justifyContent="center"
                         top={20}
                         width={40}
                         height={40}
                         position="absolute"
                         borderRadius={20}>
                        <Ionicons
                            size={18}
                            name="share-outline"
                            color="#DFD8C8"
                            onPress={ /*myCustomShare*/ () => {} } />
                    </Box>

                    <Box
                        bg="#41444B"
                        alignItems="center"
                        justifyContent="center"
                        right={0}
                        width={60}
                        height={60}
                        bottom={0}
                        position="absolute"
                        borderRadius={30}>
                        <Ionicons
                            mt={6}
                            ml={6}
                            size={48}
                            name="ios-add"
                            color="#DFD8C8" />
                    </Box>

                </Center>

                <Column alignItems="center">
                    <Text color="#e9eaec" fontWeight="200" style={{ fontSize: 36 }}>Kengg</Text>
                    <Text color="#AEB5BC" style={{ fontSize: 14 }}>Dev</Text>
                </Column>

                <Row alignSelf="center" mt={32}>

                    <Row flex={1} alignItems="center">
                        <Text color="#e9eaec" style={{ fontSize: 24 }}>2</Text>
                        <Text color="#AEB5BC" textTransform="uppercase" fontWeight="500" style={{ fontSize: 12 }}>Medias</Text>
                    </Row>

                    <Row flex={1} alignItems="center" style={{ borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }}>
                        <Text color="#e9eaec" style={{ fontSize: 24 }}>45</Text>
                        <Text color="#AEB5BC" textTransform="uppercase" fontWeight="500" style={{ fontSize: 12 }}>Droners</Text>
                    </Row>

                    <Row flex={1} alignItems="center">
                        <Text color="#e9eaec" style={{ fontSize: 24 }}>300</Text>
                        <Text color="#AEB5BC" textTransform="uppercase" fontWeight="500" style={{ fontSize: 12 }}>Drone Points</Text>
                    </Row>

                </Row>

            </ScrollView>
        </Box>
    );
}

export default Profile
