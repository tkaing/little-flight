import React, { useState, useEffect } from "react"
import styles from "./Styles.Stream"

import { Image, View } from "native-base"
import { Fab } from "."

import * as app_drone from "../../App/Drone";

import { ffmpeg } from "./../../tools";

const Stream = ({ xxx }) => {

    const [newFrame, setNewFrame] = useState();
    const [fabActive, setFabActive] = useState(false);
    const [openStream, setOpenStream] = useState(false);
    const [listOfFrames, setListOfFrames] = useState([]);

    useEffect(() => {
        setNewFrame();
        setListOfFrames([]);
        return () => {
            setNewFrame();
            setListOfFrames([]);
        };
    }, []);

    useEffect(() => {
        if (newFrame) {
            switch (listOfFrames.length) {
                case 0:
                    setListOfFrames([newFrame]);
                    break;
                case 1:
                    setListOfFrames([listOfFrames[0], newFrame]);
                    break;
                case 2:
                    setListOfFrames([listOfFrames[1], newFrame]);
                    break;
            }
        }
    }, [newFrame]);

    useEffect(() => {
        if (!openStream) {
            setNewFrame();
            setListOfFrames([]);
        }
    }, [openStream]);

    useEffect(() => {
        if (listOfFrames.length === 0)
            console.log([]);
        else
            console.log(
                listOfFrames.map(_it => _it.uri.substr(0, 100))
            );
    }, [listOfFrames]);

    return (
        <>
            {/* Stream Preview */}
            { openStream &&
                <View style={[ styles.frameView ]}>
                    { listOfFrames.map(_it =>
                        <Image fadeDuration={ 0 }
                               source={{ uri: _it.uri }}
                               square
                               style={[ styles.frameImage ]}
                               large
                               key={ _it.number } />
                    )}
                </View>
            }
            {/*<Fab state={{ fabActive, setFabActive }} />*/}
        </>
    )
};

export default Stream
