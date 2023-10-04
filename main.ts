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
    if (Dragon_Mouth_Index < custom.getMaxFrameIndex(assets.animation`Dragon_Mouth_Open`)) {
        Dragon_Mouth_Index += 1
        Dragon_Head.setImage(custom.getFrame(assets.animation`Dragon_Mouth_Open`, Dragon_Mouth_Index))
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
	
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    shootDragonFire()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    moveDragonLegPair(Dragon_Leg_Back1, Dragon_Leg_Front1, true)
    pause(100)
    moveDragonLegPair(Dragon_Leg_Back2, Dragon_Leg_Front2, true)
})
function test4 () {
    Dragon_Neck = sprites.create(assets.image`Dragon_Neck`, SpriteKind.Test)
    tiles.placeOnTile(Dragon_Neck, tiles.getTileLocation(8, 12))
    Dragon_Head = sprites.create(assets.image`Dragon_Head`, SpriteKind.Test)
    tiles.placeOnTile(Dragon_Head, tiles.getTileLocation(6, 10))
    Dragon_Head.x += 10
    Dragon_Head.y += 18
    Dragon_Body = sprites.create(assets.image`Dragon_Body`, SpriteKind.Test)
    tiles.placeOnTile(Dragon_Body, tiles.getTileLocation(11, 13))
    Dragon_Body.x += 4
    Dragon_Body.y += -8
    Dragon_Leg_Front1 = sprites.create(assets.image`Seg_4`, SpriteKind.Test)
    tiles.placeOnTile(Dragon_Leg_Front1, tiles.getTileLocation(9, 14))
    Dragon_Leg_Front1.y += -5
    Dragon_Leg_Back1 = sprites.create(assets.image`Seg_0`, SpriteKind.Test)
    tiles.placeOnTile(Dragon_Leg_Back1, tiles.getTileLocation(12, 14))
    Dragon_Leg_Back1.y += -5
    Dragon_Leg_Front2 = sprites.create(assets.image`Seg_4`, SpriteKind.Test)
    tiles.placeOnTile(Dragon_Leg_Front2, tiles.getTileLocation(9, 14))
    Dragon_Leg_Front2.y += -5
    Dragon_Leg_Front2.z += -10
    Dragon_Leg_Back2 = sprites.create(assets.image`Seg_0`, SpriteKind.Test)
    tiles.placeOnTile(Dragon_Leg_Back2, tiles.getTileLocation(12, 14))
    Dragon_Leg_Back2.y += -5
    Dragon_Leg_Back2.z += -10
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Dragon_Fire_Kind, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprite.startEffect(effects.fire, 500)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    moveDragonLegPair(Dragon_Leg_Back1, Dragon_Leg_Front1, false)
    pause(100)
    moveDragonLegPair(Dragon_Leg_Back2, Dragon_Leg_Front2, false)
})
function initializeHeroPower () {
    PP = statusbars.create(4, 20, StatusBarKind.Magic)
    PP.attachToSprite(Hero, 1, 0)
    PP.max = 50
    PP.value = 50
    PP.setColor(8, 15)
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Dragon_Mouth_Index > 0) {
        Dragon_Mouth_Index += -1
        Dragon_Head.setImage(custom.getFrame(assets.animation`Dragon_Mouth_Open`, Dragon_Mouth_Index))
    }
})
function moveDragonLegPair (myFirstLegSprite: Sprite, mySecondLegSprite: Sprite, myForwardIndicator: boolean) {
    moveDragonLeg(myFirstLegSprite, myForwardIndicator)
    pause(100)
    moveDragonLeg(mySecondLegSprite, myForwardIndicator)
    if (myForwardIndicator) {
        Dragon_Body.x += -3
        Dragon_Neck.x += -3
        Dragon_Head.x += -3
    } else {
        Dragon_Body.x += 3
        Dragon_Neck.x += 3
        Dragon_Head.x += 3
    }
}
function moveDragonLeg (myLegSprite: Sprite, myForwardIndicator: boolean) {
    if (myForwardIndicator) {
        myLegSprite.y += -4
        myLegSprite.x += -6
        pause(100)
        myLegSprite.y += 4
    } else {
        myLegSprite.y += -4
        myLegSprite.x += 6
        pause(100)
        myLegSprite.y += 4
    }
}
function shootDragonFire () {
    if (Dragon_Mouth_Index == custom.getMaxFrameIndex(assets.animation`Dragon_Mouth_Open`)) {
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
let Dragon_Fire: Sprite = null
let PP: StatusBarSprite = null
let Dragon_Body: Sprite = null
let Dragon_Neck: Sprite = null
let Dragon_Leg_Front2: Sprite = null
let Dragon_Leg_Back2: Sprite = null
let Dragon_Leg_Front1: Sprite = null
let Dragon_Leg_Back1: Sprite = null
let HP: StatusBarSprite = null
let Dragon_Head: Sprite = null
let HeroIsForward = false
let HeroImageBackwardCrouch: Image = null
let HeroImageForwardCrouch: Image = null
let HeroImageForward: Image = null
let HeroImageBackward: Image = null
let Hero: Sprite = null
let Dragon_Mouth_Index = 0
let Dragon_Neck_Index = 0
Dragon_Mouth_Index = 0
initializeHeroVariables()
info.setScore(0)
scene.setBackgroundImage(assets.image`Forest`)
tiles.setCurrentTilemap(tilemap`level1`)
tiles.placeOnTile(Hero, tiles.getTileLocation(10, 13))
initializeHeroHealth()
initializeHeroPower()
test4()
scene.cameraFollowSprite(Hero)
Hero.ay = 500
