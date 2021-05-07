import React, {useEffect, useState} from "react";
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

    const Handling = {
        redirectToHome: () => navigation.navigate(HomeRoute.name),
        signInWithGoogle: () => googlePromptAsync()
    };

    useEffect(() => {
        if (currentUser)
            Handling.redirectToHome();
    }, []);

    useEffect(() => {
        if (currentUser)
            Handling.redirectToHome();
    }, [currentUser]);

    useEffect(() => {
        return navigation.addListener('focus', () => {
            if (currentUser)
                Handling.redirectToHome();
        });
    }, [navigation]);

    return (
        <Container>
            <Content style={{ flexDirection: 'column' }}
                     padder
                     contentContainerStyle={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                { isSignIn &&
                    <SignIn setSignIn={ setSignIn }
                            setLoading={ setLoading }
                            loadCurrentUser={ loadCurrentUser }
                            signInWithGoogle={ Handling.signInWithGoogle } />
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

    const Handling = {
        showToast: (message) => {
            Toast.show({
                text: message,
                type: 'danger',
                duration: 10000
            });
        },
        signIn: async ({ email, password }) => {
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
                    Handling.showToast(apiResponse.data);
                } else if (failure.request) {
                    // client never received a response, or request never left
                    const apiRequest = failure.request;
                    Handling.showToast('Login failed');
                    console.log(apiRequest);
                } else {
                    // anything else
                    Handling.showToast('Login failed');
                }
                setLoading(false);
            }
        }
    };

    return (
        <Formik
            validationSchema={ SignInSchema }
            initialValues={{
                email: "",
                password: ""
            }}
            onSubmit={ (values => Handling.signIn(values)) }>
            { ({ errors, touched, handleBlur, handleChange, handleSubmit, values }) => (
                <View style={{ width: 270 }}>
                    <Form>
                        <Item error={ (touched.email && errors.email) !== undefined }>
                            <Icon active name='at-outline' />
                            <Input placeholder='Email'
                                   keyboardType='email-address'
                                   value={ values.email }
                                   onBlur={ handleBlur('email') }
                                   onChangeText={ handleChange('email') } />
                            { touched.email && errors.email &&
                                <ErrorMessage>{ errors.email }</ErrorMessage>
                            }
                        </Item>
                        <Item error={ (touched.password && errors.password) !== undefined } style={{ marginTop: 10 }}>
                            <Icon active name='key-outline' />
                            <Input placeholder='Password'
                                   secureTextEntry
                                   value={ values.password }
                                   onBlur={ handleBlur('password') }
                                   onChangeText={ handleChange('password') } />
                            { touched.password && errors.password &&
                                <ErrorMessage>{ errors.password }</ErrorMessage>
                            }
                        </Item>
                    </Form>
                    <View style={{ marginTop: 50, alignItems: 'center' }}>

                        <Button block info rounded iconLeft
                                onPress={ handleSubmit }>
                            <Icon name='log-in-outline' />
                            <Text>Login</Text>
                        </Button>

                        <GoogleConnect style={{ marginTop: 10 }}
                                       setLoading={ setLoading }
                                       signInWithGoogle={ signInWithGoogle } />

                        <FacebookConnect style={{ marginTop: 10 }}
                                         setLoading={ setLoading } />

                        <Text style={{ marginTop: 30 }}>
                            Vous n'avez pas de compte ?
                        </Text>
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

    const Handling = {
        signUp: async ({ email, password, username }) => {
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
                    Handling.showToast(apiResponse.data);
                } else if (failure.request) {
                    // client never received a response, or request never left
                    const apiRequest = failure.request;
                    Handling.showToast('Sign Up failed');
                    console.log(apiRequest);
                } else {
                    // anything else
                    Handling.showToast('Sign Up failed');
                }
                setLoading(false);
            }
        }
    };

    return (
        <Formik
            validationSchema={ SignUpSchema }
            initialValues={{ email: "", password: "", username: "" }}
            onSubmit={ (values => Handling.signUp(values)) }>
            { ({ errors, touched, handleBlur, handleChange, handleSubmit, values }) => (
                <View style={{ width: 270 }}>
                    <Form>
                        <Item error={ (touched.email && errors.email) !== undefined }>
                            <Icon active name='at-outline' />
                            <Input placeholder='Email'
                                   keyboardType='email-address'
                                   value={ values.email }
                                   onBlur={ handleBlur('email') }
                                   onChangeText={ handleChange('email') } />
                            { touched.email && errors.email &&
                                <ErrorMessage>{ errors.email }</ErrorMessage>
                            }
                        </Item>
                        <Item error={ (touched.password && errors.password) !== undefined } style={{ marginTop: 10 }}>
                            <Icon active name='key-outline' />
                            <Input placeholder='Password'
                                   secureTextEntry
                                   value={ values.password }
                                   onBlur={ handleBlur('password') }
                                   onChangeText={ handleChange('password') } />
                            { touched.password && errors.password &&
                                <ErrorMessage>{ errors.password }</ErrorMessage>
                            }
                        </Item>
                        <Item error={ (touched.username && errors.username) !== undefined } style={{ marginTop: 10 }}>
                            <Icon active name='language-outline' />
                            <Input placeholder='Pseudonym'
                                   value={ values.username }
                                   onBlur={ handleBlur('username') }
                                   onChangeText={ handleChange('username') } />
                            { touched.username && errors.username &&
                                <ErrorMessage>{ errors.username }</ErrorMessage>
                            }
                        </Item>
                    </Form>

                    <View style={{ marginTop: 50, alignItems: 'center' }}>

                        <Button block info rounded iconLeft
                                onPress={ handleSubmit }>
                            <Icon name='log-in-outline' />
                            <Text>Sign Up</Text>
                        </Button>

                        <Text style={{ marginTop: 30 }}>
                            Vous avez déjà un compte ?
                        </Text>

                        <HyperLink onPress={ () => { setSignIn(true) } }>Connectez-vous !</HyperLink>
                    </View>
                </View>
            )}
        </Formik>
    );
};

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(4, 'Too Short!').required('Required'),
});

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(4, 'Too Short!').required('Required'),
    username: Yup.string().required('Required'),
});

export default AuthScreen;