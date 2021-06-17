import React from 'react';

import { Formik } from "formik";
import { Footer } from "../Auth";
import { styles, _up } from "./Sign";
import { Form, Icon, Input, Item, View } from "native-base";

import * as app_form from "../../App/Form";

const SignUp = (
    { setLoading, setSignIn, loadCurrentUser }
) => {

    const { on, schema } = _up;

    return (
        <Formik
            onSubmit={
                values => on.submit(values, {
                    setLoading,
                    loadCurrentUser
                })
            }
            initialValues={{ email: "", password: "", username: "" }}
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
                            <Input value={ values.password }
                                   onBlur={ handleBlur('password') }
                                   placeholder='Password'
                                   onChangeText={ handleChange('password') }
                                   secureTextEntry />
                            { app_form.display_error(touched, errors, 'password') }
                        </Item>
                        <Item error={ app_form.is_not_valid(touched, errors, 'username') } style={[ styles.formItem ]}>
                            <Icon active name='language-outline' />
                            <Input value={ values.username }
                                   onBlur={ handleBlur('username') }
                                   placeholder='Pseudonym'
                                   onChangeText={ handleChange('username') } />
                            { app_form.display_error(touched, errors, 'username') }
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

export default SignUp
