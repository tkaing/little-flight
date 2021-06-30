import React from 'react';
import styles from "./Styles.Footer";

import { GoogleConnect } from "../../components";
import { Button, Center, Column, Icon, Link, Text } from "native-base";

import * as app_common from "./../../App/Common";

const Footer = (
    {
        state: {
            appUser, setAppUser,
            loading, setLoading,
        },
        text,
        link,
        button,
        onLinkPress,
        handleSubmit,
        googleConnect,
    }
) => {

    return (
        <Column style={[ styles.container ]}>

            <Button
                width="70%"
                variant="blue"
                onPress={ handleSubmit }
                startIcon={ <Icon { ...app_common.Icon.forButton } name={ button.icon } /> }>
                <Text>{ button.text }</Text>
            </Button>

            { googleConnect &&
                <GoogleConnect state={{
                    appUser, setAppUser,
                    loading, setLoading,
                }} />
            }

            <Center>
                <Text style={[ styles._text ]}
                      children={ text } />
                <Link { ...app_common.Link._text }
                      style={[ styles._link ]}
                      onPress={ onLinkPress }
                      children={ link } />
            </Center>

        </Column>
    );
};

export default Footer
