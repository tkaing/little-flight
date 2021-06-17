import React from 'react';

import { Formik } from "formik";
import { Footer } from "../Auth";
import { styles, _in } from "./Sign";
import { Form, Icon, Input, Item, View } from "native-base";

import * as app_form from "../../App/Form";

const SignIn = (
    { setLoading, setSignIn, loadCurrentUser,
        signInWithGoogle }
) => {

    const { on, schema } = _in;

    return (
        <Formik
            onSubmit={
                values => on.submit(values, {
                    setLoading,
                    loadCurrentUser
                })
            }
            initialValues={{ email: "", password: "" }}
            validationSchema={ schema }>

            { ({ errors, touched, values,
                   handleBlur, handleChange, handleSubmit }) => (

                <View style={[ styles.formWrapper ]}>

                    <Form>
                        <Item error={ app_form.is_not_valid(touched, errors, 'email') }>
                            <Icon active name='at-outline' />
                            <Input placeholder='Email'
                                   keyboardType='email-address'
                                   value={ values.email }
                                   onBlur={ handleBlur('email') }
                                   onChangeText={ handleChange('email') } />
                            { app_form.display_error(touched, errors, 'email') }
                        </Item>
                        <Item error={ app_form.is_not_valid(touched, errors, 'password') } style={[ styles.formItem ]}>
                            <Icon active name='key-outline' />
                            <Input placeholder='Password'
                                   secureTextEntry
                                   value={ values.password }
                                   onBlur={ handleBlur('password') }
                                   onChangeText={ handleChange('password') } />
                            { app_form.display_error(touched, errors, 'password') }
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

export default SignIn
