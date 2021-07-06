import React, { useState, useEffect } from "react"
import styles from "./Styles.Stream"

import {Box, Button, Image, Row, Text, useToast, View, Center, Icon} from "native-base"

import { ffmpeg } from "./../../tools";
import { RNFFmpeg } from "react-native-ffmpeg";
import Video from "react-native-video";
import LiveConst from "../../App/const/LiveConst";
import Color from "../../App/Color";
import * as app_common from "../../App/Common";

const Stream = (
    {
        state: {
            openVR,
            newFrame,
            setOpenVR,
            setNewFrame,
            setLiveExecId,
            recordingExecId
        }
    }
) => {

    const toast = useToast();

    const [openStream, setOpenStream] = useState(false);
    const [listOfFrames, setListOfFrames] = useState([]);

    useEffect(() => {
        setOpenStream(true);
        return () => {
            setOpenStream(false);
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
        if (openStream) {
            (async () => {
                await ffmpeg.launchLive({ toast }, {
                    setNewFrame,
                    setLiveExecId
                });
            })();
        }
        if (!openStream) {
            setNewFrame(null);
            setListOfFrames([]);
        }
    }, [openStream]);

    if (recordingExecId) {

        return (
            <Center flex={1}>
                <Icon
                    { ...app_common.Icon.default }
                    name='videocam'
                    size={20}
                    color="red"
                />
                <Text>Recording en cours...</Text>
            </Center>
        );
    }

    return (
        <Row flex={1}>

            { openVR &&
                <Center>
                    <Button variant="green"
                            onPress={ () => setOpenVR(false) }>
                        <Text fontWeight="bold">FPV</Text>
                    </Button>
                </Center>
            }

            {/* Stream Preview */}
            { openStream &&
                <Row flex={1}>
                    <Box flex={1} style={[ styles.frameView ]}
                        {
                            ...(openVR ? {
                                borderTopWidth: 1,
                                borderTopColor: Color.blue,
                                borderBottomWidth: 1,
                                borderBottomColor: Color.blue
                            } : {})
                        }
                    >
                        { listOfFrames.map((_it, index) =>
                            <Image fadeDuration={0}
                                   source={{ uri: _it.uri }}
                                   square
                                   style={[ styles.frameImage ]}
                                   large
                                   alt="Stream"
                                   key={ _it.number + index } />
                        )}
                    </Box>

                    { openVR &&
                        <Box flex={1} style={[ styles.frameView ]}
                             borderTopWidth={1}
                             borderTopColor={ Color.red }
                             borderBottomWidth={1}
                             borderBottomColor={ Color.red }
                        >
                            { listOfFrames.map((_it, index) =>
                                <Image fadeDuration={0}
                                       source={{ uri: _it.uri }}
                                       square
                                       style={[ styles.frameImage ]}
                                       large
                                       alt="Stream"
                                       key={ _it.number + index } />
                            )}
                        </Box>
                    }
                </Row>
            }
        </Row>
    );
}

export default Stream
