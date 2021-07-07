import React, { useState, useEffect } from "react"

import { ScrollView } from "react-native"
import { Avatar, Box, Button, Column, Icon, IconButton, Row, Text, useToast } from "native-base";

import SearchBar from "../../../components/SearchBar";
import { translate } from "../../../locale/local";
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

    const [dronies, setDronies] = useState();
    const [pending, setPending] = useState(false);
    const [username, setUsername] = useState();
    const [showModal, setShowModal] = useState(false);

    const [loadingBtn, setLoadingBtn] = useState(false);
    const [loadingListBtn, setLoadingListBtn] = useState(false);

    const [listOfFriends, setListOfFriends] = useState({
        requestByMe: {
            pending: [],
            accepted: []
        },
        requestByOthers: {
            pending: [],
            accepted: []
        },
    });

    const handle = {
        FriendButtonPress: async (forPending) => {

            setPending(forPending);

            setLoadingListBtn(true);

            await load.home.profile.listOfFriends(
                { toast, navigation },
                { setAppUser, setListOfFriends }
            );
            setLoadingListBtn(false);

            setShowModal(true);
        }
    };

    useEffect(() => {
        if (appUser) {
            setDronies(appUser.dronies);
        }
        load.home.profile.listOfFriends(
            { toast, navigation },
            { setAppUser, setListOfFriends }
        );
    }, []);

    return (
        <Box flex={1}>

            <ScrollView showsVerticalScrollIndicator={ false }>

                {/* === SearchBar === */}
                <Box mt={10}>
                    <SearchBar
                        state={{
                            setListOfFriends,
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
                </Column>

                {/* === Username === */}
                { appUser &&
                    <Column mt={5} alignItems="center">
                        <Text color="#e9eaec"
                              style={{ fontSize: 36 }}
                              fontWeight="200"
                              textTransform="capitalize">
                            { appUser.username }
                        </Text>
                        <Text color="#AEB5BC"
                              style={{ fontSize: 14 }}>
                            { appUser.email }
                        </Text>
                    </Column>
                }

                {/* === Overview === */}
                <Row mt={35}>
                    { [{
                        count: 2,
                        title: 'Medias'
                    }, {
                        count: listOfFriends.requestByMe.accepted.length
                            + listOfFriends.requestByOthers.accepted.length,
                        title: 'Droners'
                    }, {
                        count: dronies,
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
                    {/* Button Waiting */}
                    <Button variant="red" mr={2}
                            isDisabled={ loadingListBtn }
                            onPress={ () => handle.FriendButtonPress(true) }>
                        <Text>{translate("WAITING")}</Text>
                    </Button>
                    {/* Button Friends */}
                    <Button variant="blue"
                            isDisabled={ loadingListBtn }
                            onPress={ () => handle.FriendButtonPress(false) }>
                        <Text>{translate("FRIENDS_LIST")}</Text>
                    </Button>
                </Button.Group>

            </ScrollView>

            <ModalOverview
                toast={ toast }
                state={{
                    pending,
                    showModal,
                    setDronies,
                    setShowModal,
                    listOfFriends,
                    setListOfFriends,
                    appUser, setAppUser,
                }}
                />

        </Box>
    );
}

export default Profile
