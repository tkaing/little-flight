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
    forRemote: {
        ...Default.Icon,
        size: 6
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
    forProfile: {

    },
    forFooterTab: {
        ...Default.Text,
        w: "80%",
        height: 4,
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
    default: Default.IconButton,
    forItem: {
        ...Default.IconButton,
        size: 5
    },
    forProfile: {
        ...Default.IconButton,
        borderRadius: 50
    },
    forRemote: {
        ...Default.IconButton,
        bg: Color.blue,
        size: "lg",
        borderRadius: 50
    },
};

export {
    Icon,
    Text,
    Link,
    IconButton
}
