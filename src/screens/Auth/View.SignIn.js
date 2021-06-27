import React from 'react';

import { Formik } from "formik";
import { Footer } from "../Auth";
import { FormControl, Icon, Input } from "native-base";

import * as app_common from "../../App/Common";

import { on, schema } from "./../../tools";

const SignIn = (
    {
        state: {
            toast,
            appUser, setAppUser,
            loading, setLoading,
            isSignIn, setSignIn,
            googlePromptAsync,
        }
    }
) => {

    return (
        <Formik
            onSubmit={ values => on.auth.signInSubmit(values, {
                toast,
                appUser, setAppUser,
                loading, setLoading,
            }) }
            initialValues={{ email: "", password: "" }}
            validationSchema={ schema.signInForm }>

            { ({
                   errors,
                   values,
                   handleBlur,
                   handleChange,
                   handleSubmit,
            }) => (

                <>

                    <FormControl isRequired isInvalid={ 'email' in errors }>
                        <Input placeholder='Email'
                               keyboardType='email-address'
                               value={ values.email }
                               onBlur={ handleBlur('email') }
                               onChangeText={ handleChange('email') }
                               InputLeftElement={
                                   <Icon { ...app_common.Icon.forInput } name='at-outline' />
                               }
                        />
                        <FormControl.ErrorMessage>
                            { errors.email }
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={ 'password' in errors } style={[ { marginTop: 20 } ]}>
                        <Input placeholder='Password'
                               secureTextEntry
                               value={ values.password }
                               onBlur={ handleBlur('password') }
                               onChangeText={ handleChange('password') }
                               InputLeftElement={
                                   <Icon { ...app_common.Icon.forInput } name='key-outline' />
                               }
                        />
                        <FormControl.ErrorMessage>
                            { errors.password }
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <Footer
                        text="Vous n'avez pas de compte ?"
                        link="Créez un compte !"
                        button={{ icon: 'log-in-outline', text: 'Login' }}
                        setLoading={ setLoading }
                        onLinkPress={ () => setSignIn(false) }
                        handleSubmit={ handleSubmit }
                        googleConnect={{ signIn: () => on.auth.signInWithGoogle(googlePromptAsync) }} />

                </>
            )}
        </Formik>
    );
};

export default SignIn
