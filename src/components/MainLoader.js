import React from 'react';
import AnimatedLoader from "react-native-animated-loader";

const MainLoader = () => {

    return (
        <AnimatedLoader
            visible={ true }
            overlayColor="rgba(0,0,0,0.7)"
            source={ require("./../../assets/lottie/39655-loader-preloader-animation.json") }
            animationStyle={{ height: 250 }}
            speed={ 1 }
        />
    );
};

export default MainLoader;