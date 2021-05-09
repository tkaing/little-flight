import React from "react";
import {Text} from "native-base";

const HyperLink = ({ children, style, onPress }) => {

    return (
        <Text style={{ ...style, fontWeight: 'bold', color: '#62B1F6' }}
              onPress={ onPress }>{ children }</Text>
    );
};

export default HyperLink;