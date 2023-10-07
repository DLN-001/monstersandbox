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
    HeroImageForwardCrouch = assets.image`WizCrouchForward`
    HeroImageBackwardCrouch = assets.image`WizCrouchBackward`
    HeroIsForward = true
    Hero = sprites.create(HeroImageForward, SpriteKind.Player)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (IsMovingDragonHead) {
        if (Dragon_Mouth_Index < custom.getMaxFrameIndex(assets.animation`Dragon_Head`)) {
            Dragon_Mouth_Index += 1
            Dragon_Head.setImage(custom.getFrame(assets.animation`Dragon_Head`, Dragon_Mouth_Index))
        }
    } else {
        if (Dragon_Neck_Index > 0) {
            Dragon_Neck_Index += -1
            Dragon_Neck.setImage(custom.getFrame(assets.animation`Dragon_Neck`, Dragon_Neck_Index))
            Dragon_Head.x += 8 / 33
            Dragon_Head.y += -30 / 33
        }
    }
})
function initializeHeroHealth () {
    HP = statusbars.create(20, 4, StatusBarKind.Health)
    HP.attachToSprite(Hero, 1, 0)
    HP.max = 99
    HP.value = 99
    HP.setColor(7, 2)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    music.setVolume(255)
    for (let index = 0; index < 4; index++) {
        moveDragonLegPair(Dragon_Leg_Back1, Dragon_Leg_Front1, true)
        pause(100)
        moveDragonLegPair(Dragon_Leg_Back2, Dragon_Leg_Front2, true)
        pause(100)
    }
    pause(500)
    music.play(music.createSoundEffect(WaveShape.Noise, 196, 196, 246, 255, 1000, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    scene.cameraShake(4, 1500)
    for (let index = 0; index <= custom.getMaxFrameIndex(assets.animation`Dragon_Head`); index++) {
        Dragon_Head.setImage(custom.getFrame(assets.animation`Dragon_Head`, index))
        pause(10)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.setVolume(255)
    for (let index = 0; index < 4; index++) {
        moveDragonLegPair(Dragon_Leg_Back2, Dragon_Leg_Front2, false)
        pause(100)
        moveDragonLegPair(Dragon_Leg_Back1, Dragon_Leg_Front1, false)
        pause(100)
    }
    pause(500)
    music.play(music.createSoundEffect(WaveShape.Noise, 196, 196, 246, 255, 1000, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    scene.cameraShake(4, 1500)
    for (let index = 0; index <= custom.getMaxFrameIndex(assets.animation`Dragon_Head`); index++) {
        Dragon_Head.setImage(custom.getFrame(assets.animation`Dragon_Head`, index))
        pause(10)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    HeroIsForward = false
    while (HeroCameraXOffset > -50 && HeroIsForward == false) {
        HeroCameraXOffset += -1
        pause(10)
    }
})
function test4 () {
    Dragon_Neck_Col = 13
    Dragon_Neck_Row = 12
    Dragon_Neck = sprites.create(custom.getFrame(assets.animation`Dragon_Neck`, 0), SpriteKind.Test)
    tiles.placeOnTile(Dragon_Neck, tiles.getTileLocation(Dragon_Neck_Col, Dragon_Neck_Row))
    Dragon_Neck.y += 8
    Dragon_Head = sprites.create(custom.getFrame(assets.animation`Dragon_Head`, 0), SpriteKind.Test)
    tiles.placeOnTile(Dragon_Head, tiles.getTileLocation(Dragon_Neck_Col - 2, Dragon_Neck_Row - 2))
    Dragon_Head.x += 10
    Dragon_Head.y += 24
    Dragon_Body = sprites.create(assets.image`Dragon_Body`, SpriteKind.Test)
    tiles.placeOnTile(Dragon_Body, tiles.getTileLocation(Dragon_Neck_Col + 3, Dragon_Neck_Row + 1))
    Dragon_Body.x += 0
    Dragon_Body.y += -6
    Dragon_Leg_Front1 = sprites.create(assets.image`Dragon_Leg_Front`, SpriteKind.Test)
    tiles.placeOnTile(Dragon_Leg_Front1, tiles.getTileLocation(Dragon_Neck_Col + 1, Dragon_Neck_Row + 2))
    Dragon_Leg_Front1.y += -5
    Dragon_Leg_Front2 = sprites.create(assets.image`Dragon_Leg_Front`, SpriteKind.Test)
    tiles.placeOnTile(Dragon_Leg_Front2, tiles.getTileLocation(Dragon_Neck_Col + 1, Dragon_Neck_Row + 2))
    Dragon_Leg_Front2.y += -5
    Dragon_Leg_Front2.z += -10
    Dragon_Leg_Back1 = sprites.create(assets.image`Dragon_Leg_Back`, SpriteKind.Test)
    tiles.placeOnTile(Dragon_Leg_Back1, tiles.getTileLocation(Dragon_Neck_Col + 4, Dragon_Neck_Row + 2))
    Dragon_Leg_Back1.y += -5
    Dragon_Leg_Back2 = sprites.create(assets.image`Dragon_Leg_Back`, SpriteKind.Test)
    tiles.placeOnTile(Dragon_Leg_Back2, tiles.getTileLocation(Dragon_Neck_Col + 4, Dragon_Neck_Row + 2))
    Dragon_Leg_Back2.y += -5
    Dragon_Leg_Back2.z += -10
    Dragon_Wing_Front = sprites.create(custom.getFrame(assets.animation`Dragon_Wing_Flap`, 0), SpriteKind.Test)
    tiles.placeOnTile(Dragon_Wing_Front, tiles.getTileLocation(Dragon_Neck_Col + 3, Dragon_Neck_Row - 1))
    Dragon_Wing_Front.y += 10
    Dragon_Wing_Front.x += -9
}
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    HeroIsForward = false
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    HeroIsForward = true
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Dragon_Fire_Kind, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprite.startEffect(effects.fire, 500)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    HeroIsForward = true
    while (HeroCameraXOffset < 50 && HeroIsForward == true) {
        HeroCameraXOffset += 1
        pause(10)
    }
})
function initializeHeroPower () {
    PP = statusbars.create(4, 20, StatusBarKind.Magic)
    PP.attachToSprite(Hero, 1, 0)
    PP.max = 50
    PP.value = 50
    PP.setColor(8, 15)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (IsMovingDragonHead) {
        if (Dragon_Mouth_Index > 0) {
            Dragon_Mouth_Index += -1
            Dragon_Head.setImage(custom.getFrame(assets.animation`Dragon_Head`, Dragon_Mouth_Index))
        }
    } else {
        if (Dragon_Neck_Index < custom.getMaxFrameIndex(assets.animation`Dragon_Neck`)) {
            Dragon_Neck_Index += 1
            Dragon_Neck.setImage(custom.getFrame(assets.animation`Dragon_Neck`, Dragon_Neck_Index))
            Dragon_Head.x += -8 / 33
            Dragon_Head.y += 30 / 33
        }
    }
})
function moveDragonLegPair (myFirstLegSprite: Sprite, mySecondLegSprite: Sprite, myForwardIndicator: boolean) {
    moveDragonLeg(myFirstLegSprite, myForwardIndicator)
    pause(100)
    moveDragonLeg(mySecondLegSprite, myForwardIndicator)
    scene.cameraShake(2, 100)
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.UntilDone)
}
function moveDragonLeg (myLegSprite: Sprite, myForwardIndicator: boolean) {
    Dragon_Leg_Step_X = 18
    if (myForwardIndicator) {
        Dragon_Leg_Step_X = Dragon_Leg_Step_X * -1
    }
    myLegSprite.y += -4
    myLegSprite.x += Dragon_Leg_Step_X
    Dragon_Body.x += Dragon_Leg_Step_X / 4
    Dragon_Neck.x += Dragon_Leg_Step_X / 4
    Dragon_Head.x += Dragon_Leg_Step_X / 4
    Dragon_Wing_Front.x += Dragon_Leg_Step_X / 4
    pause(100)
    myLegSprite.y += 4
    pause(10)
}
function shootDragonFire () {
    if (Dragon_Mouth_Index == custom.getMaxFrameIndex(assets.animation`Dragon_Head`)) {
        Dragon_Fire = sprites.createProjectileFromSprite(assets.image`Fire`, Dragon_Head, -100, 0)
        Dragon_Fire.setKind(SpriteKind.Dragon_Fire_Kind)
        Dragon_Fire.z += -100
        Dragon_Fire.y += 3.5
        Dragon_Fire.x += 4
        Dragon_Fire.setScale(0.5, ScaleAnchor.Middle)
        for (let index = 0; index < 4; index++) {
            pause(50)
            Dragon_Fire.changeScale(0.125, ScaleAnchor.Middle)
            Dragon_Fire.vx += -12.5
        }
    }
}
function dragon_flag_wings () {
    for (let index = 0; index <= custom.getMaxFrameIndex(assets.animation`Dragon_Wing_Flap`); index++) {
        Dragon_Wing_Front.setImage(custom.getFrame(assets.animation`Dragon_Wing_Flap`, index))
        pause(10)
    }
    Hero.ax = -50
    for (let index = 0; index <= custom.getMaxFrameIndex(assets.animation`Dragon_Wing_Flap`); index++) {
        Dragon_Wing_Front.setImage(custom.getFrame(assets.animation`Dragon_Wing_Flap`, custom.getMaxFrameIndex(assets.animation`Dragon_Wing_Flap`) - index))
        pause(10)
    }
    Hero.ax = 0
}
let Dragon_Fire: Sprite = null
let Dragon_Leg_Step_X = 0
let PP: StatusBarSprite = null
let Dragon_Wing_Front: Sprite = null
let Dragon_Body: Sprite = null
let Dragon_Neck_Row = 0
let Dragon_Neck_Col = 0
let Dragon_Leg_Front2: Sprite = null
let Dragon_Leg_Back2: Sprite = null
let Dragon_Leg_Front1: Sprite = null
let Dragon_Leg_Back1: Sprite = null
let HP: StatusBarSprite = null
let Dragon_Neck: Sprite = null
let Dragon_Head: Sprite = null
let HeroIsForward = false
let HeroImageBackwardCrouch: Image = null
let HeroImageForwardCrouch: Image = null
let HeroImageForward: Image = null
let HeroImageBackward: Image = null
let Hero: Sprite = null
let Dragon_Mouth_Index = 0
let Dragon_Neck_Index = 0
let IsMovingDragonHead = false
let HeroCameraXOffset = 0
HeroCameraXOffset = 50
IsMovingDragonHead = true
Dragon_Neck_Index = 0
Dragon_Mouth_Index = 0
let Dragon_Wing_Index = 0
initializeHeroVariables()
info.setScore(0)
scene.setBackgroundImage(assets.image`Forest`)
tiles.setCurrentTilemap(tilemap`level1`)
tiles.placeOnTile(Hero, tiles.getTileLocation(2, 13))
initializeHeroHealth()
initializeHeroPower()
test4()
Hero.ay = 500
controller.moveSprite(Hero, 100, 0)
forever(function () {
    info.setScore(HeroCameraXOffset)
})
forever(function () {
    scene.centerCameraAt(Hero.x + HeroCameraXOffset, Hero.y)
})
