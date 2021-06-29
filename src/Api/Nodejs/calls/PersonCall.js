import { API_URL } from '../../Parameters';

const uri = `${ API_URL }/person`;

export default {
    sign_in: () => `${ uri }/sign_in`,
    sign_up: () => `${ uri }/sign_up`,
    find_by_token: () => `${ uri }/fetch/token`,
    sign_in_with_google: (access_token) => `${ uri }/sign_in_with_google?access_token=${ access_token }`,
    // === Friend ===
    add_friend: () => `${ uri }/add_friend`,
    accept_friend: (friendId) => `${ uri }/accept_friend/${ friendId }`,
    reject_friend: (friendId) => `${ uri }/reject_friend/${ friendId }`,
    list_of_friends: () => `${ uri }/list_of_friends`,
}
