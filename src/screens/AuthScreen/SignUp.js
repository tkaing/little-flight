import React from 'react';

import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import AuthFooter from "./AuthFooter";
import * as SecureStore from "expo-secure-store";
import { Form, Icon, Input, Item, View } from "native-base";

import * as app_form from "../../app/utils/app_form";
import * as api_default from "../../api/api_default";
import * as api_secure_store from "../../api/api_secure_store";

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
                    app_form.showToast(apiResponse.data);
                } else if (failure.request) {
                    // client never received a response, or request never left
                    const apiRequest = failure.request;
                    app_form.showToast('Sign Up failed');
                    console.log(apiRequest);
                } else {
                    // anything else
                    app_form.showToast('Sign Up failed');
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
                        <Item error={ app_form.isNotValid(touched, errors, 'email') }>
                            <Icon active name='at-outline' />
                            <Input placeholder='Email'
                                   keyboardType='email-address'
                                   value={ values.email }
                                   onBlur={ handleBlur('email') }
                                   onChangeText={ handleChange('email') } />
                            { app_form.showDangerText(touched, errors, 'email') }
                        </Item>
                        <Item error={ app_form.isNotValid(touched, errors, 'password') } style={{ ...styles.formItem }}>
                            <Icon active name='key-outline' />
                            <Input value={ values.password }
                                   onBlur={ handleBlur('password') }
                                   placeholder='Password'
                                   onChangeText={ handleChange('password') }
                                   secureTextEntry />
                            { app_form.showDangerText(touched, errors, 'password') }
                        </Item>
                        <Item error={ app_form.isNotValid(touched, errors, 'username') } style={{ ...styles.formItem }}>
                            <Icon active name='language-outline' />
                            <Input value={ values.username }
                                   onBlur={ handleBlur('username') }
                                   placeholder='Pseudonym'
                                   onChangeText={ handleChange('username') } />
                            { app_form.showDangerText(touched, errors, 'username') }
                        </Item>
                    </Form>
                    <AuthFooter
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

const schema = {
    SignUp: Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(4, 'Too Short!').required('Required'),
        username: Yup.string().required('Required'),
    })
};

const styles = {
    formItem: { marginTop: 10 },
    formWrapper: { width: 270 }
};

export default SignUp;