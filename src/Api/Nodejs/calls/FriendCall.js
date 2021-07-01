import { API_URL } from '../../Parameters';

const uri = `${ API_URL }/friend`;

export default {
    add: () => `${ uri }/add`,
    list: () => `${ uri }/list`,
    accept: (_id) => `${ uri }/accept/${ _id }`,
    reject: (_id) => `${ uri }/reject/${ _id }`,
}
