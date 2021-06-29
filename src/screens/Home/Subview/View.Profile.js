import React, { useState, useEffect } from "react"

import { ScrollView } from "react-native"
import { Avatar, Box, Button, Column, Icon, IconButton, Row, Text, useToast } from "native-base";

import SearchBar from "../../../components/SearchBar";
import { ModalOverview } from "./Profile";

import * as app_common from "../../../App/Common";

import { on, load } from './../../../tools'

const Profile = (
    {
        state: {
            loading, setLoading,
            appUser, setAppUser,
        },
        navigation
    }
) => {

    const toast = useToast();

    const [username, setUsername] = useState();
    const [showModal, setShowModal] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [listOfFriends, setListOfFriends] = useState([]);
    const [pendingFriend, setPendingFriend] = useState(false);

    const handle = {
        FriendButtonPress: (forPending) => {
            setShowModal(true);
            setPendingFriend(forPending);
        }
    };

    useEffect(() => {
        load.home.profile.listOfFriends(
            { navigation, toast },
            { setAppUser, setListOfFriends }
        );
    }, []);

    useEffect(() => {
        console.log(appUser);
    }, [appUser]);

    const listOfFriendsByPending = listOfFriends.filter(_it => !_it.isAccepted);
    const listOfFriendsByAccepted = listOfFriends.filter(_it => _it.isAccepted);

    return (
        <Box flex={1}>

            <ScrollView showsVerticalScrollIndicator={ false }>

                {/* === SearchBar === */}
                <Box mt={10}>
                    <SearchBar
                        state={{
                            appUser, setAppUser,
                            username, setUsername,
                            loadingBtn, setLoadingBtn
                        }}
                        navigation={ navigation } />
                </Box>

                {/* === Avatar === */}
                <Column mt={10}>
                    <IconButton
                        { ...app_common.IconButton.forProfile }
                        mr={140}
                        bg="#41444B"
                        icon={ <Icon { ...app_common.Icon.default } name="share-social" size="sm" /> }
                        onPress={ () => on.home.profile.share() }
                        alignSelf="center"
                        />
                    <Avatar
                        size="xl"
                        source={ require("./../../../../assets/ken.jpeg") }
                        alignSelf="center"
                        />
                    <IconButton
                        { ...app_common.IconButton.forProfile }
                        ml={140}
                        bg="#41444B"
                        icon={ <Icon { ...app_common.Icon.default } name="ios-add" size="xl" /> }
                        alignSelf="center"
                        />
                </Column>

                {/* === Username === */}
                { appUser &&
                    <Column mt={5} alignItems="center">
                        <Text color="#e9eaec" fontWeight="200" textTransform="capitalize" style={{ fontSize: 36 }}>{ appUser.username }</Text>
                        <Text color="#AEB5BC" style={{ fontSize: 14 }}>{ appUser.email }</Text>
                    </Column>
                }

                {/* === Overview === */}
                <Row mt={35}>
                    { [{
                        count: 2,
                        title: 'Medias'
                    }, {
                        count: listOfFriendsByAccepted.length,
                        title: 'Droners'
                    }, {
                        count: 300,
                        title: 'Drone Points'
                    }].map((_it, _index) =>
                        <Column flex={1}
                                alignItems="center"
                                borderColor="#DFD8C8"
                                borderLeftWidth={_index === 1 ? 1 : 0}
                                borderRightWidth={_index === 1 ? 1 : 0}>
                            <Text fontSize="xl">{ _it.count }</Text>
                            <Text color="#AEB5BC"
                                  fontSize="xs"
                                  fontWeight="500"
                                  textTransform="uppercase" mt={1}>
                                { _it.title }
                            </Text>
                        </Column>
                    )}
                </Row>

                {/* === Friends === */}
                <Button.Group
                    mt={10}
                    mx={{ base: "auto", md: 0 }}
                    space={6}
                    isAttached
                    variant="solid">
                    <Button variant="red" mr={2}
                            onPress={ () => handle.FriendButtonPress(true) }>
                        <Text>En attente</Text>
                    </Button>
                    <Button variant="blue"
                            onPress={ () => handle.FriendButtonPress(false) }>
                        <Text>Liste d'amis</Text>
                    </Button>
                </Button.Group>

            </ScrollView>

            <ModalOverview state={{
                showModal,
                setShowModal,
                pendingFriend,
                setListOfFriends,
                appUser, setAppUser,
                listOfFriendsByPending,
                listOfFriendsByAccepted,
            }} />

        </Box>
    );
}

export default Profile
