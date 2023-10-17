
/**
* Use this file to define custom functions and blocks.
* Read more at https://arcade.makecode.com/blocks/custom
*/

/**
 * Custom blocks
 */
//*https://fontawesome.com/v4/icons/
//% weight=100 color=#0fbc11 icon="\uf06d"
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
    //% blockId=dragonCreate block="dragon of kind $kind=spritekind"
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
    //% blockId=dragonShootFire block="$dragon=variables_get(myDragon) shoot fire of kind $kind=spritekind"
    //% group="Head" 
    export function shootFire(dragon: Dragon, kind: number): void {
        dragon.shootFire(kind);
    }

    /**
    * Moves the dragon's neck
    * @param dragon
    * @param frameDelay
    */
    //% blockId=dragonMoveNeck block="move $dragon=variables_get(myDragon) neck to position number $index || frame delay $frameDelay"
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

    /**
    * Moves the dragon's wing
    * @param dragon
    * @param frameDelay
    */
    //% blockId=dragonMoveWing block="move $dragon=variables_get(myDragon) wing to position number $index || frame delay $frameDelay"
    //% group="Wing" 
    export function moveWing(dragon: Dragon, index: number, frameDelay = 100): void {
        dragon.moveWing(index, frameDelay)
    }

    /**
    * Get the max dragon wing position
    * @param dragon
    */
    //% blockId=dragonGetMaxWingPos block="get $dragon=variables_get(myDragon) max wing position"
    //% group="Wing" 
    export function getMaxWingPosition(dragon: Dragon): number {
        return dragon.getWingAnimationMaxIndex();
    }

    /**
    * Moves the dragon backwards
    * @param dragon
    * @param xLength, eg: 18
    * @param frameDelay
    */
    //% blockId=dragonMoveBackwards block="move $dragon=variables_get(myDragon) backwards x $xLength length || frame delay $frameDelay"
    //% group="Movement" 
    //% xLength.min=4 xLength.max=18
    export function moveBackwards(dragon: Dragon, xLength: number, frameDelay = 100) {
        if(xLength > 0) {
            dragon.moveBackwards(xLength, frameDelay);
        }
    }

    /**
    * Moves the dragon forwards
    * @param dragon
    * @param xLength, eg: 18
    * @param frameDelay
    */
    //% blockId=dragonMoveForwards block="move $dragon=variables_get(myDragon) forwards x $xLength length || frame delay $frameDelay"
    //% group="Movement"
    //% xLength.min=4 xLength.max=18
    export function moveForwards(dragon: Dragon, xLength: number, frameDelay = 100) {
        dragon.moveForwards(xLength, frameDelay);
    }

    /**
    * Makes the dragon roar
    * @param dragon
    * @param msToRoar, eg: 1000
    * @param pixelsToShake, eg: 4
    */
    //% blockId=dragonRoar block="$dragon=variables_get(myDragon) roar || milliseconds to roar $msToRoar pixels to shake $pixelsToShake"
    //% group="Sound"
    export function roar(dragon: Dragon, msToRoar = 1000, pixelsToShake = 2) {
        dragon.roar(msToRoar, pixelsToShake)
    }

    /**
    * Makes the dragon perform the standard intro
    * @param dragon
    */
    //% blockId=dragonIntro block="$dragon=variables_get(myDragon) perform intro"
    //% group="Scripts"
    export function dragonIntro(dragon: Dragon) {
        for (let index = 0; index < 4; index++) {
            dragon.moveForwards(18, 100)
        }
        pause(500)
        dragon.roar(1000, 4)
        dragon.moveMouth(dragon.getHeadAnimationMaxIndex(), 10)
        pause(1300)
        dragon.moveMouth(0, 10)
        pause(1000)
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

    //*Animations
    private headAnimation: Image[];
    private headAnimationMaxIndex: number;
    private neckAnimation: Image[];
    private neckAnimationMaxIndex: number;
    private bodyAnimation: Image[];
    private bodyAnimationMaxIndex: number;
    private legFrontAnimation: Image[];
    private legFrontAnimationMaxIndex: number;
    private legBackAnimation: Image[];
    private legBackAnimationMaxIndex: number;
    private wingAnimation: Image[];
    private wingAnimationMaxIndex: number;
    private wingAnimationDeath: Image[];
    private wingAnimationDeathMaxIndex: number;
    private tailAnimation: Image[];
    private tailAnimationMaxIndex: number;

    //*Images
    private fireImage: Image;

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

    public constructor(kind: number) {
        this.kind = kind;

        this.headAnimation = assets.animation`DragonHead`;
        this.headAnimationMaxIndex = custom.getMaxFrameIndex(this.headAnimation);
        this.neckAnimation = assets.animation`DragonNeck`;
        this.neckAnimationMaxIndex = custom.getMaxFrameIndex(this.neckAnimation);
        this.bodyAnimation = assets.animation`DragonBody`;
        this.bodyAnimationMaxIndex = custom.getMaxFrameIndex(this.bodyAnimation);
        this.wingAnimation = assets.animation`DragonWing`;
        this.wingAnimationMaxIndex = custom.getMaxFrameIndex(this.wingAnimation);
        this.wingAnimationDeath = assets.animation`DragonWingDeath`;
        this.wingAnimationDeathMaxIndex = custom.getMaxFrameIndex(this.wingAnimationDeath);
        this.legFrontAnimation = assets.animation`DragonLegFront`;
        this.legFrontAnimationMaxIndex = custom.getMaxFrameIndex(this.legFrontAnimation);
        this.legBackAnimation = assets.animation`DragonLegBack`;
        this.legBackAnimationMaxIndex = custom.getMaxFrameIndex(this.legBackAnimation);
        this.tailAnimation = assets.animation`DragonTail`;
        this.tailAnimationMaxIndex = custom.getMaxFrameIndex(this.tailAnimation);

        this.fireImage = assets.image`Fire`;

        this.neck = sprites.create(this.neckAnimation[0], this.kind);
        this.head = sprites.create(this.headAnimation[0], this.kind);
        this.body = sprites.create(this.bodyAnimation[0], this.kind);
        this.tail = sprites.create(this.tailAnimation[0], this.kind);
        this.legFront1 = sprites.create(this.legFrontAnimation[0], this.kind);
        this.legFront2 = sprites.create(this.legFrontAnimation[0], this.kind);
        this.legBack1 = sprites.create(this.legBackAnimation[0], this.kind);
        this.legBack2 = sprites.create(this.legBackAnimation[0], this.kind);
        this.wingFront = sprites.create(this.wingAnimation[0], this.kind);
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
            this.neck.setImage(this.neckAnimation[this.neckIndex])
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

    public moveWing(toFrameIndex: number, frameDelay: number) {
        let wingChange: number;

        if (toFrameIndex < 0) {
            toFrameIndex = 0;
        }
        else if (toFrameIndex > this.wingAnimationMaxIndex) {
            toFrameIndex = this.wingAnimationMaxIndex;
        }

        if (this.wingIndex < toFrameIndex) {
            wingChange = 1
        } else {
            wingChange = -1
        }
        while (this.wingIndex != toFrameIndex) {
            this.wingIndex += wingChange
            this.wingFront.setImage(this.wingAnimation[this.wingIndex])
            pause(frameDelay)
        }
    }

    public getWingAnimationMaxIndex() {
        return this.wingAnimationMaxIndex;
    }

    private moveLeg(legSprite: Sprite, forwardIndicator: boolean, stepLength: number, frameDelay: number) {
        let stepLengthX = stepLength;

        if (forwardIndicator) {
            stepLengthX = stepLengthX * -1
        }

        legSprite.y += -4;
        legSprite.x += stepLengthX;
        this.body.x += stepLengthX / 4;
        this.tail.x += stepLengthX / 4;
        this.neck.x += stepLengthX / 4;
        this.head.x += stepLengthX / 4;
        this.wingFront.x += stepLengthX / 4;
        pause(frameDelay);
        legSprite.y += 4;
        pause(frameDelay/10);
    }

    private moveLegPair(firstLegSprite: Sprite, secondLegSprite: Sprite, forwardIndicator: boolean, stepLength: number, frameDelay: number) {
        this.moveLeg(firstLegSprite, forwardIndicator, stepLength, frameDelay);
        pause(frameDelay);
        this.moveLeg(secondLegSprite, forwardIndicator, stepLength, frameDelay);
        scene.cameraShake(2, frameDelay);
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.UntilDone);
    }

    public moveBackwards(xLength: number, frameDelay: number) {
        this.moveLegPair(this.legFront2, this.legBack2, false, xLength, frameDelay);
        pause(frameDelay);
        this.moveLegPair(this.legFront1, this.legBack1, false, xLength, frameDelay);
        pause(frameDelay);
    }

    public moveForwards(xLength: number, frameDelay: number) {
        this.moveLegPair(this.legBack1, this.legFront1, true, xLength, frameDelay);
        pause(frameDelay);
        this.moveLegPair(this.legBack2, this.legFront2, true, xLength, frameDelay);
        pause(frameDelay);
    }

    public roar(msToRoar: number, pixelsToShake: number) {
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

    private weaken(framesToProcess: number, moveNeckIndicator: boolean, frameDelay: number) {
        for (let index = 0; index < framesToProcess; index++) {
            if (moveNeckIndicator) {
                if (this.neckIndex + 4 < this.getNeckAnimationMaxIndex()) {
                    this.moveNeck(this.neckIndex + 4, 0)
                } 
                else if (this.neckIndex < this.getNeckAnimationMaxIndex()) {
                    this.moveNeck(this.neckIndex + 1, 0)
                }
            }
            if (this.wingIndex < this.wingAnimationDeathMaxIndex) {
                this.wingIndex += 1
                this.wingFront.setImage(this.wingAnimationDeath[this.wingIndex])
            }
            if (this.bodyIndex < this.bodyAnimationMaxIndex) {
                this.neck.y += 1
                this.head.y += 1
                this.bodyIndex += 1
                this.body.setImage(this.bodyAnimation[this.bodyIndex])
            }
            if (this.legFrontIndex < this.legFrontAnimationMaxIndex) {
                this.legFrontIndex += 1
                this.legFront1.setImage(this.legFrontAnimation[this.legFrontIndex])
                this.legFront2.setImage(this.legFrontAnimation[this.legFrontIndex])
            }
            if (this.legBackIndex < this.legBackAnimationMaxIndex) {
                this.legBackIndex += 1
                this.legBack1.setImage(this.legBackAnimation[this.legBackIndex])
                this.legBack2.setImage(this.legBackAnimation[this.legBackIndex])
            }
            if (this.tailIndex < this.tailAnimationMaxIndex) {
                this.tailIndex += 1
                this.tail.setImage(this.tailAnimation[this.tailIndex])
            }
            pause(frameDelay)
        }
    }
}
