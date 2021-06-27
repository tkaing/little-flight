import React from "react";

import { Center, Icon, Pressable, Row, Text } from "native-base";

import * as app_common from "../../App/Common";
import * as app_screen from "../../App/Screen";
import * as app_service from "../../App/Service";

import { on } from "../../tools";

const FooterTabs = (
    {
        state: {
            tabIndex, setTabIndex
        }
    }
) => {

    return (
        <Row bg="rose.900" alignItems="center" safeAreaBottom shadow={ 6 }>
            { app_screen.home.listOfTabs.map((_it, _index) =>
                <Pressable
                    py={ 2 }
                    flex={ 1 }
                    opacity={ tabIndex === _index ? 1 : 0.5 }
                    onPress={ () => on.home.tabChange({ index: _index },{ setTabIndex }) }>
                    <Center>
                        <Icon { ...app_common.Icon.forFooterTab } name={ _it.icon } />
                        <Text { ...app_common.Text.forFooterTab } numberOfLines={ 1 }>
                            { app_service.capitalize(_it.name) }
                        </Text>
                    </Center>
                </Pressable>
            ) }
        </Row>
    );
};

export default FooterTabs
