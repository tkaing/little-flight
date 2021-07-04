import React from 'react';

import { Formik } from "formik";
import { Footer } from "../Auth";
import { FormControl, Icon, Input } from "native-base";

import * as app_common from "../../App/Common";

import { on, schema } from "./../../tools";
import { translate } from "../../locale/local"

const SignUp = (
    {
        state: {
            toast,
            appUser, setAppUser,
            loading, setLoading,
            isSignIn, setSignIn,
        }
    }
) => {

    return (
        <Formik
            onSubmit={ values => on.auth.signUpSubmit(values, {
                toast,
                appUser, setAppUser,
                loading, setLoading,
            }) }
            initialValues={{ email: "", password: "", username: "" }}
            validationSchema={ schema.signUpForm }>

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
                        <Input value={ values.password }
                               onBlur={ handleBlur('password') }
                               placeholder='Password'
                               onChangeText={ handleChange('password') }
                               secureTextEntry
                               InputLeftElement={
                                   <Icon { ...app_common.Icon.forInput } name='key-outline' />
                               }
                        />
                        <FormControl.ErrorMessage>
                            { errors.password }
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={ 'username' in errors } style={[ { marginTop: 20 } ]}>
                        <Input value={ values.username }
                               onBlur={ handleBlur('username') }
                               placeholder='Pseudonym'
                               onChangeText={ handleChange('username') }
                               InputLeftElement={
                                   <Icon { ...app_common.Icon.forInput } name='language-outline' />
                               }
                        />
                        <FormControl.ErrorMessage>
                            { errors.username }
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <Footer
                        text={translate("ACCOUNT_ALREADY")}
                        link={translate("LOG_IN")}
                        button={{ icon: 'log-in-outline', text: 'Sign Up' }}
                        onLinkPress={ () => setSignIn(true) }
                        handleSubmit={ handleSubmit }
                        state={{
                            appUser, setAppUser,
                            loading, setLoading,
                        }}
                        />

                </>
            )}
        </Formik>
    );
};

export default SignUp
