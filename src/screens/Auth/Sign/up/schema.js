import * as Yup from "yup";

export default Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(4, 'Too Short!').required('Required'),
    username: Yup.string().required('Required'),
})
