import { API_URL } from '../../Parameters';

const uri = `${ API_URL }/report`;

export default {
    open: () => `${ uri }/open`,
    list: () => `${ uri }/list`,
    find_by_token: () => `${ uri }/fetch/token`,
    sign_in_with_google: (access_token) => `${ uri }/sign_in_with_google?access_token=${ access_token }`
}
