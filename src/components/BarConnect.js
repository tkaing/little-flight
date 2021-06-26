import React from "react";
import { View, Thumbnail } from "native-base";

const BarConnect = ({ }) => {

    return (
        <View style={{width:"100%", justifyContent:"flex-end", paddingVertical:10, flexDirection:"row", backgroundColor:"white"}}>
            <Thumbnail
                source={require("../../assets/drone.png")}
            />
            <Thumbnail
                source={require("../../assets/wifi.png")}
            />
        </View>
    )
};

export default BarConnect
