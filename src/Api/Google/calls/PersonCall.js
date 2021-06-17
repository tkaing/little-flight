import { API_GOOGLE as uri } from '../../Parameters';

export default {
    get_info: (accessToken) => `${ uri }/userinfo?access_token=${ accessToken }`
}
