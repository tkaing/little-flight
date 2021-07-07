import { API_URL } from '../../Parameters';

const uri = `${ API_URL }/drony`;

export default {
    send_to_friend: (friendId) => `${ uri }/send_to_friend/${ friendId }`,
    buy: () => `${ uri }/buy`,
}
