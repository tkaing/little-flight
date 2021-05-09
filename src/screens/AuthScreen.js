import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from 'yup';
import HyperLink from "../components/HyperLink";
import { Formik } from 'formik';
import MainLoader from "../components/MainLoader";
import ErrorMessage from "../components/ErrorMessage";
import { HomeRoute } from '../app/app_route';
import GoogleConnect from "../components/GoogleConnect";
import FacebookConnect from "../components/FacebookConnect";
import * as SecureStore from "expo-secure-store";
import { lockAsync, OrientationLock } from "expo-screen-orientation";
import { Button, Container, Content, Icon, Form, Input, Item, Text, View, Toast } from "native-base";

import * as api_default from './../api/api_default';
import * as api_secure_store from "../api/api_secure_store";

const AuthScreen = (
    {
        navigation,
        googlePromptAsync,
        loading,
        setLoading,
        currentUser,
        loadCurrentUser
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
                     contentContainerStyle={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
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
    { setLoading, setSignIn, loadCurrentUser, signInWithGoogle }
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
                    showToast(apiResponse.data);
                } else if (failure.request) {
                    // client never received a response, or request never left
                    const apiRequest = failure.request;
                    showToast('Login failed');
                    console.log(apiRequest);
                } else {
                    // anything else
                    showToast('Login failed');
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
                <View style={{ width: 270 }}>
                    <Form>
                        <Item error={ hasError(touched, errors, 'email') }>
                            <Icon active name='at-outline' />
                            <Input placeholder='Email'
                                   keyboardType='email-address'
                                   value={ values.email }
                                   onBlur={ handleBlur('email') }
                                   onChangeText={ handleChange('email') } />
                            { dangerMessage(touched, errors, 'email') }
                        </Item>
                        <Item error={ hasError(touched, errors, 'password') } style={{ marginTop: 10 }}>
                            <Icon active name='key-outline' />
                            <Input placeholder='Password'
                                   secureTextEntry
                                   value={ values.password }
                                   onBlur={ handleBlur('password') }
                                   onChangeText={ handleChange('password') } />
                            { dangerMessage(touched, errors, 'password') }
                        </Item>
                    </Form>
                    <View style={{ marginTop: 50, alignItems: 'center' }}>

                        <Button block info rounded iconLeft
                                onPress={ handleSubmit }>
                            <Icon name='log-in-outline' /><Text>Login</Text>
                        </Button>

                        <GoogleConnect style={{ marginTop: 10 }}
                                       setLoading={ setLoading }
                                       signInWithGoogle={ signInWithGoogle } />

                        <FacebookConnect style={{ marginTop: 10 }}
                                         setLoading={ setLoading } />

                        <Text style={{ marginTop: 30 }}>Vous n'avez pas de compte ?</Text>

                        <HyperLink onPress={ () => { setSignIn(false) } }>Créez-en un</HyperLink>
                    </View>
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
                    showToast(apiResponse.data);
                } else if (failure.request) {
                    // client never received a response, or request never left
                    const apiRequest = failure.request;
                    showToast('Sign Up failed');
                    console.log(apiRequest);
                } else {
                    // anything else
                    showToast('Sign Up failed');
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
                <View style={{ width: 270 }}>
                    <Form>
                        <Item error={ hasError(touched, errors, 'email') }>
                            <Icon active name='at-outline' />
                            <Input placeholder='Email'
                                   keyboardType='email-address'
                                   value={ values.email }
                                   onBlur={ handleBlur('email') }
                                   onChangeText={ handleChange('email') } />
                            { dangerMessage(touched, errors, 'email') }
                        </Item>
                        <Item error={ hasError(touched, errors, 'password') } style={{ marginTop: 10 }}>
                            <Icon active name='key-outline' />
                            <Input value={ values.password }
                                   onBlur={ handleBlur('password') }
                                   placeholder='Password'
                                   onChangeText={ handleChange('password') }
                                   secureTextEntry />
                            { dangerMessage(touched, errors, 'password') }
                        </Item>
                        <Item error={ hasError(touched, errors, 'username') } style={{ marginTop: 10 }}>
                            <Icon active name='language-outline' />
                            <Input value={ values.username }
                                   onBlur={ handleBlur('username') }
                                   placeholder='Pseudonym'
                                   onChangeText={ handleChange('username') } />
                            { dangerMessage(touched, errors, 'username') }
                        </Item>
                    </Form>
                    <View style={{ marginTop: 50, alignItems: 'center' }}>

                        <Button block info rounded iconLeft
                                onPress={ handleSubmit }>
                            <Icon name='log-in-outline' /><Text>Sign Up</Text>
                        </Button>

                        <Text style={{ marginTop: 30 }}>Vous avez déjà un compte ?</Text>

                        <HyperLink onPress={ () => { setSignIn(true) } }>Connectez-vous !</HyperLink>
                    </View>
                </View>
            )}
        </Formik>
    );
};

const styles = {};

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

const hasError = (touched, errors, property) => {
    return (touched[property] && errors[property]) !== undefined;
}

const showToast = (message) => {
    Toast.show({
        text: message,
        type: 'danger',
        duration: 10000
    });
};

const dangerMessage = (touched, errors, property) => {
    return hasError(touched, errors, property) ? <ErrorMessage>{ errors[property] }</ErrorMessage> : "";
};

export default AuthScreen;