import React from "react";

import { Box, Icon, IconButton, Row, Text } from "native-base";
import Color from "../../../../../App/Color";
import * as app_common from "../../../../../App/Common";

const Item = (
    {
        item,
        state: {
            setShowModal, setModalContent
        }
    }
) => {

    const on = {
        OpenModal: () => {
            setShowModal(true);
            setModalContent({ item });
        }
    };

    return (
        <Box
            pl={5}
            pr={2}
            py={2}
            my={2}
            bg={ Color.blue }
            rounded="md">

            <Row alignItems="center">

                <Text flex={ 4 } textAlign="left" fontWeight="bold">Vol de { item.time }s</Text>

                <IconButton
                    flex={ 1 } onPress={ on.OpenModal } opacity={ 80 } bg={ "#ADD8E6" }
                    icon={ <Icon { ...app_common.IconButton.forItem } name='arrow-forward' /> } />
            </Row>

        </Box>
    );
};

export default Item
