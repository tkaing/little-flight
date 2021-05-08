const forFade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress
    }
});

const FpvRoute = {
    name: 'fpv',
    options: {
        title: 'My Fpv',
        cardStyleInterpolator: forFade
    }
};

const AuthRoute = {
    name: 'auth',
    options: {
        headerShown: false,
        cardStyleInterpolator: forFade
    }
};

const HomeRoute = {
    name: 'home',
    options: {
        title: 'My Home',
        headerShown: false,
        cardStyleInterpolator: forFade
    }
};

export {
    FpvRoute,
    AuthRoute,
    HomeRoute,
};