import MediaFolderConst from "./MediaFolderConst";

const INPUT = "udp://0.0.0.1:11111";

const OUTPUT = `file://${ MediaFolderConst.LIVE }/live.jpg`;

const FULL_COMMAND = `-y -i ${ INPUT } -q:v 4 -r 1 -update 1 ${ OUTPUT }`;

export default {
    INPUT,
    OUTPUT,
    FULL_COMMAND
}
