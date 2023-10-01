namespace SpriteKind {
    export const Spell = SpriteKind.create()
    export const Skeleton = SpriteKind.create()
    export const Test = SpriteKind.create()
    export const Dragon_Fire = SpriteKind.create()
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
function topAlign (mySprite: Sprite, mySprite2: Sprite) {
    if (mySprite.vy < 0) {
        if (mySprite.bottom <= mySprite2.y + 4) {
            mySprite.setVelocity(0, 0)
            mySprite.bottom = mySprite2.y + 4
        }
    } else {
        if (mySprite.vy > 0) {
            if (mySprite.top >= mySprite2.y + -4) {
                mySprite.setVelocity(0, 0)
                mySprite.top = mySprite2.y + -4
            }
        }
    }
}
function DragonMoveHeadTopToMiddle () {
    Dragon_Is_Head_Moving = true
    Dragon_Head.setVelocity(-5, 10)
    animation.runImageAnimation(
    Dragon_Neck,
    assets.animation`N_Down_Middle`,
    100,
    false
    )
    pause(1700)
    Dragon_Head.vx = 0
    pause(300)
    Dragon_Head.vy = 0
    Dragon_Head_Position = 1
    Dragon_Is_Head_Moving = false
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Dragon_Is_Head_Moving == false) {
        if (Dragon_Head_Position == 1) {
            DragonMoveHeadMiddleToTop()
        } else {
            if (Dragon_Head_Position == 2) {
                DragonMoveHeadBottomToMiddle()
            }
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
    if (Dragon_Is_Mouth_Open) {
        animation.runImageAnimation(
        Dragon_Head,
        assets.animation`Dragon_Mouth_Closed`,
        100,
        false
        )
        Dragon_Is_Mouth_Open = false
    } else {
        animation.runImageAnimation(
        Dragon_Head,
        assets.animation`Dragon_Mouth_Open`,
        100,
        false
        )
        Dragon_Is_Mouth_Open = true
    }
})
function DragonMoveHeadMiddleToBottom () {
    Dragon_Is_Head_Moving = true
    Dragon_Head_Position = 2
    Dragon_Head.vy = 10
    animation.runImageAnimation(
    Dragon_Neck,
    assets.animation`N_Down_Bottom`,
    100,
    false
    )
    pause(1700)
    Dragon_Head.vy = 0
    Dragon_Is_Head_Moving = false
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Dragon_Is_Mouth_Open) {
        Dragon_Fire2 = sprites.createProjectileFromSprite(assets.image`Fire`, Dragon_Head, -100, 0)
        Dragon_Fire2.setKind(SpriteKind.Dragon_Fire)
        Dragon_Fire2.z += -100
        Dragon_Fire2.y += 4
        Dragon_Fire2.x += 4
        Dragon_Fire2.setScale(0.5, ScaleAnchor.Middle)
        for (let index = 0; index < 4; index++) {
            pause(50)
            Dragon_Fire2.changeScale(0.125, ScaleAnchor.Middle)
            Dragon_Fire2.vx += -12.5
        }
    }
})
function test3 (Speed: number) {
    Segment5.setVelocity(0, Speed)
    Segment4.setVelocity(0, Speed * 1)
    Segment3.setVelocity(0, Speed * 1)
    Segment2.setVelocity(0, Speed * 1)
}
function DragonMoveHeadMiddleToTop () {
    Dragon_Is_Head_Moving = true
    Dragon_Head.vy = -10
    pause(300)
    Dragon_Head.vx = 5
    animation.runImageAnimation(
    Dragon_Neck,
    assets.animation`N_Up_Top`,
    100,
    false
    )
    pause(1700)
    Dragon_Head.setVelocity(0, 0)
    Dragon_Head_Position = 0
    Dragon_Is_Head_Moving = false
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Index += 1
    if (Index <= custom.getMaxFrameIndex(assets.animation`N_Down_Middle`)) {
        Dragon_Neck.setImage(custom.getFrame(assets.animation`N_Down_Middle`, Index))
    }
})
function test4 () {
    Dragon_Head_Position = 0
    Dragon_Is_Head_Moving = false
    Dragon_Is_Mouth_Open = false
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
}
function test2 (Speed: number) {
    Segment2.setVelocity(0, Speed)
    Segment3.setVelocity(0, Speed * 1.25)
    Segment4.setVelocity(0, Speed * 1.5)
    Segment5.setVelocity(0, Speed * 1.75)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Dragon_Fire, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    sprite.startEffect(effects.fire, 500)
})
function initializeHeroPower () {
    PP = statusbars.create(4, 20, StatusBarKind.Magic)
    PP.attachToSprite(Hero, 1, 0)
    PP.max = 50
    PP.value = 50
    PP.setColor(8, 15)
}
function test () {
    Segment1 = sprites.create(assets.image`Segment_1`, SpriteKind.Test)
    Segment2 = sprites.create(assets.image`Segment_1`, SpriteKind.Test)
    Segment3 = sprites.create(assets.image`Segment_1`, SpriteKind.Test)
    Segment4 = sprites.create(assets.image`Segment_1`, SpriteKind.Test)
    Segment5 = sprites.create(assets.image`Segment_1`, SpriteKind.Test)
    tiles.placeOnTile(Segment1, tiles.getTileLocation(8, 12))
    tiles.placeOnTile(Segment2, tiles.getTileLocation(8, 12))
    tiles.placeOnTile(Segment3, tiles.getTileLocation(8, 12))
    tiles.placeOnTile(Segment4, tiles.getTileLocation(8, 12))
    tiles.placeOnTile(Segment5, tiles.getTileLocation(8, 12))
    Segment1.x += 16
    Segment1.y += 16
    Segment2.x += 12
    Segment2.y += 12
    Segment3.x += 8
    Segment3.y += 8
    Segment4.x += 4
    Segment4.y += 4
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Dragon_Is_Head_Moving == false) {
        if (Dragon_Head_Position == 0) {
            DragonMoveHeadTopToMiddle()
        } else {
            if (Dragon_Head_Position == 1) {
                DragonMoveHeadMiddleToBottom()
            }
        }
    }
})
function DragonMoveHeadBottomToMiddle () {
    Dragon_Is_Head_Moving = true
    Dragon_Head_Position = 1
    Dragon_Head.vy = -10
    animation.runImageAnimation(
    Dragon_Neck,
    assets.animation`N_Up_Middle`,
    100,
    false
    )
    pause(1700)
    Dragon_Head.vy = 0
    Dragon_Is_Head_Moving = false
}
let Segment1: Sprite = null
let PP: StatusBarSprite = null
let Dragon_Body: Sprite = null
let Segment2: Sprite = null
let Segment3: Sprite = null
let Segment4: Sprite = null
let Segment5: Sprite = null
let Dragon_Fire2: Sprite = null
let Dragon_Is_Mouth_Open = false
let HP: StatusBarSprite = null
let Dragon_Head_Position = 0
let Dragon_Neck: Sprite = null
let Dragon_Head: Sprite = null
let Dragon_Is_Head_Moving = false
let HeroIsForward = false
let HeroImageBackwardCrouch: Image = null
let HeroImageForwardCrouch: Image = null
let HeroImageForward: Image = null
let HeroImageBackward: Image = null
let Hero: Sprite = null
let Index = 0
Index = 0
initializeHeroVariables()
info.setScore(0)
scene.setBackgroundImage(assets.image`Forest`)
tiles.setCurrentTilemap(tilemap`level1`)
tiles.placeOnTile(Hero, tiles.getTileLocation(2, 13))
initializeHeroHealth()
initializeHeroPower()
test4()
scene.cameraFollowSprite(Hero)
Hero.ay = 500
forever(function () {
    if (HP.value == 0) {
        game.gameOver(false)
    }
})
