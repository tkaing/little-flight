import React from "react";

import { Box } from "native-base";

const SectionHeader = (
    {
        title
    }
) => {

    return (
        <Box
            px={5}
            py={2}
            my={2}
            _text={{
                fontWeight: "bold",
                textAlign: "center"
            }}
            rounded="md"
        >
            { title }
        </Box>
    );
};

export default SectionHeader
