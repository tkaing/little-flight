import React, {useState} from "react";
import {Button, Container, Content, Icon, Form, Input, Item, Text, View} from "native-base";
import HyperLink from "../components/HyperLink";
import { HomeRoute } from '../app/app_route';
import * as firebase from 'firebase';
import * as api_firebase from './../api/api_firebase';
import ErrorMessage from "../components/ErrorMessage";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import * as api_default from './../api/api_default';
import AnimatedLoader from "react-native-animated-loader";
import * as Google from 'expo-auth-session/providers/google';
import Expo from 'expo';

const AuthScreen = ({ navigation }) => {

    const [isSignIn, setSignIn] = useState(true);

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '817789782056-2i4ju976pjcs7nl9qur39ov6anl6leum.apps.googleusercontent.com',
        androidClientId: '817789782056-50c858j1vr440iaoegqksn3442ql6ljr.apps.googleusercontent.com',
        //redirectUri: "com.tiryboy.littleflight:/oauthredirect"
    });

    React.useEffect(() => {
        console.log(request);
    }, [request, response]);

    const Handling = {
        postSign: () => navigation.navigate(HomeRoute.name),
        signInWithGoogleAsync: () => {
            console.log(request);
            promptAsync()
                .then((result) => console.log(result))
                .catch((failure) => console.log(failure));
        }
    };

    return (
        <Container>
            <Content style={{ flexDirection: 'column' }}
                     padder
                     contentContainerStyle={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                { isSignIn &&
                    <SignIn setSignIn={ setSignIn }
                            onPostSignIn={ Handling.postSign }
                            onGooglePress={ Handling.signInWithGoogleAsync }
                    />
                }
                { !isSignIn &&
                    <SignUp setSignIn={ setSignIn }
                            onPostSignUp={ Handling.postSign } />
                }
            </Content>
        </Container>
    );
};

const SignIn = ({ setSignIn, onPostSignIn, onGooglePress }) => {

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

                        <Button block light rounded iconLeft
                                onPress={ handleSubmit }>
                            <Icon name='log-in-outline' />
                            <Text>Login</Text>
                        </Button>

                        <Button block danger rounded bordered iconLeft style={{ marginTop: 10 }}
                                onPress={ () => onGooglePress() }>
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
            )}
        </Formik>
    );
};

const SignUp = ({ setSignIn, onPostSignUp }) => {

    const [loading, setLoading] = useState(false);

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
        },
        signInWithGoogle: () => {

        },
        signInWithFirebase: (token) => {
            firebase.auth().signInWithCustomToken(token)
                .then(({ user }) => {

                })
                .catch(({ code, message }) => {
                    console.log(code, message);
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
                        <Button block light rounded iconLeft
                                onPress={ handleSubmit }>
                            <Icon name='log-in-outline' />
                            <Text>Sign Up</Text>
                        </Button>
                        <Text style={{ marginTop: 30 }}>
                            Vous avez déjà un compte ?
                        </Text>
                        <HyperLink onPress={ () => { setSignIn(true) } }>Connectez-vous !</HyperLink>
                    </View>

                    {/*<AnimatedLoader
                        visible={ loading }
                        overlayColor="rgba(0,0,0,0.7)"
                        source={ require("./../../assets/lottie/39655-loader-preloader-animation.json") }
                        animationStyle={{ height: 250 }}
                        speed={ 1 }
                    />*/}
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