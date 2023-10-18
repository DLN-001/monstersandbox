
/**
* Use this file to define custom functions and blocks.
* Read more at https://arcade.makecode.com/blocks/custom
*/


/**
 * Custom blocks
 */
//*https://fontawesome.com/v4/icons/
//% weight=100 color=#0fbc11 icon="\uf0e7"
namespace custom {

    /**
     * Returns a single frame from an image array.
     * @param frames the frames array
     * @param frameNumber the frame number to get
     */
    //% block
    export function getFrame(frames: Image[], frameNumber: number): Image {

        if (frameNumber < 0) {
            throw "Requested frame less than zero";
        } else if (frameNumber > frames.length - 1) {
            throw "Requested frame greater than frames length."
        }

        return frames.get(frameNumber)
    }

    /**
     * Returns a maximum index for an image array.
     * @param frames the frames array
     */
    //% block
    export function getMaxFrameIndex(frames: Image[]): number {
        return frames.length - 1
    }
}
