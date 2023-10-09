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
    HeroImageBackward = assets.image`WizBackward`
    HeroImageForward = assets.image`WizForward`
    HeroIsForward = true
    Hero = sprites.create(HeroImageForward, SpriteKind.Player)
}
function dragonCreate () {
    Dragon_Neck_Col = 13
    Dragon_Neck_Row = 12
    Dragon_Neck = sprites.create(custom.getFrame(assets.animation`DragonNeck`, 0), SpriteKind.Test)
    tiles.placeOnTile(Dragon_Neck, tiles.getTileLocation(Dragon_Neck_Col, Dragon_Neck_Row))
    Dragon_Neck.y += 8
    Dragon_Head = sprites.create(custom.getFrame(assets.animation`DragonHead`, 0), SpriteKind.Test)
    tiles.placeOnTile(Dragon_Head, tiles.getTileLocation(Dragon_Neck_Col - 2, Dragon_Neck_Row - 2))
    Dragon_Head.x += 10
    Dragon_Head.y += 24
    Dragon_Body = sprites.create(custom.getFrame(assets.animation`DragonBody`, 0), SpriteKind.Test)
    tiles.placeOnTile(Dragon_Body, tiles.getTileLocation(Dragon_Neck_Col + 3, Dragon_Neck_Row + 1))
    Dragon_Body.x += -6
    Dragon_Body.y += -6
    DragonTail = sprites.create(custom.getFrame(assets.animation`DragonTail`, 0), SpriteKind.Test)
    tiles.placeOnTile(DragonTail, tiles.getTileLocation(Dragon_Neck_Col + 7, Dragon_Neck_Row + 2))
    DragonTail.x += -6
    DragonTail.y += -2
    Dragon_Leg_Front1 = sprites.create(custom.getFrame(assets.animation`DragonLegFront`, 0), SpriteKind.Test)
    tiles.placeOnTile(Dragon_Leg_Front1, tiles.getTileLocation(Dragon_Neck_Col + 1, Dragon_Neck_Row + 2))
    Dragon_Leg_Front1.y += -5
    Dragon_Leg_Front2 = sprites.create(custom.getFrame(assets.animation`DragonLegFront`, 0), SpriteKind.Test)
    tiles.placeOnTile(Dragon_Leg_Front2, tiles.getTileLocation(Dragon_Neck_Col + 1, Dragon_Neck_Row + 2))
    Dragon_Leg_Front2.y += -5
    Dragon_Leg_Front2.z += -10
    Dragon_Leg_Back1 = sprites.create(custom.getFrame(assets.animation`DragonLegBack`, 0), SpriteKind.Test)
    tiles.placeOnTile(Dragon_Leg_Back1, tiles.getTileLocation(Dragon_Neck_Col + 4, Dragon_Neck_Row + 2))
    Dragon_Leg_Back1.y += -5
    Dragon_Leg_Back2 = sprites.create(custom.getFrame(assets.animation`DragonLegBack`, 0), SpriteKind.Test)
    tiles.placeOnTile(Dragon_Leg_Back2, tiles.getTileLocation(Dragon_Neck_Col + 4, Dragon_Neck_Row + 2))
    Dragon_Leg_Back2.y += -5
    Dragon_Leg_Back2.z += -10
    Dragon_Wing_Front = sprites.create(custom.getFrame(assets.animation`DragonWing`, 0), SpriteKind.Test)
    tiles.placeOnTile(Dragon_Wing_Front, tiles.getTileLocation(Dragon_Neck_Col + 3, Dragon_Neck_Row - 0))
    Dragon_Wing_Front.y += 8
    Dragon_Wing_Front.x += -9
}
function initializeHeroHealth () {
    HP = statusbars.create(20, 4, StatusBarKind.Health)
    HP.attachToSprite(Hero, 1, 0)
    HP.max = 99
    HP.value = 99
    HP.setColor(7, 2)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let index = 0; index < 4; index++) {
        dragonMoveForward(18)
    }
    pause(500)
    dragonRoar(1000, 4)
    dragonMoveMouth(custom.getMaxFrameIndex(assets.animation`DragonHead`), 10)
    pause(1300)
    dragonMoveMouth(0, 10)
    pause(1000)
    dragonMoveNeck(Math.round(custom.getMaxFrameIndex(assets.animation`DragonNeck`) / 2), 10)
    dragonMoveMouth(custom.getMaxFrameIndex(assets.animation`DragonHead`), 10)
    dragonShootFire(50)
    dragonMoveMouth(0, 10)
    pause(1000)
    dragonMoveNeck(custom.getMaxFrameIndex(assets.animation`DragonNeck`), 10)
    dragonMoveMouth(custom.getMaxFrameIndex(assets.animation`DragonHead`), 10)
    dragonShootFire(50)
    dragonMoveMouth(0, 10)
})
function dragonMoveLeg (myLegSprite: Sprite, myForwardIndicator: boolean, stepLength: number) {
    Dragon_Leg_Step_X = stepLength
    if (myForwardIndicator) {
        Dragon_Leg_Step_X = Dragon_Leg_Step_X * -1
    }
    myLegSprite.y += -4
    myLegSprite.x += Dragon_Leg_Step_X
    Dragon_Body.x += Dragon_Leg_Step_X / 4
    DragonTail.x += Dragon_Leg_Step_X / 4
    Dragon_Neck.x += Dragon_Leg_Step_X / 4
    Dragon_Head.x += Dragon_Leg_Step_X / 4
    Dragon_Wing_Front.x += Dragon_Leg_Step_X / 4
    pause(100)
    myLegSprite.y += 4
    pause(10)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    dragonMoveNeck(0, 10)
    dragonMoveLegPair(Dragon_Leg_Back1, Dragon_Leg_Front1, true, 4)
    dragonWeaken(2, false, 10)
    pause(100)
    dragonMoveLegPair(Dragon_Leg_Back2, Dragon_Leg_Front2, true, 4)
    dragonWeaken(2, false, 10)
    dragonRoar(1000, 4)
    dragonMoveMouth(custom.getMaxFrameIndex(assets.animation`DragonHead`), 10)
    pause(750)
    dragonMoveMouth(0, 10)
    pause(500)
    dragonMoveBackward(2)
    dragonWeaken(2, false, 10)
    dragonRoar(500, 2)
    dragonMoveMouth(Math.round(custom.getMaxFrameIndex(assets.animation`DragonHead`) / 2), 10)
    pause(500)
    dragonMoveMouth(0, 10)
    pause(250)
    dragonMoveForward(2)
    dragonRoar(250, 1)
    dragonMoveMouth(Math.round(custom.getMaxFrameIndex(assets.animation`DragonHead`) / 4), 10)
    pause(250)
    dragonMoveMouth(0, 10)
    pause(250)
    scene.cameraShake(8, 500)
    dragonWeaken(30, true, 0)
})
function dragonMoveMouth (mouthIndex: number, mouthDelay: number) {
    if (Dragon_Mouth_Index < mouthIndex) {
        Dragon_Mouth_Change = 1
    } else {
        Dragon_Mouth_Change = -1
    }
    while (!(Dragon_Mouth_Index == mouthIndex)) {
        Dragon_Mouth_Index += Dragon_Mouth_Change
        Dragon_Head.setImage(custom.getFrame(assets.animation`DragonHead`, Dragon_Mouth_Index))
        pause(mouthDelay)
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    HeroIsForward = false
    while (HeroCameraXOffset > -50 && HeroIsForward == false) {
        HeroCameraXOffset += -1
        pause(10)
    }
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    HeroIsForward = false
})
function dragonMoveBackward (stepLength: number) {
    dragonMoveLegPair(Dragon_Leg_Front2, Dragon_Leg_Back2, false, stepLength)
    pause(100)
    dragonMoveLegPair(Dragon_Leg_Front1, Dragon_Leg_Back1, false, stepLength)
    pause(100)
}
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    HeroIsForward = true
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Dragon_Fire_Kind, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprite.startEffect(effects.fire, 500)
})
function dragonShootFire (fireGrowthDelay: number) {
    if (Dragon_Mouth_Index == custom.getMaxFrameIndex(assets.animation`DragonHead`)) {
        Dragon_Fire = sprites.createProjectileFromSprite(assets.image`Fire`, Dragon_Head, -100, 0)
        Dragon_Fire.setKind(SpriteKind.Dragon_Fire_Kind)
        Dragon_Fire.z += -100
        Dragon_Fire.y += 3.5
        Dragon_Fire.x += 4
        Dragon_Fire.setScale(0.5, ScaleAnchor.Middle)
        for (let index = 0; index < 4; index++) {
            pause(fireGrowthDelay)
            Dragon_Fire.changeScale(0.125, ScaleAnchor.Middle)
            Dragon_Fire.vx += -12.5
        }
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    HeroIsForward = true
    while (HeroCameraXOffset < 50 && HeroIsForward == true) {
        HeroCameraXOffset += 1
        pause(10)
    }
})
function dragonWeaken (framesToProcess: number, moveNeckIndicator: boolean, msDelay: number) {
    for (let index = 0; index < framesToProcess; index++) {
        if (moveNeckIndicator && Dragon_Neck_Index + 4 < custom.getMaxFrameIndex(assets.animation`DragonNeck`)) {
            dragonMoveNeck(Dragon_Neck_Index + 4, 0)
        }
        if (DragonWingIndex < custom.getMaxFrameIndex(assets.animation`DragonWingDeath`)) {
            DragonWingIndex += 1
            Dragon_Wing_Front.setImage(custom.getFrame(assets.animation`DragonWingDeath`, DragonWingIndex))
        }
        if (DragonBodyIndex < custom.getMaxFrameIndex(assets.animation`DragonBody`)) {
            Dragon_Neck.y += 1
            Dragon_Head.y += 1
            DragonBodyIndex += 1
            Dragon_Body.setImage(custom.getFrame(assets.animation`DragonBody`, DragonBodyIndex))
        }
        if (DragonLegFrontIndex < custom.getMaxFrameIndex(assets.animation`DragonLegFront`)) {
            DragonLegFrontIndex += 1
            Dragon_Leg_Front1.setImage(custom.getFrame(assets.animation`DragonLegFront`, DragonLegFrontIndex))
            Dragon_Leg_Front2.setImage(custom.getFrame(assets.animation`DragonLegFront`, DragonLegFrontIndex))
        }
        if (DragonLegBackIndex < custom.getMaxFrameIndex(assets.animation`DragonLegBack`)) {
            DragonLegBackIndex += 1
            Dragon_Leg_Back1.setImage(custom.getFrame(assets.animation`DragonLegBack`, DragonLegBackIndex))
            Dragon_Leg_Back2.setImage(custom.getFrame(assets.animation`DragonLegBack`, DragonLegBackIndex))
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
function initializeHeroPower () {
    PP = statusbars.create(4, 20, StatusBarKind.Magic)
    PP.attachToSprite(Hero, 1, 0)
    PP.max = 50
    PP.value = 50
    PP.setColor(8, 15)
}
function dragonMoveForward (stepLength: number) {
    dragonMoveLegPair(Dragon_Leg_Back1, Dragon_Leg_Front1, true, stepLength)
    pause(100)
    dragonMoveLegPair(Dragon_Leg_Back2, Dragon_Leg_Front2, true, stepLength)
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
    if (Dragon_Neck_Index < neckIndex) {
        Dragon_Neck_Change = 1
    } else {
        Dragon_Neck_Change = -1
    }
    while (!(Dragon_Neck_Index == neckIndex)) {
        Dragon_Neck_Index += Dragon_Neck_Change
        Dragon_Neck.setImage(custom.getFrame(assets.animation`DragonNeck`, Dragon_Neck_Index))
        Dragon_Head.x += -8 * Dragon_Neck_Change / 33
        Dragon_Head.y += 30 * Dragon_Neck_Change / 33
        pause(neckDelay)
    }
}
function dragonMoveWing (wingIndex: number, wingDelay: number) {
    if (DragonWingIndex < wingIndex) {
        DragonWingChange = 1
    } else {
        DragonWingChange = -1
    }
    while (!(DragonWingIndex == wingIndex)) {
        DragonWingIndex += DragonWingChange
        Dragon_Wing_Front.setImage(custom.getFrame(assets.animation`DragonWing`, DragonWingIndex))
        pause(wingDelay)
    }
}
let DragonWingChange = 0
let Dragon_Neck_Change = 0
let PP: StatusBarSprite = null
let Dragon_Fire: Sprite = null
let Dragon_Mouth_Change = 0
let Dragon_Leg_Step_X = 0
let HP: StatusBarSprite = null
let Dragon_Wing_Front: Sprite = null
let Dragon_Leg_Back2: Sprite = null
let Dragon_Leg_Back1: Sprite = null
let Dragon_Leg_Front2: Sprite = null
let Dragon_Leg_Front1: Sprite = null
let DragonTail: Sprite = null
let Dragon_Body: Sprite = null
let Dragon_Head: Sprite = null
let Dragon_Neck: Sprite = null
let Dragon_Neck_Row = 0
let Dragon_Neck_Col = 0
let HeroIsForward = false
let HeroImageForward: Image = null
let HeroImageBackward: Image = null
let Hero: Sprite = null
let DragonBodyIndex = 0
let DragonTailIndex = 0
let DragonLegFrontIndex = 0
let DragonLegBackIndex = 0
let DragonWingIndex = 0
let Dragon_Mouth_Index = 0
let Dragon_Neck_Index = 0
let HeroCameraXOffset = 0
music.setVolume(255)
HeroCameraXOffset = 50
let IsMovingDragonHead = true
Dragon_Neck_Index = 0
Dragon_Mouth_Index = 0
DragonWingIndex = 0
DragonLegBackIndex = 0
DragonLegFrontIndex = 0
DragonTailIndex = 0
DragonBodyIndex = 0
initializeHeroVariables()
info.setScore(0)
scene.setBackgroundImage(assets.image`Forest`)
tiles.setCurrentTilemap(tilemap`level1`)
tiles.placeOnTile(Hero, tiles.getTileLocation(2, 13))
Hero.z += 100
initializeHeroHealth()
initializeHeroPower()
dragonCreate()
Hero.ay = 500
controller.moveSprite(Hero, 100, 0)
forever(function () {
    info.setScore(HeroCameraXOffset)
})
forever(function () {
    scene.centerCameraAt(Hero.x + HeroCameraXOffset, Hero.y)
})
