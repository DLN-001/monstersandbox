
/**
* Use this file to define custom functions and blocks.
* Read more at https://arcade.makecode.com/blocks/custom
*/

/**
 * Custom blocks
 */
//*https://fontawesome.com/v4/icons/
//% weight=100 color=#0fbc11 icon="\uf0e7"
namespace dragon {

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

    /**
     * Creates a new dragon
     * @param kind the kind to make the dragon
     * @param col the initial col position
     * @param row the initial row position
     */
    //% blockId=dragonCreate block="dragon of kind %kind=spritekind"
    //% expandableArgumentMode=toggle
    //% inlineInputMode=inline
    //% blockSetVariable=myDragon
    //% group="Create"
    export function create(kind: number): Dragon {
        return new Dragon(kind);
    }

    /**
     * Center the given sprite on a given location
     * @param sprite
     * @param loc
     */
    //% blockId=placeDragonOnTile block="place $dragon=variables_get(myDragon) on top of $loc"
    //% loc.shadow=mapgettile
    //% group="Create" 
    export function placeOnTile(dragon: Dragon, loc: tiles.Location): void {
        tiles.placeOnTile(dragon.neck, tiles.getTileLocation(loc.column, loc.row))
        dragon.neck.y += 8
        tiles.placeOnTile(dragon.head, tiles.getTileLocation(loc.column - 2, loc.row - 2))
        dragon.head.x += 10
        dragon.head.y += 24
        tiles.placeOnTile(dragon.body, tiles.getTileLocation(loc.column + 3, loc.row + 1))
        dragon.body.x += -6
        dragon.body.y += -6
        tiles.placeOnTile(dragon.tail, tiles.getTileLocation(loc.column + 7, loc.row + 2))
        dragon.tail.x += -6
        dragon.tail.y += -2
        tiles.placeOnTile(dragon.legFront1, tiles.getTileLocation(loc.column + 1, loc.row + 2))
        dragon.legFront1.y += -5
        tiles.placeOnTile(dragon.legFront2, tiles.getTileLocation(loc.column + 1, loc.row + 2))
        dragon.legFront2.y += -5
        dragon.legFront2.z += -10
        tiles.placeOnTile(dragon.legBack1, tiles.getTileLocation(loc.column + 4, loc.row + 2))
        dragon.legBack1.y += -5
        tiles.placeOnTile(dragon.legBack2, tiles.getTileLocation(loc.column + 4, loc.row + 2))
        dragon.legBack2.y += -5
        dragon.legBack2.z += -10
        tiles.placeOnTile(dragon.wingFront, tiles.getTileLocation(loc.column + 3, loc.row - 0))
        dragon.wingFront.y += 8
        dragon.wingFront.x += -9
    }

    /**
    * Opens the dragon's mouth
    * @param dragon
    * @param frameDelay
    */
    //% blockId=dragonOpenMouth block="open $dragon=variables_get(myDragon) mouth || frame delay $frameDelay"
    //% group="Head" 
    export function openMouth(dragon: Dragon, frameDelay = 100): void {
        dragon.moveMouth(dragon.getHeadAnimationMaxIndex(), frameDelay)
    }

    /**
    * Closes the dragon's mouth
    * @param dragon
    * @param frameDelay
    */
    //% blockId=dragonCloseMouth block="close $dragon=variables_get(myDragon) mouth || frame delay $frameDelay"
    //% group="Head" 
    export function closeMouth(dragon: Dragon, frameDelay = 100): void {
        dragon.moveMouth(0, frameDelay)
    }

    /**
    * Have the dragon shoot fire
    * @param dragon
    * @param kind
    */
    //% blockId=dragonShootFire block="$dragon=variables_get(myDragon) shoot fire of kind %kind=spritekind"
    //% group="Head" 
    export function shootFire(dragon: Dragon, kind: number): void {
        dragon.shootFire(kind);
    }

    /**
    * Moves the dragon's neck
    * @param dragon
    * @param frameDelay
    */
    //% blockId=dragonMoveNeck block="move $dragon=variables_get(myDragon) neck to position number %index || frame delay $frameDelay"
    //% group="Neck" 
    export function moveNeck(dragon: Dragon, index: number, frameDelay = 100): void {
        dragon.moveNeck(index, frameDelay)
    }

    /**
    * Get the max dragon neck position
    * @param dragon
    */
    //% blockId=dragonGetMaxNeckPos block="get $dragon=variables_get(myDragon) max neck position"
    //% group="Neck" 
    export function getMaxNeckPosition(dragon: Dragon): number {
        return dragon.getNeckAnimationMaxIndex();
    }

    function dragonMoveLeg(myLegSprite: Sprite, myForwardIndicator: boolean, stepLength: number) {
        DragonLegStepX = stepLength
        if (myForwardIndicator) {
            DragonLegStepX = DragonLegStepX * -1
        }
        myLegSprite.y += -4
        myLegSprite.x += DragonLegStepX
        DragonBody.x += DragonLegStepX / 4
        DragonTail.x += DragonLegStepX / 4
        DragonNeck.x += DragonLegStepX / 4
        DragonHead.x += DragonLegStepX / 4
        DragonWingFront.x += DragonLegStepX / 4
        pause(100)
        myLegSprite.y += 4
        pause(10)
    }

    function dragonMoveBackward(stepLength: number) {
        dragonMoveLegPair(DragonLegFront2, DragonLegBack2, false, stepLength)
        pause(100)
        dragonMoveLegPair(DragonLegFront1, DragonLegBack1, false, stepLength)
        pause(100)
    }

    function dragonIntro() {
        for (let index = 0; index < 4; index++) {
            dragonMoveForward(18)
        }
        pause(500)
        dragonRoar(1000, 4)
        dragonMoveMouth(custom.getMaxFrameIndex(assets.animation`DragonHead`), 10, assets.animation`DragonHead`)
        pause(1300)
        dragonMoveMouth(0, 10, assets.animation`DragonHead`)
        pause(1000)
    }

    function dragonWeaken(framesToProcess: number, moveNeckIndicator: boolean, msDelay: number) {
        for (let index = 0; index < framesToProcess; index++) {
            if (moveNeckIndicator) {
                if (DragonNeckIndex + 4 < custom.getMaxFrameIndex(assets.animation`neck`)) {
                    dragonMoveNeck(DragonNeckIndex + 4, 0)
                } else if (DragonNeckIndex < custom.getMaxFrameIndex(assets.animation`neck`)) {
                    dragonMoveNeck(DragonNeckIndex + 1, 0)
                }
            }
            if (DragonWingIndex < custom.getMaxFrameIndex(assets.animation`DragonWingDeath`)) {
                DragonWingIndex += 1
                DragonWingFront.setImage(custom.getFrame(assets.animation`DragonWingDeath`, DragonWingIndex))
            }
            if (DragonBodyIndex < custom.getMaxFrameIndex(assets.animation`DragonBody`)) {
                DragonNeck.y += 1
                DragonHead.y += 1
                DragonBodyIndex += 1
                DragonBody.setImage(custom.getFrame(assets.animation`DragonBody`, DragonBodyIndex))
            }
            if (DragonLegFrontIndex < custom.getMaxFrameIndex(assets.animation`DragonLegFront`)) {
                DragonLegFrontIndex += 1
                DragonLegFront1.setImage(custom.getFrame(assets.animation`DragonLegFront`, DragonLegFrontIndex))
                DragonLegFront2.setImage(custom.getFrame(assets.animation`DragonLegFront`, DragonLegFrontIndex))
            }
            if (DragonLegBackIndex < custom.getMaxFrameIndex(assets.animation`DragonLegBack`)) {
                DragonLegBackIndex += 1
                DragonLegBack1.setImage(custom.getFrame(assets.animation`DragonLegBack`, DragonLegBackIndex))
                DragonLegBack2.setImage(custom.getFrame(assets.animation`DragonLegBack`, DragonLegBackIndex))
            }
            if (DragonTailIndex < custom.getMaxFrameIndex(assets.animation`DragonTail`)) {
                DragonTailIndex += 1
                DragonTail.setImage(custom.getFrame(assets.animation`DragonTail`, DragonTailIndex))
            }
            pause(msDelay)
        }
    }
    function dragonFlapWings() {
        dragonMoveWing(custom.getMaxFrameIndex(assets.animation`DragonWing`), 10)
        Hero.ax = -50
        dragonMoveWing(0, 10)
        Hero.ax = 0
    }
    function dragonMoveForward(stepLength: number) {
        dragonMoveLegPair(DragonLegBack1, DragonLegFront1, true, stepLength)
        pause(100)
        dragonMoveLegPair(DragonLegBack2, DragonLegFront2, true, stepLength)
        pause(100)
    }
    function dragonRoar(msToRoar: number, pixelsToShake: number) {
        music.play(music.createSoundEffect(
            WaveShape.Noise,
            196,
            196,
            255,
            255,
            msToRoar,
            SoundExpressionEffect.None,
            InterpolationCurve.Curve
        ), music.PlaybackMode.InBackground)
        scene.cameraShake(pixelsToShake, msToRoar * 1.5)
    }
    function dragonMoveLegPair(myFirstLegSprite: Sprite, mySecondLegSprite: Sprite, myForwardIndicator: boolean, stepLength: number) {
        dragonMoveLeg(myFirstLegSprite, myForwardIndicator, stepLength)
        pause(100)
        dragonMoveLeg(mySecondLegSprite, myForwardIndicator, stepLength)
        scene.cameraShake(2, 100)
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.UntilDone)
    }

    function dragonDeath() {
        dragonMoveNeck(0, 10)
        dragonMoveMouth(0, 10, assets.animation`DragonHead`)
        dragonMoveLegPair(DragonLegBack1, DragonLegFront1, true, 4)
        DragonHead.setImage(custom.getFrame(assets.animation`DragonHeadDeath1`, 0))
        dragonWeaken(2, false, 10)
        pause(100)
        dragonMoveLegPair(DragonLegBack2, DragonLegFront2, true, 4)
        dragonWeaken(2, false, 10)
        pause(500)
        dragonMoveBackward(2)
        dragonWeaken(2, false, 10)
        dragonRoar(500, 2)
        dragonMoveMouth(custom.getMaxFrameIndex(assets.animation`DragonHeadDeath1`), 10, assets.animation`DragonHeadDeath1`)
        pause(500)
        dragonMoveMouth(0, 10, assets.animation`DragonHeadDeath1`)
        pause(250)
        dragonMoveForward(2)
        dragonRoar(250, 0)
        dragonMoveMouth(custom.getMaxFrameIndex(assets.animation`DragonHeadDeath0`), 10, assets.animation`DragonHeadDeath0`)
        pause(250)
        dragonMoveMouth(0, 10, assets.animation`DragonHeadDeath0`)
        pause(250)
        DragonHead.setImage(assets.image`dragonDead1`)
        scene.cameraShake(8, 500)
        dragonWeaken(30, true, 0)
    }
    function dragonMoveWing(wingIndex: number, wingDelay: number) {
        if (DragonWingIndex < wingIndex) {
            DragonWingChange = 1
        } else {
            DragonWingChange = -1
        }
        while (!(DragonWingIndex == wingIndex)) {
            DragonWingIndex += DragonWingChange
            DragonWingFront.setImage(custom.getFrame(assets.animation`DragonWing`, DragonWingIndex))
            pause(wingDelay)
        }
    }
}

/**
 * A dragon
 **/
//% blockNamespace=custom color="#6699CC" blockGap=8
class Dragon {

    private kind: number;

    private bodyIndex = 0;
    private neckIndex = 0;
    private tailIndex = 0;
    private legFrontIndex = 0;
    private legBackIndex = 0;
    private wingIndex = 0;
    private mouthIndex = 0;

    //*Sprites
    public head: Sprite;
    public neck: Sprite;
    public body: Sprite;
    public wingFront: Sprite;
    public legBack1: Sprite;
    public legBack2: Sprite;
    public legFront1: Sprite;
    public legFront2: Sprite;
    public tail: Sprite;

    private headAnimation: Image[];
    private headAnimationMaxIndex: number;
    private neckAnimation: Image[];
    private neckAnimationMaxIndex: number;
    private fireImage: Image;

    public constructor(kind: number) {
        this.kind = kind;

        this.neck = sprites.create(custom.getFrame(assets.animation`DragonNeck`, 0), this.kind);
        this.head = sprites.create(custom.getFrame(assets.animation`DragonHead`, 0), this.kind);
        this.body = sprites.create(custom.getFrame(assets.animation`DragonBody`, 0), this.kind);
        this.tail = sprites.create(custom.getFrame(assets.animation`DragonTail`, 0), this.kind);
        this.legFront1 = sprites.create(custom.getFrame(assets.animation`DragonLegFront`, 0), this.kind);
        this.legFront2 = sprites.create(custom.getFrame(assets.animation`DragonLegFront`, 0), this.kind);
        this.legBack1 = sprites.create(custom.getFrame(assets.animation`DragonLegBack`, 0), this.kind);
        this.legBack2 = sprites.create(custom.getFrame(assets.animation`DragonLegBack`, 0), this.kind);
        this.wingFront = sprites.create(custom.getFrame(assets.animation`DragonWing`, 0), this.kind);

        this.fireImage = assets.image`Fire`;

        this.headAnimation = assets.animation`DragonHead`;
        this.headAnimationMaxIndex = custom.getMaxFrameIndex(this.headAnimation);
        this.neckAnimation = assets.animation`DragonNeck`;
        this.neckAnimationMaxIndex = custom.getMaxFrameIndex(this.neckAnimation);
    }

    public getHeadAnimationMaxIndex() {
        return this.headAnimationMaxIndex;
    }

    public getNeckAnimationMaxIndex() {
        return this.neckAnimationMaxIndex;
    }

    public moveMouth(toFrameIndex: number, frameDelay: number) {
        let dragonMouthChange: number;

        if (this.mouthIndex < toFrameIndex) {
            dragonMouthChange = 1
        } else {
            dragonMouthChange = -1
        }
        while (this.mouthIndex != toFrameIndex) {
            this.mouthIndex += dragonMouthChange
            this.head.setImage(custom.getFrame(this.headAnimation, this.mouthIndex))
            pause(frameDelay)
        }
    }

    public moveNeck(toFrameIndex: number, frameDelay: number) {
        let neckChange: number;

        if (toFrameIndex < 0) {
            toFrameIndex = 0;
        }
        else if (toFrameIndex > this.neckAnimationMaxIndex) {
            toFrameIndex = this.neckAnimationMaxIndex;
        }

        if (this.neckIndex < toFrameIndex) {
            neckChange = 1
        } else {
            neckChange = -1
        }

        while (this.neckIndex != toFrameIndex) {
            this.neckIndex += neckChange
            this.neck.setImage(custom.getFrame(this.neckAnimation, this.neckIndex))
            this.head.x += -8 * neckChange / 33
            this.head.y += 30 * neckChange / 33
            pause(frameDelay)
        }
    }

    public shootFire(kind: number): Sprite {
        let fire: Sprite;

        if (this.mouthIndex == this.headAnimationMaxIndex) {
            fire = sprites.createProjectileFromSprite(this.fireImage, this.head, -100, 0)
            fire.setKind(kind)
            fire.y += 3.5
            fire.x += 2
        }

        return fire;
    }
}
