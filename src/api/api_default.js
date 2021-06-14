const baseUrl = 'http://10.33.1.205:3000';

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