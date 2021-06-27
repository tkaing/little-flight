import Color from "./Color";
import { Ionicons } from "@expo/vector-icons";

const Default = {
    Icon: {
        as: Ionicons,
        color: Color.white
    },
    Text: {
        color: Color.white
    },
    IconButton: {
        as: Ionicons,
        color: Color.white
    },
};

const Icon = {
    default: Default.Icon,
    forInput: {
        ...Default.Icon,
        ml: 4,
        size: 6
    },
    forButton: {
        ...Default.Icon,
        size: 8
    },
    forFooterTab: {
        ...Default.Icon,
        mb: 1,
        size: "sm",
        style: {
            height: 25
        }
    }
};

const Text = {
    default: Default.Text,
    forModal: {
        ...Default.Text,
        color: Color.blue,
        fontWeight: "bold",
        fontSize: "3xl"
    },
    forFooterTab: {
        ...Default.Text,
        w: "80%",
        height: 5,
        fontSize: "xs",
        noOfLines: 1,
        isTruncated: true,
        style: {
            textAlign: 'center'
        }
    },
};

const Link = {
    _text: {
        color: Color.blue,
        fontWeight: 'bold'
    }
};

const IconButton = {
    forItem: {
        ...Default.IconButton,
        size: 5,
        style: {
            //height: 20
        }
    }
};

export {
    Icon,
    Text,
    Link,
    IconButton
}
