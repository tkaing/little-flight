import React from 'react';

import HyperLink from "../../components/core/HyperLink";
import GoogleConnect from "../../components/GoogleConnect";
import FacebookConnect from "../../components/FacebookConnect";
import { Button, Icon, Text, View } from "native-base";

const AuthFooter = (
    { text, link, button, setSignIn, setLoading,
        handleSubmit, googleConnect, facebookConnect }
) => {

    return (
        <View style={{ ...styles.footer }}>

            <Button onPress={ handleSubmit } block info rounded iconLeft>
                <Icon name={ button.icon } />
                <Text>{ button.text }</Text>
            </Button>

            { googleConnect &&
            <GoogleConnect style={{ ...styles.footerConnect }}
                           setLoading={ setLoading }
                           signInWithGoogle={ googleConnect.signIn } />
            }

            { facebookConnect &&
            <FacebookConnect style={{ ...styles.footerConnect }}
                             setLoading={ setLoading } />
            }

            <Text style={{ ...styles.footerText }}>{ text }</Text>
            <HyperLink style={{ ...styles.footerLink }} onPress={ setSignIn }>{ link }</HyperLink>
        </View>
    )
};

const styles = {
    footer: {
        marginTop: 50,
        alignItems: 'center'
    },
    footerText: { marginTop: 30 },
    footerLink: { marginTop: 10 },
    footerConnect: { marginTop: 10 },
};

export default AuthFooter;