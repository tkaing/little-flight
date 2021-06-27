import React from "react";

import {Box, Button, Icon, IconButton, Row, Text} from "native-base";
import Color from "../../../../App/Color";
import * as app_common from "../../../../App/Common";

const Item = (
    {
        item,
        state: {
            setShowModal, setModalContent
        }
    }
) => {

    const on = {
        Press: () => {
            setShowModal(true);
            setModalContent({ text: text });
        }
    };

    const text = "Sit nulla est ex deserunt exercitation anim occaecat. Nostrud\n" +
        "                    ullamco deserunt aute id consequat veniam incididunt duis in sint\n" +
        "                    irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit\n" +
        "                    officia tempor esse quis. Sunt ad dolore quis aute consequat. Magna\n" +
        "                    exercitation reprehenderit magna aute tempor cupidatat consequat\n" +
        "                    elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt\n" +
        "                    cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim\n" +
        "                    ullamco deserunt aute id consequat veniam incididunt duis in sint\n" +
        "                    irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit\n" +
        "                    officia tempor esse quis. Sunt ad dolore quis aute consequat. Magna\n" +
        "                    exercitation reprehenderit magna aute tempor cupidatat consequat\n" +
        "                    elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt\n" +
        "                    cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim\n" +
        "                    exercitation reprehenderit magna aute tempor cupidatat consequat\n" +
        "                    elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt\n" +
        "                    cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim\n" +
        "                    ullamco deserunt aute id consequat veniam incididunt duis in sint\n" +
        "                    irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit\n" +
        "                    officia tempor esse quis. Sunt ad dolore quis aute consequat. Magna\n" +
        "                    exercitation reprehenderit magna aute tempor cupidatat consequat\n" +
        "                    elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt\n" +
        "                    cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim";

    return (
        <Box
            pl={5}
            pr={2}
            py={2}
            my={2}
            bg={ Color.blue }
            rounded="md">

            <Row alignItems="center">

                <Text flex={ 4 } textAlign="left" fontWeight="bold">Vol de { item }</Text>

                <IconButton
                    flex={ 1 } onPress={ on.Press } opacity={ 80 } bg={ "#ADD8E6" }
                    icon={ <Icon { ...app_common.IconButton.forItem } name='arrow-forward' /> } />
            </Row>

        </Box>
    );
};

export default Item
