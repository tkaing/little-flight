import { API_URL } from '../../Parameters';

const uri = `${ API_URL }/report`;

export default {
    open: () => `${ uri }/open`,
    list: () => `${ uri }/list`,
}
