import React from "react";

import { Icon, Row, Text } from "native-base";

import * as app_common from "../App/Common";
import Color from "../App/Color";

const Headline = (
    {
        icon,
        children
    }
) => {

    return (
        <Row justifyContent="center" alignItems="center">
            <Icon { ...app_common.Icon.default } name={ icon } mr={ 2 } color={ Color.blue } />
            <Text variant="headline">{ children }</Text>
        </Row>
    )
}

export default Headline
