const baseUrl = 'https://www.googleapis.com/oauth2/v3';

const person = {
    get_info: (accessToken) => `${ baseUrl }/userinfo?access_token=${ accessToken }`
};

export { baseUrl, person };