import React from 'react'

import { Box, Icon, IconButton, Row, useToast } from 'native-base'
import { Platform } from 'react-native'

import { SearchBar as RNSearchBar } from 'react-native-elements'

import Color from "../App/Color";

import * as app_common from "../App/Common"

import { on } from './../tools'

const SearchBar = (
    {
        state: {
            setListOfFriends,
            appUser, setAppUser,
            username, setUsername,
            loadingBtn, setLoadingBtn
        },
        navigation
    }
) => {

    const toast = useToast();

    return (
        <Row>

            <Box flex={1}>
                <RNSearchBar
                    value={ username }
                    placeholder="Search a DRONER"
                    onChangeText={ _value => setUsername(_value) }
                    />
            </Box>

            <Box justifyContent="center" alignItems="center" {...Platform.OS === 'ios' ? {height: 65, width: 65 } : {}}>
                <IconButton { ...app_common.IconButton.default }
                            bg={ Color.blue }
                            icon={ loadingBtn ? undefined : <Icon { ...app_common.Icon.default } name="person-add" size={6} 
                                                                    {...(Platform.OS === 'ios' ? 
                                                                    { 
                                                                        mt:'9',
                                                                        ml:'2'
                                                                    } : {})}
                                                            /> }
                            padding={5}
                            marginLeft={2}
                            alignSelf="center"
                            alignItems="center"
                            isLoading={ loadingBtn }
                            onPress={ () => on.home.profile.addFriend({
                                toast, navigation
                            }, {
                                username,
                                setAppUser,
                                setLoadingBtn,
                                setListOfFriends,
                            }) }
                    />
            </Box>

        </Row>
    )
}

export default SearchBar
