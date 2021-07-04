import MediaFolderConst from "./MediaFolderConst";

const INPUT = "udp://127.0.0.1:11111";

const OUTPUT = (recordingId) => `file://${ MediaFolderConst.VIDEO }/recording_${ recordingId }.mp4`;

const FULL_COMMAND = (recordingId) => `-i ${ INPUT } -vcodec copy ${ OUTPUT(recordingId) }`;

export default {
    INPUT,
    OUTPUT,
    FULL_COMMAND
}
