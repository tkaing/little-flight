import React from 'react';

import { styles } from "./Sign";
import { HyperLink } from "../../core";
import { GoogleConnect } from "../../components";
import { Button, Icon, Text, View } from "native-base";

const Footer = (
    { text, link, button, onLinkPress, setLoading,
        handleSubmit, googleConnect }
) => {

    return (
        <View style={[ styles.footer ]}>

            <Button onPress={ handleSubmit } block info rounded iconLeft>
                <Icon name={ button.icon } />
                <Text>{ button.text }</Text>
            </Button>

            { googleConnect &&
                <GoogleConnect style={[ styles.footerConnect ]}
                               setLoading={ setLoading }
                               signInWithGoogle={ googleConnect.signIn } />
            }

            <Text style={[ styles.footerText ]}>{ text }</Text>

            <HyperLink style={[ styles.footerLink ]}
                       onPress={ onLinkPress }>{ link }</HyperLink>

        </View>
    )
};

export default Footer
