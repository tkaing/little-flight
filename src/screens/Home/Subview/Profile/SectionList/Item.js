import React, {useState} from "react"

import { Box, Button, Icon, IconButton, Row, Text, useToast } from "native-base"

import * as app_common from "../../../../../App/Common"

import { on } from './../../../../../tools'

const Item = (
    {
        item,
        state: {
            pending,
            setAppUser,
            setListOfFriends
        },
        navigation
    }
) => {

    const [loadingBtn, setLoadingBtn] = useState(false);

    console.log('=== ITEM ===', item.requestTo.username);
    console.log('=== ITEM ===', pending, item.requestTo.username);

    const toast = useToast();


    return (
        <Box
            pl={5}
            pr={2}
            py={2}
            rounded="md">

            <Row alignItems="center" justifyContent="center">

                <Text flex={2} textAlign="center" fontWeight="bold" textTransform="capitalize" variant="modal">
                    { item.requestBy.username && item.requestBy.username }
                    { item.requestTo.username && item.requestTo.username }
                </Text>

                { pending &&
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
                                    setLoadingBtn,
                                    setListOfFriends
                                }
                            ) }
                            padding={3}
                            variant="blue"
                            isLoading={ loadingBtn }
                            isDisabled={ loadingBtn }
                        />
                        <IconButton
                            mx={1}
                            icon={ loadingBtn
                                ? undefined
                                : <Icon { ...app_common.Icon.default }
                                        name='close' size={4} />
                            }
                            onPress={ () => on.home.profile.rejectFriend(
                                { friendId: item._id, navigation },
                                {
                                    setAppUser,
                                    setLoadingBtn,
                                    setListOfFriends,
                                }
                            ) }
                            padding={3}
                            variant="red"
                            isLoading={ loadingBtn }
                            isDisabled={ loadingBtn }
                        />
                    </Button.Group>
                }

                { !pending &&
                    <Button.Group flex={2} isAttached>
                        <IconButton
                            mx={1}
                            onPress= { async () => on.profile.sendGift({toast, friendId: item.requestTo._id, amount: 40 }) }
                            icon={ loadingBtn
                                ? undefined
                                : <Icon { ...app_common.Icon.default }
                                        name={ item.isAccepted ? 'share-social' : 'ellipsis-horizontal' } 
                                        size={4} 
                                    />
                            }
                            padding={3}
                            variant={ item.isAccepted ? 'blue' : 'red' }
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
