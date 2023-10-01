
/**
* Use this file to define custom functions and blocks.
* Read more at https://arcade.makecode.com/blocks/custom
*/

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * Custom blocks
 */
//*https://fontawesome.com/v4/icons/
//% weight=100 color=#0fbc11 icon="\uf0e7"
namespace custom {
    /**
     * TODO: describe your function here
     * @param n describe parameter here, eg: 5
     * @param s describe parameter here, eg: "Hello"
     * @param e describe parameter here
     */
    //% block
    export function foo(n: number, s: string, e: MyEnum): void {
        // Add code here
    }

    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 5
     */
    //% block
    export function fib(value: number): number {
        return value <= 1 ? value : fib(value -1) + fib(value - 2);
    }

    /**
     * Returns a single frame from an image array.
     * @param frames the frames array
     * @param frameNumber the frame number to get
     */
    //% block
    export function getFrame(frames: Image[], frameNumber: number): Image {

        if (frameNumber < 0) {
            throw "Requested frame less than zero";
        } else if (frameNumber > frames.length) {
            throw "Requested frame greater than frames length."
        }

        return frames.get(frameNumber)
    }
}
