import { API_URL } from '../../Parameters';

const uri = `${ API_URL }/session`;

export default {
    import: () => `${ uri }/import`,
    list_by_token: () => `${ uri }/list/token`
}
