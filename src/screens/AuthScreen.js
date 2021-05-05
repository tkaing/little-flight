import React, { useState } from "react";
import axios from "axios";
import * as Yup from 'yup';
import HyperLink from "../components/HyperLink";
import { Formik } from 'formik';
import ErrorMessage from "../components/ErrorMessage";
import { HomeRoute } from '../app/app_route';
import GoogleConnect from "../components/GoogleConnect";
import AnimatedLoader from "react-native-animated-loader";
import * as api_default from './../api/api_default';
import { Button, Container, Content, Icon, Form, Input, Item, Text, View } from "native-base";
import TwitchConnect from "../components/TwitchConnect";

const AuthScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    const [isSignIn, setSignIn] = useState(true);

    const Handling = {
        postSign: () => navigation.navigate(HomeRoute.name)
    };

    return (
        <Container>
            <Content style={{ flexDirection: 'column' }}
                     padder
                     contentContainerStyle={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                { isSignIn &&
                    <SignIn loading={ loading }
                            setSignIn={ setSignIn }
                            setLoading={ setLoading }
                            onPostSignIn={ Handling.postSign } />
                }
                { !isSignIn &&
                    <SignUp loading={ loading }
                            setSignIn={ setSignIn }
                            setLoading={ setLoading }
                            onPostSignUp={ Handling.postSign } />
                }
                { loading &&
                    <AnimatedLoader
                        visible={ true }
                        overlayColor="rgba(0,0,0,0.7)"
                        source={ require("./../../assets/lottie/39655-loader-preloader-animation.json") }
                        animationStyle={{ height: 250 }}
                        speed={ 1 }
                    />
                }
            </Content>
        </Container>
    );
};

const SignIn = ({ setLoading, setSignIn, onPostSignIn }) => {

    return (
        <Formik
            validationSchema={ SignInSchema }
            initialValues={{
                email: "",
                password: ""
            }}
            onSubmit={ ((values) => {

            }) }>
            { ({ errors, touched, handleBlur, handleChange, handleSubmit, values }) => (
                <View>
                    <Form>
                        <Item error={ (touched.email && errors.email) !== undefined }>
                            <Icon active name='person-circle-outline' />
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

                        <GoogleConnect style={{ marginTop: 10 }} setLoading={ setLoading } />

                        <TwitchConnect style={{ marginTop: 10 }} setLoading={ setLoading } />

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

const SignUp = ({ setLoading, setSignIn, onPostSignUp }) => {

    const Api = {
        signUp: ({ email, password }) => {
            setLoading(true);
            axios.post(api_default.persons.sign_up, {
                email: email,
                username: email,
                password: password
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((failure) => {
                    const response = failure.response;
                    if (response) {
                        const { message, errors } = response.data;
                        console.log(message, errors);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <Formik
            validationSchema={ SignUpSchema }
            initialValues={{ email: "", password: "" }}
            onSubmit={ (values => Api.signUp(values)) }>
            { ({ errors, touched, handleBlur, handleChange, handleSubmit, values }) => (
                <View>
                    <Form>
                        <Item error={ (touched.email && errors.email) !== undefined }>
                            <Icon active name='person-circle-outline' />
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
    password: Yup.string().min(6, 'Too Short!').required('Required'),
});

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Too Short!').required('Required'),
});

export default AuthScreen;