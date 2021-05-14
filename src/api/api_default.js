//const baseUrl = 'http://192.168.1.42:3000';
const baseUrl = 'http://192.168.10.2:3000';

const droneUrl = `${ baseUrl }/drone`;
const personUrl = `${ baseUrl }/person`;

const drone = {
    land: () => `${ droneUrl }/land`,
    takeoff: () => `${ droneUrl }/takeoff`,
    command: () => `${ droneUrl }/command`
};

const person = {
    sign_in: () => `${ personUrl }/sign_in`,
    sign_up: () => `${ personUrl }/sign_up`,
    find_by_token: () => `${ personUrl }/fetch/token`,
    sign_in_with_google: (access_token) => `${ personUrl }/sign_in_with_google?access_token=${ access_token }`
};

export { baseUrl, person, drone };