import React from 'react';

import axios from "axios";
import * as Yup from "yup";
import * as SecureStore from "expo-secure-store";
import { Formik } from "formik";
import AuthFooter from "./AuthFooter";
import { Form, Icon, Input, Item, View } from "native-base";

import * as app_form from "../../app/utils/app_form";
import * as api_default from "../../api/api_default";
import * as api_secure_store from "../../api/api_secure_store";

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
                }, { timeout: 5000 });
                const apiToken = apiResponse.data.jwt;
                await SecureStore.setItemAsync(api_secure_store.TOKEN, apiToken);
                setLoading(false);
                loadCurrentUser();
            } catch (failure) {
                if (failure.code === 'ECONNABORTED') {
                    // timeout
                    app_form.showToast(`Unable to connect to Api.`);
                } else if (failure.response) {
                    // an error response (5xx, 4xx)
                    const apiResponse = failure.response;
                    console.log(apiResponse.data);
                } else {
                    // anything else
                    app_form.showToast('Login failed.');
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
                            <Input placeholder='Password'
                                   secureTextEntry
                                   value={ values.password }
                                   onBlur={ handleBlur('password') }
                                   onChangeText={ handleChange('password') } />
                            { app_form.showDangerText(touched, errors, 'password') }
                        </Item>
                    </Form>
                    <AuthFooter
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

const schema = {
    SignIn: Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(4, 'Too Short!').required('Required'),
    })
};

const styles = {
    formItem: { marginTop: 10 },
    formWrapper: { width: 270 }
};

export default SignIn;
