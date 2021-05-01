import React, {useState} from "react";
import {Button, Container, Content, Form, Icon, Input, Item, Text, View} from "native-base";
import HyperLink from "../components/HyperLink";

import { HomeRoute } from '../app/app_route';

const AuthScreen = ({ navigation }) => {

    const [isSignIn, setSignIn] = useState(true);

    const Handling = {
        postSign: () => navigation.navigate(HomeRoute.name)
    };

    return (
        <Container>
            <Content style={{ flexDirection: 'column' }}
                     padder
                     contentContainerStyle={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                { isSignIn && <SignIn setSignIn={ setSignIn } onPostSignIn={ Handling.postSign } /> }
                { !isSignIn && <SignUp setSignIn={ setSignIn } onPostSignUp={ Handling.postSign } /> }
            </Content>
        </Container>
    );
};

const SignIn = ({ setSignIn, onPostSignIn }) => {

    return (
        <View>
            <Form>
                <Item>
                    <Icon active name='person-circle-outline' />
                    <Input placeholder='Email' />
                </Item>
                <Item style={{ marginTop: 10 }}>
                    <Icon active name='key-outline' />
                    <Input placeholder='Password' />
                </Item>
            </Form>

            <View style={{ marginTop: 50, alignItems: 'center' }}>
                <Button block light rounded iconLeft
                        onPress={ onPostSignIn }>
                    <Icon name='log-in-outline' />
                    <Text>Login</Text>
                </Button>
                <Button block danger rounded bordered iconLeft style={{ marginTop: 10 }}>
                    <Icon name='logo-google' />
                    <Text>Log in with Google</Text>
                </Button>
                <Button block info rounded bordered iconLeft style={{ marginTop: 10 }}>
                    <Icon name='logo-facebook' />
                    <Text>Log in with Facebook</Text>
                </Button>
                <Text style={{ marginTop: 30 }}>
                    Vous n'avez pas de compte ?
                </Text>
                <HyperLink onPress={ () => { setSignIn(false) } }>Créez-en un</HyperLink>
            </View>
        </View>
    );
};

const SignUp = ({ setSignIn, onPostSignUp }) => {

    return (
        <View>
            <Form>
                <Item>
                    <Icon active name='person-circle-outline' />
                    <Input placeholder='Email' />
                </Item>
                <Item style={{ marginTop: 10 }}>
                    <Icon active name='key-outline' />
                    <Input placeholder='Password' />
                </Item>
            </Form>

            <View style={{ marginTop: 50, alignItems: 'center' }}>
                <Button block light rounded iconLeft
                        onPress={ onPostSignUp }>
                    <Icon name='log-in-outline' />
                    <Text>Sign Up</Text>
                </Button>
                <Text style={{ marginTop: 30 }}>
                    Vous avez déjà un compte ?
                </Text>
                <HyperLink onPress={ () => { setSignIn(true) } }>Connectez-vous !</HyperLink>
            </View>
        </View>
    );
};

export default AuthScreen;