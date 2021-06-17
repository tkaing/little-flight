import { API_URL } from '../../Parameters';

const uri = `${ API_URL }/person`;

export default {
    sign_in: () => `${ uri }/sign_in`,
    sign_up: () => `${ uri }/sign_up`,
    find_by_token: () => `${ uri }/fetch/token`,
    sign_in_with_google: (access_token) => `${ uri }/sign_in_with_google?access_token=${ access_token }`
}
