/*
Différentes routes de l'application
*/

const forFade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress
    }
});

const fpv = {
    name: 'fpv',
    options: {
        title: 'My FPV Screen',
        cardStyleInterpolator: forFade
    }
};

const auth = {
    name: 'auth',
    options: {
        headerShown: false,
        cardStyleInterpolator: forFade
    }
};

const home = {
    name: 'home',
    options: {
        title: 'My Home',
        headerShown: false,
        cardStyleInterpolator: forFade
    }
};

export {
    fpv,
    auth,
    home,
};
