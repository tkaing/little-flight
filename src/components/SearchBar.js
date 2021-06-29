import React, { useEffect } from 'react'

import { Box, Icon, IconButton, Row } from 'native-base'

import { SearchBar as RNSearchBar } from 'react-native-elements'

import * as app_common from "../App/Common"

const SearchBar = (
    {
        state: {
            username, setUsername
        }
    }
) => {

    useEffect(() => {
        console.log(username);
    }, [username]);

    return (
        <Row justifyContent="space-between" mt={24}>

            <Box flex={1} mt={10}>
                <RNSearchBar
                    value={ username }
                    placeholder="Search a DRONER"
                    onChangeText={ _value => setUsername(_value) }
                />
            </Box>

            <Box mt={10} justifyContent="center" alignItems="center">
                <IconButton { ...app_common.IconButton.default }
                            ml={5}
                            icon={ <Icon { ...app_common.Icon.default } name="videocam" /> }
                            height={60}
                            onPress={ () => {

                                /*on.Search(username);

                                if (errorManager.addFriend) {
                                    Toast.show({
                                        text: "Wrong job!",
                                        textStyle: { color: "yellow" },
                                        buttonText: `${username} doesn't exist`
                                    });
                                }
                                else {
                                    Toast.show({
                                        text: "Good job!",
                                        textStyle: { color: "green" },
                                        buttonText: `Okay ${username} is added`
                                    });
                                }*/
                            } }
                />
            </Box>

        </Row>
    )
}

export default SearchBar
