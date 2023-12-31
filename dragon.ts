
/**
* Use this file to define custom functions and blocks.
* Read more at https://arcade.makecode.com/blocks/custom
*/

enum DragonScriptEnum {
    //% block="intro"
    Intro,
    //% block="death"
    Death
}

enum DragonMovementEnum {
    //% block="forwards"
    Forward,
    //% block="backwards"
    Backwards
}

/**
 * Custom blocks
 */
//*https://fontawesome.com/v4/icons/
//% weight=100 color=#0fbc11 icon="\uf06d"
namespace dragon {

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
    //% blockId=dragonShootFire block="have $dragon=variables_get(myDragon) shoot fire of kind $kind=spritekind"
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
    * Moves the dragon
    * @param dragon
    * @param direction
    * @param xLength, eg: 18
    * @param frameDelay
    */
    //% blockId=dragonMove block="move $dragon=variables_get(myDragon) $direction x $xLength length || frame delay $frameDelay"
    //% group="Movement"
    //% inlineInputMode=inline
    //% xLength.min=4 xLength.max=18
    export function moveForwards(dragon: Dragon, direction: DragonMovementEnum, xLength: number, frameDelay = 100) {
        if (xLength >= 4 && xLength <= 18) {
            if (direction == DragonMovementEnum.Forward) {
                dragon.moveForwards(xLength, frameDelay);
            }
            else if (direction == DragonMovementEnum.Backwards) {
                dragon.moveBackwards(xLength, frameDelay);
            }
        }
    }

    /**
    * Makes the dragon roar
    * @param dragon
    * @param msToRoar, eg: 1000
    * @param pixelsToShake, eg: 4
    */
    //% blockId=dragonRoar block="have $dragon=variables_get(myDragon) roar || milliseconds to roar $msToRoar pixels to shake $pixelsToShake"
    //% group="Sound"
    export function roar(dragon: Dragon, msToRoar = 1000, pixelsToShake = 2) {
        dragon.roar(msToRoar, pixelsToShake)
    }

    /**
    * Makes the dragon perform a script
    * @param dragon
    * @param script
    */
    //% blockId=dragonPerformScript block="have $dragon=variables_get(myDragon) perform $script script"
    //% group="Scripts"
    export function dragonPerformScript(dragon: Dragon, script: DragonScriptEnum) {
        if (script == DragonScriptEnum.Intro) {
            dragon.performIntroScript();
        }
        else if (script == DragonScriptEnum.Death) {
            dragon.performDeathScript();
        }
    }
}

/**
 * A dragon
 **/
//% blockNamespace=custom color="#6699CC" blockGap=8
class Dragon {
    private renderable: scene.Renderable;
    
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
    private headAnimationDeath1: Image[];
    private headAnimationDeath1MaxIndex: number;
    private headAnimationDeath2: Image[];
    private headAnimationDeath2MaxIndex: number;
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
    private headDead1: Image;
    private headDead2: Image;
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
        this.headAnimationMaxIndex = this.getMaxFrameIndex(this.headAnimation);
        this.headAnimationDeath1 = assets.animation`DragonHeadDeath1`;
        this.headAnimationDeath1MaxIndex = this.getMaxFrameIndex(this.headAnimationDeath1);
        this.headAnimationDeath2 = assets.animation`DragonHeadDeath2`;
        this.headAnimationDeath2MaxIndex = this.getMaxFrameIndex(this.headAnimationDeath2);
        this.neckAnimation = assets.animation`DragonNeck`;
        this.neckAnimationMaxIndex = this.getMaxFrameIndex(this.neckAnimation);
        this.bodyAnimation = assets.animation`DragonBody`;
        this.bodyAnimationMaxIndex = this.getMaxFrameIndex(this.bodyAnimation);
        this.wingAnimation = assets.animation`DragonWing`;
        this.wingAnimationMaxIndex = this.getMaxFrameIndex(this.wingAnimation);
        this.wingAnimationDeath = assets.animation`DragonWingDeath`;
        this.wingAnimationDeathMaxIndex = this.getMaxFrameIndex(this.wingAnimationDeath);
        this.legFrontAnimation = assets.animation`DragonLegFront`;
        this.legFrontAnimationMaxIndex = this.getMaxFrameIndex(this.legFrontAnimation);
        this.legBackAnimation = assets.animation`DragonLegBack`;
        this.legBackAnimationMaxIndex = this.getMaxFrameIndex(this.legBackAnimation);
        this.tailAnimation = assets.animation`DragonTail`;
        this.tailAnimationMaxIndex = this.getMaxFrameIndex(this.tailAnimation);

        this.headDead1 = assets.image`DragonDead1`
        this.headDead2 = assets.image`DragonDead2`
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

        //this.renderable = scene.createRenderable(-0.5, (image: Image, camera: scene.Camera) => {},()=>true);
        const buf = Buffer.create(120)
        const zLayer = 0
        this.renderable = scene.createRenderable(zLayer, (image: Image, camera: scene.Camera) => {
            for (let x = 0; x < 160; x++) {
                // Read the current screen content for modification
                image.getRows(x, buf)
                // Now "buf" contains a color value for the current pixel row 
                // (it's actually a vertical column onscreen) where it can be modified.
                buf[12] = 15
                // Write the modified pixels back to the screen.
                image.setRows(x, buf)
            }
        })
    }

    public getHeadAnimationMaxIndex() {
        return this.headAnimationMaxIndex;
    }

    public getNeckAnimationMaxIndex() {
        return this.neckAnimationMaxIndex;
    }

    public moveMouth(toFrameIndex: number, frameDelay: number) {
        this.moveMouthWithAnimation(this.headAnimation, toFrameIndex, frameDelay);
    }

    private moveMouthDeath1(toFrameIndex: number, frameDelay: number) {
        this.moveMouthWithAnimation(this.headAnimationDeath1, toFrameIndex, frameDelay);
    }

    private moveMouthDeath2(toFrameIndex: number, frameDelay: number) {
        this.moveMouthWithAnimation(this.headAnimationDeath2, toFrameIndex, frameDelay);
    }

    private moveMouthWithAnimation(animation: Image[], toFrameIndex: number, frameDelay: number) {
        let dragonMouthChange: number;

        if (this.mouthIndex < toFrameIndex) {
            dragonMouthChange = 1
        } else {
            dragonMouthChange = -1
        }
        while (this.mouthIndex != toFrameIndex) {
            this.mouthIndex += dragonMouthChange
            this.head.setImage(animation[this.mouthIndex])
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

    public performIntroScript() {
        for (let index = 0; index < 4; index++) {
            this.moveForwards(18, 100)
        }
        pause(500)
        this.roar(1000, 4)
        this.moveMouth(this.getHeadAnimationMaxIndex(), 10)
        pause(1300)
        this.moveMouth(0, 10)
        pause(1000)
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

    public performDeathScript() {
        this.moveNeck(0, 10)
        this.moveMouth(0, 10)
        this.moveLegPair(this.legBack1, this.legFront1, true, 4, 100)
        this.head.setImage(this.headAnimationDeath1[0])
        this.weaken(2, false, 10)
        pause(100)
        this.moveLegPair(this.legBack2, this.legFront2, true, 4, 100)
        this.weaken(2, false, 10)
        pause(500)
        this.moveBackwards(2, 100)
        this.weaken(2, false, 10)
        this.roar(500, 2)
        this.moveMouthDeath1(this.headAnimationDeath1MaxIndex, 10)
        pause(500)
        this.moveMouthDeath1(0, 10)
        pause(250)
        this.moveForwards(2, 100)
        this.roar(250, 0)
        this.moveMouthDeath2(this.headAnimationDeath2MaxIndex, 10)
        pause(250)
        this.moveMouthDeath2(0, 10)
        pause(250)
        this.head.setImage(this.headDead1)
        scene.cameraShake(8, 500)
        this.weaken(30, true, 0)
        this.head.setImage(this.headDead2)
    }

    private getMaxFrameIndex(frames: Image[]): number {
        return frames.length - 1
    }   
}
