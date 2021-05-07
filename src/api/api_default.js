const baseUrl = 'http://192.168.1.42:3000';

const person = {
    sign_in: () => `${ baseUrl }/persons/sign_in`,
    sign_up: () => `${ baseUrl }/persons/sign_up`,
    find_by_token: () => `${ baseUrl }/persons/fetch/token`,
    sign_in_with_google: (access_token) => `${ baseUrl }/persons/sign_in_with_google?access_token=${ access_token }`
};

export { baseUrl, person };