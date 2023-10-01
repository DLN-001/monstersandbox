@namespace
class SpriteKind:
    Spell = SpriteKind.create()
    Skeleton = SpriteKind.create()
    Test = SpriteKind.create()
@namespace
class StatusBarKind:
    scel_helth = StatusBarKind.create()
    Mush_manHP = StatusBarKind.create()
def initializeHeroVariables():
    global HeroImageBackward, HeroImageForward, HeroImageForwardCrouch, HeroImageBackwardCrouch, HeroIsForward, Hero
    HeroImageBackward = assets.image("""
        WizBackward
    """)
    HeroImageForward = assets.image("""
        WizForward
    """)
    HeroImageForwardCrouch = assets.image("""
        WizCrouchForward
    """)
    HeroImageBackwardCrouch = assets.image("""
        WizCrouchBackward
    """)
    HeroIsForward = True
    Hero = sprites.create(HeroImageForward, SpriteKind.player)

def on_overlap_tile(sprite, location):
    global HeroIsAbleToCrouch
    HeroIsAbleToCrouch = True
    tiles.set_tile_at(location, assets.tile("""
        transparency16
    """))
    game.show_long_text("Crouch Power togel down to crouch!", DialogLayout.BOTTOM)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile0
    """),
    on_overlap_tile)

def on_overlap_tile2(sprite2, location2):
    HP.value += 5
    tiles.set_tile_at(location2, assets.tile("""
        transparency16
    """))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile1
    """),
    on_overlap_tile2)

def on_up_pressed():
    Hero.vy = -200
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def initializeHeroHealth():
    global HP
    HP = statusbars.create(20, 4, StatusBarKind.health)
    HP.attach_to_sprite(Hero, 1, 0)
    HP.max = 99
    HP.value = 99
    HP.set_color(7, 2)

def on_overlap_tile3(sprite3, location3):
    info.change_score_by(1)
    tiles.set_tile_at(location3, assets.tile("""
        transparency16
    """))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Coin
    """),
    on_overlap_tile3)

def on_overlap_tile4(sprite4, location4):
    HP.value += -2
    Hero.say_text("Ouch!", 500, True)
    Hero.vy = -100
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile
    """),
    on_overlap_tile4)

def on_a_pressed():
    global spell
    if PP.value > 0:
        spell = sprites.create(assets.image("""
            Spell1
        """), SpriteKind.Spell)
        if HeroIsForward == True:
            spell = sprites.create_projectile_from_sprite(assets.image("""
                Spell1
            """), Hero, 100, 0)
        else:
            spell = sprites.create_projectile_from_sprite(assets.image("""
                Spell1
            """), Hero, -100, 0)
        spell.set_flag(SpriteFlag.DESTROY_ON_WALL, True)
        PP.value += -5
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_overlap_tile5(sprite5, location5):
    HP.value += -2
    Hero.say_text("Ouch!", 500, True)
    Hero.vy = -100
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.hazard_lava0,
    on_overlap_tile5)

def on_left_pressed():
    global HeroIsForward
    if HeroIsCrouching == True:
        Hero.set_image(HeroImageBackwardCrouch)
    else:
        Hero.set_image(HeroImageBackward)
    HeroIsForward = False
    PP.attach_to_sprite(Hero, -22, 0)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_right_pressed():
    global HeroIsForward
    if HeroIsCrouching == True:
        Hero.set_image(HeroImageForwardCrouch)
    else:
        Hero.set_image(HeroImageForward)
    HeroIsForward = True
    PP.attach_to_sprite(Hero, 1, 0)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def initializeHeroPower():
    global PP
    PP = statusbars.create(4, 20, StatusBarKind.magic)
    PP.attach_to_sprite(Hero, 1, 0)
    PP.max = 50
    PP.value = 50
    PP.set_color(8, 15)
def test():
    pass

def on_down_pressed():
    global HeroIsCrouching
    if HeroIsAbleToCrouch == True:
        if HeroIsCrouching == True:
            if Hero.image == HeroImageForwardCrouch:
                Hero.set_image(HeroImageForward)
            if Hero.image == HeroImageBackwardCrouch:
                Hero.set_image(HeroImageBackward)
        else:
            if Hero.image == HeroImageForward:
                Hero.set_image(HeroImageForwardCrouch)
            if Hero.image == HeroImageBackward:
                Hero.set_image(HeroImageBackwardCrouch)
        HeroIsCrouching = not (HeroIsCrouching)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

move_scel = 0
HeroIsCrouching = False
spell: Sprite = None
PP: StatusBarSprite = None
HP: StatusBarSprite = None
HeroIsAbleToCrouch = False
HeroIsForward = False
HeroImageBackwardCrouch: Image = None
HeroImageForwardCrouch: Image = None
HeroImageForward: Image = None
HeroImageBackward: Image = None
Hero: Sprite = None
initializeHeroVariables()
info.set_score(0)
scene.set_background_image(assets.image("""
    Forest
"""))
tiles.set_current_tilemap(tilemap("""
    level1
"""))
controller.move_sprite(Hero, 100, 0)
tiles.place_on_tile(Hero, tiles.get_tile_location(2, 13))
initializeHeroHealth()
initializeHeroPower()
scene.camera_follow_sprite(Hero)
test()
Hero.ay = 500
sceletin = sprites.create(assets.image("""
    Skeleton
"""), SpriteKind.Skeleton)
tiles.place_on_tile(sceletin, tiles.get_tile_location(34, 14))
scel_HP = statusbars.create(20, 4, StatusBarKind.scel_helth)
scel_HP.attach_to_sprite(sceletin, 2, 0)
scel_HP.max = 10
scel_HP.value = 10
scel_HP.set_color(2, 15)

def on_forever():
    if HP.value == 0:
        game.game_over(False)
forever(on_forever)

def on_update_interval():
    global move_scel
    move_scel = randint(1, 2)
    if move_scel == 1:
        sceletin.set_velocity(-50, 0)
    if move_scel == 2:
        sceletin.set_velocity(50, 0)
game.on_update_interval(500, on_update_interval)
