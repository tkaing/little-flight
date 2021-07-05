import MediaFolderConst from "./MediaFolderConst";

const INPUT = "udp://0.0.0.1:11111";

const OUTPUT = (liveId) => `file://${ MediaFolderConst.LIVE }/live_${ liveId }.jpg`;

const FULL_COMMAND = (liveId) => `-i ${ INPUT } -q:v 4 -r 1 -update 1 ${ OUTPUT(liveId) }`;

export default {
    INPUT,
    OUTPUT,
    FULL_COMMAND
}
