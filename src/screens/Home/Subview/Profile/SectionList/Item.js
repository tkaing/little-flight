import React, {useState} from "react"

import { Box, Button, Icon, IconButton, Row, Text } from "native-base"

import * as app_common from "../../../../../App/Common"

import { on } from './../../../../../tools'

const Item = (
    {
        item,
        state: {
            setAppUser,
            pendingFriend,
            setListOfFriends
        },
        navigation
    }
) => {

    const [loadingBtn, setLoadingBtn] = useState(false);

    return (
        <Box
            pl={5}
            pr={2}
            py={2}
            rounded="md">

            <Row alignItems="center" justifyContent="center">

                <Text flex={2} textAlign="center" fontWeight="bold" textTransform="capitalize" variant="modal">
                    { item.person.username }
                </Text>

                { pendingFriend &&
                    <Button.Group
                        flex={2}
                        isAttached>
                        <IconButton
                            mx={1}
                            icon={ loadingBtn ? undefined : <Icon { ...app_common.IconButton.default } name='person-add' size={4} /> }
                            onPress={ () => on.home.profile.acceptFriend(
                                { friendId: item._id, navigation },
                                {
                                    setAppUser,
                                    setListOfFriends,
                                    loadingBtn, setLoadingBtn
                                }
                            ) }
                            padding={3}
                            variant="blue"
                            isLoading={ loadingBtn }
                            isDisabled={ loadingBtn }
                        />
                        <IconButton
                            mx={1}
                            icon={ loadingBtn ? undefined : <Icon { ...app_common.IconButton.default } name='close' size={4} /> }
                            onPress={ () => on.home.profile.rejectFriend(
                                { friendId: item._id, navigation },
                                {
                                    setAppUser,
                                    setListOfFriends,
                                    loadingBtn, setLoadingBtn
                                }
                            ) }
                            padding={3}
                            variant="red"
                            isLoading={ loadingBtn }
                            isDisabled={ loadingBtn }
                        />
                    </Button.Group>
                }

                { !pendingFriend &&
                    <Button.Group
                        flex={2}
                        isAttached>
                        <IconButton
                            mx={1}
                            icon={ loadingBtn ? undefined : <Icon { ...app_common.IconButton.default } name='share-social' size={4} /> }
                            padding={3}
                            variant="blue"
                            isLoading={ loadingBtn }
                            isDisabled={ loadingBtn }
                        />
                    </Button.Group>
                }
            </Row>

        </Box>
    );
}

export default Item
