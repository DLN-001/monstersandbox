namespace SpriteKind {
    export const Spell = SpriteKind.create()
    export const Skeleton = SpriteKind.create()
    export const Test = SpriteKind.create()
    export const Dragon_Fire_Kind = SpriteKind.create()
}
namespace StatusBarKind {
    export const scel_helth = StatusBarKind.create()
    export const Mush_manHP = StatusBarKind.create()
}
function initializeHeroVariables () {
    Hero = sprites.create(assets.image`WizForward`, SpriteKind.Player)
    tiles.placeOnTile(Hero, tiles.getTileLocation(2, 13))
    scene.cameraFollowSprite(Hero)
    Hero.ay = 500
    controller.moveSprite(Hero, 100, 0)
}
function dragonCreate () {
    DragonNeckCol = 13
    DragonNeckRow = 12
    DragonNeck = sprites.create(custom.getFrame(assets.animation`DragonNeck`, 0), SpriteKind.Test)
    tiles.placeOnTile(DragonNeck, tiles.getTileLocation(DragonNeckCol, DragonNeckRow))
    DragonNeck.y += 8
    DragonHead = sprites.create(custom.getFrame(assets.animation`DragonHead`, 0), SpriteKind.Test)
    tiles.placeOnTile(DragonHead, tiles.getTileLocation(DragonNeckCol - 2, DragonNeckRow - 2))
    DragonHead.x += 10
    DragonHead.y += 24
    DragonBody = sprites.create(custom.getFrame(assets.animation`DragonBody`, 0), SpriteKind.Test)
    tiles.placeOnTile(DragonBody, tiles.getTileLocation(DragonNeckCol + 3, DragonNeckRow + 1))
    DragonBody.x += -6
    DragonBody.y += -6
    DragonTail = sprites.create(custom.getFrame(assets.animation`DragonTail`, 0), SpriteKind.Test)
    tiles.placeOnTile(DragonTail, tiles.getTileLocation(DragonNeckCol + 7, DragonNeckRow + 2))
    DragonTail.x += -6
    DragonTail.y += -2
    DragonLegFront1 = sprites.create(custom.getFrame(assets.animation`DragonLegFront`, 0), SpriteKind.Test)
    tiles.placeOnTile(DragonLegFront1, tiles.getTileLocation(DragonNeckCol + 1, DragonNeckRow + 2))
    DragonLegFront1.y += -5
    DragonLegFront2 = sprites.create(custom.getFrame(assets.animation`DragonLegFront`, 0), SpriteKind.Test)
    tiles.placeOnTile(DragonLegFront2, tiles.getTileLocation(DragonNeckCol + 1, DragonNeckRow + 2))
    DragonLegFront2.y += -5
    DragonLegFront2.z += -10
    DragonLegBack1 = sprites.create(custom.getFrame(assets.animation`DragonLegBack`, 0), SpriteKind.Test)
    tiles.placeOnTile(DragonLegBack1, tiles.getTileLocation(DragonNeckCol + 4, DragonNeckRow + 2))
    DragonLegBack1.y += -5
    DragonLegBack2 = sprites.create(custom.getFrame(assets.animation`DragonLegBack`, 0), SpriteKind.Test)
    tiles.placeOnTile(DragonLegBack2, tiles.getTileLocation(DragonNeckCol + 4, DragonNeckRow + 2))
    DragonLegBack2.y += -5
    DragonLegBack2.z += -10
    DragonWingFront = sprites.create(custom.getFrame(assets.animation`DragonWing`, 0), SpriteKind.Test)
    tiles.placeOnTile(DragonWingFront, tiles.getTileLocation(DragonNeckCol + 3, DragonNeckRow - 0))
    DragonWingFront.y += 8
    DragonWingFront.x += -9
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    dragonIntro()
    dragonMoveNeck(Math.round(custom.getMaxFrameIndex(assets.animation`DragonNeck`) / 2), 10)
    dragonMoveMouth(custom.getMaxFrameIndex(assets.animation`DragonHead`), 10, assets.animation`DragonHead`)
    dragonShootFire(50)
    dragonMoveMouth(0, 10, assets.animation`DragonHead`)
    pause(1000)
    dragonMoveNeck(custom.getMaxFrameIndex(assets.animation`DragonNeck`), 10)
    dragonMoveMouth(custom.getMaxFrameIndex(assets.animation`DragonHead`), 10, assets.animation`DragonHead`)
    dragonShootFire(50)
    dragonMoveMouth(0, 10, assets.animation`DragonHead`)
})
function dragonMoveLeg (myLegSprite: Sprite, myForwardIndicator: boolean, stepLength: number) {
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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    dragon.openMouth(myDragon)
    dragon.shootFire(myDragon, SpriteKind.Dragon_Fire_Kind)
})
function dragonMoveMouth (mouthIndex: number, mouthDelay: number, mouthImageList: any[]) {
    if (DragonMouthIndex < mouthIndex) {
        DragonMouthChange = 1
    } else {
        DragonMouthChange = -1
    }
    while (!(DragonMouthIndex == mouthIndex)) {
        DragonMouthIndex += DragonMouthChange
        DragonHead.setImage(custom.getFrame(mouthImageList, DragonMouthIndex))
        pause(mouthDelay)
    }
}
function dragonMoveBackward (stepLength: number) {
    dragonMoveLegPair(DragonLegFront2, DragonLegBack2, false, stepLength)
    pause(100)
    dragonMoveLegPair(DragonLegFront1, DragonLegBack1, false, stepLength)
    pause(100)
}
function dragonIntro () {
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
function dragonShootFire (fireGrowthDelay: number) {
    if (DragonMouthIndex == custom.getMaxFrameIndex(assets.animation`DragonHead`)) {
        DragonFire = sprites.createProjectileFromSprite(assets.image`Fire`, DragonHead, -100, 0)
        DragonFire.setKind(SpriteKind.Dragon_Fire_Kind)
        DragonFire.z += -100
        DragonFire.y += 3.5
        DragonFire.x += 4
        DragonFire.setScale(0.5, ScaleAnchor.Middle)
        for (let index = 0; index < 4; index++) {
            pause(fireGrowthDelay)
            DragonFire.changeScale(0.125, ScaleAnchor.Middle)
            DragonFire.vx += -12.5
        }
    }
}
function dragonWeaken (framesToProcess: number, moveNeckIndicator: boolean, msDelay: number) {
    for (let index = 0; index < framesToProcess; index++) {
        if (moveNeckIndicator) {
            if (DragonNeckIndex + 4 < custom.getMaxFrameIndex(assets.animation`DragonNeck`)) {
                dragonMoveNeck(DragonNeckIndex + 4, 0)
            } else if (DragonNeckIndex < custom.getMaxFrameIndex(assets.animation`DragonNeck`)) {
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
function dragonFlapWings () {
    dragonMoveWing(custom.getMaxFrameIndex(assets.animation`DragonWing`), 10)
    Hero.ax = -50
    dragonMoveWing(0, 10)
    Hero.ax = 0
}
function dragonMoveForward (stepLength: number) {
    dragonMoveLegPair(DragonLegBack1, DragonLegFront1, true, stepLength)
    pause(100)
    dragonMoveLegPair(DragonLegBack2, DragonLegFront2, true, stepLength)
    pause(100)
}
function dragonRoar (msToRoar: number, pixelsToShake: number) {
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
function dragonMoveLegPair (myFirstLegSprite: Sprite, mySecondLegSprite: Sprite, myForwardIndicator: boolean, stepLength: number) {
    dragonMoveLeg(myFirstLegSprite, myForwardIndicator, stepLength)
    pause(100)
    dragonMoveLeg(mySecondLegSprite, myForwardIndicator, stepLength)
    scene.cameraShake(2, 100)
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.UntilDone)
}
function dragonMoveNeck (neckIndex: number, neckDelay: number) {
    if (DragonNeckIndex < neckIndex) {
        DragonNeckChange = 1
    } else {
        DragonNeckChange = -1
    }
    while (!(DragonNeckIndex == neckIndex)) {
        DragonNeckIndex += DragonNeckChange
        DragonNeck.setImage(custom.getFrame(assets.animation`DragonNeck`, DragonNeckIndex))
        DragonHead.x += -8 * DragonNeckChange / 33
        DragonHead.y += 30 * DragonNeckChange / 33
        pause(neckDelay)
    }
}
function dragonDeath () {
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
function dragonMoveWing (wingIndex: number, wingDelay: number) {
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
let DragonWingChange = 0
let DragonNeckChange = 0
let DragonFire: Sprite = null
let DragonMouthChange = 0
let DragonLegStepX = 0
let DragonWingFront: Sprite = null
let DragonLegBack2: Sprite = null
let DragonLegBack1: Sprite = null
let DragonLegFront2: Sprite = null
let DragonLegFront1: Sprite = null
let DragonTail: Sprite = null
let DragonBody: Sprite = null
let DragonHead: Sprite = null
let DragonNeck: Sprite = null
let DragonNeckRow = 0
let DragonNeckCol = 0
let Hero: Sprite = null
let myDragon: Dragon = null
let DragonBodyIndex = 0
let DragonTailIndex = 0
let DragonLegFrontIndex = 0
let DragonLegBackIndex = 0
let DragonWingIndex = 0
let DragonMouthIndex = 0
let DragonNeckIndex = 0
music.setVolume(255)
DragonNeckIndex = 0
DragonMouthIndex = 0
DragonWingIndex = 0
DragonLegBackIndex = 0
DragonLegFrontIndex = 0
DragonTailIndex = 0
DragonBodyIndex = 0
scene.setBackgroundImage(assets.image`Forest`)
tiles.setCurrentTilemap(tilemap`level1`)
initializeHeroVariables()
dragonCreate()
myDragon = dragon.create(SpriteKind.Player)
dragon.placeOnTile(myDragon, tiles.getTileLocation(6, 12))
