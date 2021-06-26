import * as Yup from "yup";

export default {
    signInForm: Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(4, 'Too Short!').required('Required'),
    }),
    signUpForm: Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(4, 'Too Short!').required('Required'),
        username: Yup.string().required('Required'),
    })
}
