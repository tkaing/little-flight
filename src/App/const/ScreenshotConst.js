import MediaFolderConst from "./MediaFolderConst";

const OUTPUT = (screenshotId) => `file://${ MediaFolderConst.IMAGE }/screenshot_${ screenshotId }.jpg`;

export default {
    OUTPUT,
}
