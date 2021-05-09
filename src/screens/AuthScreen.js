import React, { useEffect, useState } from "react";

import axios from "axios";
import * as Yup from 'yup';
import { Formik } from 'formik';
import * as SecureStore from "expo-secure-store";
import { lockAsync, OrientationLock } from "expo-screen-orientation";
import { Button, Container, Content, Icon, Form, Input, Item, Text, View, Toast } from "native-base";

import HyperLink from "../components/core/HyperLink";
import MainLoader from "../components/core/MainLoader";
import ErrorMessage from "../components/core/ErrorMessage";
import GoogleConnect from "../components/GoogleConnect";
import FacebookConnect from "../components/FacebookConnect";

import { HomeRoute } from '../app/app_route';
import * as api_default from './../api/api_default';
import * as api_secure_store from "../api/api_secure_store";

const AuthScreen = (
    {
        loading,
        setLoading,
        navigation,
        currentUser,
        loadCurrentUser,
        googlePromptAsync
    }
) => {

    const [isSignIn, setSignIn] = useState(true);

    const on = {
        RedirectToHome: () => navigation.navigate(HomeRoute.name),
        SignInWithGoogle: () => googlePromptAsync()
    };

    useEffect(() => {
        if (currentUser)
            on.RedirectToHome();
        lockAsync(OrientationLock.PORTRAIT);
    }, []);

    useEffect(() => {
        return navigation.addListener('focus', () => {
            if (currentUser)
                on.RedirectToHome();
            lockAsync(OrientationLock.PORTRAIT);
        });
    }, [navigation]);

    useEffect(() => {
        if (currentUser)
            on.RedirectToHome();
    }, [currentUser]);

    return (
        <Container>
            <Content style={{ flexDirection: 'column' }}
                     padder
                     contentContainerStyle={{ ...styles.content }}>
                { isSignIn &&
                    <SignIn setSignIn={ setSignIn }
                            setLoading={ setLoading }
                            loadCurrentUser={ loadCurrentUser }
                            signInWithGoogle={ on.SignInWithGoogle } />
                }
                { !isSignIn &&
                    <SignUp setSignIn={ setSignIn }
                            setLoading={ setLoading }
                            loadCurrentUser={ loadCurrentUser } />
                }
                { loading && <MainLoader /> }
            </Content>
        </Container>
    );
};

const SignIn = (
    { setLoading, setSignIn, signInWithGoogle, loadCurrentUser }
) => {

    const on = {
        SignIn: async ({ email, password }) => {
            try {
                setLoading(true);
                const apiResponse = await axios.post(api_default.person.sign_in(), {
                    email: email,
                    password: password,
                });
                const apiToken = apiResponse.data.jwt;
                await SecureStore.setItemAsync(api_secure_store.TOKEN, apiToken);
                setLoading(false);
                loadCurrentUser();
            } catch (failure) {
                if (failure.response) {
                    // client received an error response (5xx, 4xx)
                    const apiResponse = failure.response;
                    _showToast(apiResponse.data);
                } else if (failure.request) {
                    // client never received a response, or request never left
                    const apiRequest = failure.request;
                    _showToast('Login failed');
                    console.log(apiRequest);
                } else {
                    // anything else
                    _showToast('Login failed');
                }
                setLoading(false);
            }
        }
    };

    return (
        <Formik
            onSubmit={ (values => on.SignIn(values)) }
            initialValues={{ email: "", password: "" }}
            validationSchema={ schema.SignIn }>

            { ({ errors, touched, values, handleBlur, handleChange, handleSubmit }) => (
                <View style={{ ...styles.formWrapper }}>
                    <Form>
                        <Item error={ _isNotValid(touched, errors, 'email') }>
                            <Icon active name='at-outline' />
                            <Input placeholder='Email'
                                   keyboardType='email-address'
                                   value={ values.email }
                                   onBlur={ handleBlur('email') }
                                   onChangeText={ handleChange('email') } />
                            { _showDangerText(touched, errors, 'email') }
                        </Item>
                        <Item error={ _isNotValid(touched, errors, 'password') } style={{ ...styles.formItem }}>
                            <Icon active name='key-outline' />
                            <Input placeholder='Password'
                                   secureTextEntry
                                   value={ values.password }
                                   onBlur={ handleBlur('password') }
                                   onChangeText={ handleChange('password') } />
                            { _showDangerText(touched, errors, 'password') }
                        </Item>
                    </Form>
                    <Footer
                        text="Vous n'avez pas de compte ?"
                        link="Créez un compte !"
                        button={{ icon: 'log-in-outline', text: 'Login' }}
                        setLoading={ setLoading }
                        onLinkPress={ () => setSignIn(false) }
                        handleSubmit={ handleSubmit }
                        googleConnect={{ signIn: signInWithGoogle }} />
                </View>
            )}
        </Formik>
    );
};

const SignUp = (
    { setLoading, setSignIn, loadCurrentUser }
) => {

    const on = {
        SignUp: async ({ email, password, username }) => {
            try {
                setLoading(true);
                const apiResponse = await axios.post(api_default.person.sign_up(), {
                    email: email,
                    password: password,
                    username: username,
                });
                const apiToken = apiResponse.data.jwt;
                await SecureStore.setItemAsync(api_secure_store.TOKEN, apiToken);
                setLoading(false);
                loadCurrentUser();
            } catch (failure) {
                if (failure.response) {
                    // client received an error response (5xx, 4xx)
                    const apiResponse = failure.response;
                    _showToast(apiResponse.data);
                } else if (failure.request) {
                    // client never received a response, or request never left
                    const apiRequest = failure.request;
                    _showToast('Sign Up failed');
                    console.log(apiRequest);
                } else {
                    // anything else
                    _showToast('Sign Up failed');
                }
                setLoading(false);
            }
        }
    };

    return (
        <Formik
            onSubmit={ (values => on.SignUp(values)) }
            initialValues={{ email: "", password: "", username: "" }}
            validationSchema={ schema.SignUp }>

            { ({ errors, touched, values, handleBlur, handleChange, handleSubmit }) => (
                <View style={{ ...styles.formWrapper }}>
                    <Form>
                        <Item error={ _isNotValid(touched, errors, 'email') }>
                            <Icon active name='at-outline' />
                            <Input placeholder='Email'
                                   keyboardType='email-address'
                                   value={ values.email }
                                   onBlur={ handleBlur('email') }
                                   onChangeText={ handleChange('email') } />
                            { _showDangerText(touched, errors, 'email') }
                        </Item>
                        <Item error={ _isNotValid(touched, errors, 'password') } style={{ ...styles.formItem }}>
                            <Icon active name='key-outline' />
                            <Input value={ values.password }
                                   onBlur={ handleBlur('password') }
                                   placeholder='Password'
                                   onChangeText={ handleChange('password') }
                                   secureTextEntry />
                            { _showDangerText(touched, errors, 'password') }
                        </Item>
                        <Item error={ _isNotValid(touched, errors, 'username') } style={{ ...styles.formItem }}>
                            <Icon active name='language-outline' />
                            <Input value={ values.username }
                                   onBlur={ handleBlur('username') }
                                   placeholder='Pseudonym'
                                   onChangeText={ handleChange('username') } />
                            { _showDangerText(touched, errors, 'username') }
                        </Item>
                    </Form>
                    <Footer
                        text="Vous avez déjà un compte ?"
                        link="Connectez-vous !"
                        button={{ icon: 'log-in-outline', text: 'Sign Up' }}
                        setLoading={ setLoading }
                        onLinkPress={ () => setSignIn(true) }
                        handleSubmit={ handleSubmit } />
                </View>
            )}
        </Formik>
    );
};

const Footer = (
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

const _showToast = (message) => {
    Toast.show({
        text: message,
        type: 'danger',
        duration: 10000
    });
};

const _isNotValid = (touched, errors, property) => {
    return (touched[property] && errors[property]) !== undefined;
}

const _showDangerText = (touched, errors, property) => {
    return _isNotValid(touched, errors, property) ? <ErrorMessage>{ errors[property] }</ErrorMessage> : "";
};

const schema = {
    SignIn: Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(4, 'Too Short!').required('Required'),
    }),
    SignUp: Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(4, 'Too Short!').required('Required'),
        username: Yup.string().required('Required'),
    })
};

const styles = {
    // Screen
    content: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    // Form
    formItem: { marginTop: 10 },
    formWrapper: { width: 270 },
    // Footer
    footer: {
        marginTop: 50,
        alignItems: 'center'
    },
    footerText: { marginTop: 30 },
    footerLink: { marginTop: 10 },
    footerConnect: { marginTop: 10 },
};

export default AuthScreen;