import { API_URL } from '../../Parameters';

const uri = `${ API_URL }/drony`;

export default {
    send_to_friend: () => `${ uri }/send_to_friend/:id`,
    buy: () => `${ uri }/buy`,
}