import React from 'react';
import AnimatedLoader from "react-native-animated-loader";

const MainLoader = () => {

    return (
        <AnimatedLoader
            speed={ 1 }
            source={ require("../../assets/lottie/39655-loader-preloader-animation.json") }
            visible={ true }
            overlayColor="rgba(0,0,0,0.7)"
            animationStyle={{ height: 250 }}
        />
    );
};

export default MainLoader
