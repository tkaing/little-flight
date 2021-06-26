import React, { useEffect, useState } from "react";
import styles from "../Styles.Remote";

import { Icon, View } from "native-base";
import { TouchableHighlight } from "react-native";

const Box = (
    { options, leftOptions, rightOptions }
) => {

    const [lPressed, setLPressed] = useState(false);
    const [rPressed, setRPressed] = useState(false);

    const on = {
        LeftBtnPressed: () => {
            setLPressed(true);
            console.log('L pressed !');
        },
        LeftBtnUnPressed: () => {
            setLPressed(false);
            console.log('L unpressed !');
        },
        RightPressed: () => {
            setRPressed(true);
            console.log('R pressed !');
        },
        RightUnPressed: () => {
            setRPressed(false);
            console.log('R unpressed !');
        }
    };

    useEffect(() => {
        if (lPressed) {} else {}
    }, [lPressed]);

    useEffect(() => {
        if (rPressed) {} else {}
    }, [rPressed]);

    return (
        <View>
            <View style={[ styles.gamepadLine, styles.directionalItem ]}>
                <TouchableHighlight
                    style={[ styles.directionalBtn ]}
                    onPress={ leftOptions.onPress }
                    onShowUnderlay={ on.LeftBtnPressed }
                    onHideUnderlay={ on.LeftBtnUnPressed }>
                    <Icon name={ leftOptions.icon }
                          style={[ styles.directionalIcon ]} />
                </TouchableHighlight>

                <TouchableHighlight
                    style={[ styles.directionalBtn ]}
                    onPress={ rightOptions.onPress }
                    onShowUnderlay={ on.RightPressed }
                    onHideUnderlay={ on.RightUnPressed }>
                    <Icon name={ rightOptions.icon }
                          style={[ styles.directionalIcon ]} />
                </TouchableHighlight>
            </View>
            <View style={[ styles.gamepadLine, styles.centeredItem ]}>
                <Icon name={ options.icon } />
            </View>
        </View>
    );
};

export default Box
