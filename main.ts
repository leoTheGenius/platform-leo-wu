namespace SpriteKind {
    export const platform = SpriteKind.create()
    export const spike = SpriteKind.create()
    export const finish = SpriteKind.create()
    export const portal = SpriteKind.create()
}
/**
 * Basically the timer is counted in the form of score, starting at the time when you finish the splash text at the beginning, captured as starttime. The score display shows current time-starttime/1000 to get it in seconds, and on the finish, it shows your time then game over. There are levels, which took quite a long timme to make, because I needed to make rectangles and spikes and stuff, and I figured I would just make function for each type, makeplatform, makeespike... and when you get to the level after the last level, it triggers splash of your time then game over. The "normal" mode and "ball" mode control can be seen in the when controller "A" button pressed block, with an if/else statement to check the mode. In normal mode, it checks if you are on the ground and sets your velocity to -150, moving you up. The force bringing you down is at the at start block, where player1 acceleration is set to 300, which pulls you down. This makes the going up fast then slow down then fall, instead of snappy just up and down. The way the levels work is I saved them into function loadlevel, which does some resets and clears the level by making all sprite types to self-destruct, then based on the level number called, it will load up new sprites to form the new level. In the overlapping portal block, it controls the level+1 part and calls loadlevel. Also, the reason the player sprite is called player1 instead of just "player" is because there already exists a sprite kind called player, and it gives errors if I use it. For the platforms, in on game update (the big one), it takes every platform and puts it in an array. It checks if the player is on it or hitting the bottom of it, and stops them from going through.
 */
sprites.onOverlap(SpriteKind.Player, SpriteKind.spike, function (sprite, otherSprite) {
    level = 1
    mode = "normal"
    player1.ay = 300
    loadlevel(level)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.finish, function (sprite, otherSprite) {
    level += 1
    loadlevel(level)
})
function loadlevel (n: number) {
    clearlevel()
    player1.x = 20
    player1.y = 120
    portalready = true
    mode = "normal"
    if (n == 1) {
        makeplatform(80, 100, 60, 10)
        makeplatform(140, 60, 40, 10)
        makespike(100, 94)
        makespike(96, 94)
        makespike(92, 94)
        makefinish(150, 40)
    }
    if (n == 2) {
        makespike(35, 4)
        makespike(35, 10)
        makespike(35, 16)
        makespike(35, 22)
        makespike(35, 28)
        makespike(35, 34)
        makespike(35, 40)
        makespike(35, 46)
        makespike(35, 52)
        makespike(35, 58)
        makespike(35, 94)
        makespike(35, 100)
        makespike(35, 106)
        makespike(35, 112)
        makespike(35, 118)
        makespike(35, 124)
        makespike(35, 130)
        makespike(35, 136)
        makespike(35, 142)
        makespike(35, 148)
        makespike(35, 154)
        makeplatform(80, 110, 90, 40)
        makeplatform(80, 30, 90, 60)
        makeportal(44, 78)
        makespike(70, 89)
        makespike(74, 89)
        makespike(88, 62)
        makespike(92, 62)
        makespike(106, 89)
        makespike(110, 89)
        makefinish(150, 115)
    }
    if (n == 3) {
        makeplatform(65, 105, 35, 5)
        makeplatform(110, 80, 40, 5)
        makeportal(150, 40)
        makeplatform(0, 30, 85, 5)
        makespike(40, 40)
        makespike(40, 36)
        makespike(40, 32)
        makespike(40, 44)
        makespike(40, 48)
        makespike(40, 52)
        makespike(40, 56)
        makespike(40, 60)
        makespike(64, 40)
        makespike(64, 44)
        makespike(64, 48)
        makespike(64, 52)
        makespike(64, 56)
        makespike(64, 60)
        makespike(64, 64)
        makespike(64, 68)
        makespike(64, 72)
        makespike(64, 74)
        makespike(64, 36)
        makespike(64, 32)
        makespike(64, 28)
        makespike(64, 24)
        makespike(64, 20)
        makespike(64, 16)
        makespike(64, 12)
        makespike(64, 8)
        makespike(64, 4)
        makespike(25, 4)
        makeplatform(40, 80, 50, 5)
        makefinish(10, 25)
    }
    if (n == 4) {
        game.splash("" + (game.runtime() - starttime) / 1000 + "seconds")
        game.gameOver(true)
    }
}
function makeplatform (x: number, y: number, w: number, h: number) {
    p = sprites.create(image.create(w, h), SpriteKind.platform)
    p.image.fill(9)
    p.x = x
    p.y = y
    return p
}
function makeportal (x: number, y: number) {
    q = sprites.create(img`
        . . . . 9 9 9 9 9 9 9 9 . . . . 
        . . 9 9 9 . . . . . . 9 9 . . . 
        . 9 9 . . 9 9 9 9 . . . 9 9 . . 
        9 9 . 9 9 9 . . 9 9 9 . . 9 9 . 
        9 . . 9 . . . . . . 9 9 . . 9 . 
        9 . 9 9 . 9 9 9 9 . . 9 9 . 9 . 
        9 . 9 . 9 9 . . 9 9 9 . 9 . 9 9 
        9 . 9 . 9 . . . . . 9 . . 9 . 9 
        9 . 9 . . 9 9 9 . . 9 . . 9 . 9 
        9 . 9 9 . . . . . . 9 . . 9 . 9 
        9 . . 9 . . . 9 9 9 . . . 9 . 9 
        9 9 . 9 9 9 9 9 . . . . 9 9 . 9 
        9 9 . . . . . . 9 9 9 9 9 . . 9 
        . 9 . . . 9 9 9 9 . . . . . . 9 
        . 9 9 9 9 . . . . . 9 9 9 9 9 9 
        . . . 9 9 9 9 9 9 9 9 9 . . . . 
        `, SpriteKind.portal)
    q.x = x
    q.y = y
    return q
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mode == "normal") {
        if (grounded) {
            player1.vy = -150
        }
    } else {
        player1.ay = 0 - player1.ay
        if (player1.ay > 0) {
            player1.vy = 150
        } else {
            player1.vy = -150
        }
    }
})
function makefinish (x: number, y: number) {
    f = sprites.create(img`
        5 5 5 5 5 
        5 . . . 5 
        5 . 5 . 5 
        5 . . . 5 
        5 5 5 5 5 
        `, SpriteKind.finish)
    f.x = x
    f.y = y
    return f
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.portal, function (sprite, otherSprite) {
    if (portalready) {
        if (mode == "normal") {
            mode = "ball"
        } else {
            mode = "normal"
            player1.ay = 300
            player1.vy = 0
        }
        portalready = false
    }
})
function clearlevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.platform)
    sprites.destroyAllSpritesOfKind(SpriteKind.spike)
    sprites.destroyAllSpritesOfKind(SpriteKind.finish)
    sprites.destroyAllSpritesOfKind(SpriteKind.portal)
}
function makespike (x: number, y: number) {
    s = sprites.create(img`
        . 2 . 
        2 2 2 
        2 2 2 
        `, SpriteKind.spike)
    s.x = x
    s.y = y
    return s
}
let touching = false
let bottom = false
let top = false
let s: Sprite = null
let f: Sprite = null
let grounded = false
let q: Sprite = null
let p: Sprite = null
let player1: Sprite = null
let portalready = false
let mode = ""
let level = 0
let starttime = 0
game.splash("platform thingy", "try it")
game.splash("basically left/right to ", "move left and right and a to jump, ")
game.splash("and there is blue portal thing ", "if you cross it then you change into a different gamemode wheere a switches your gravity")
game.splash("if you touch spike reset", "also i know this is heavily based on geometry dash")
game.splash("just one more thing", "this is not using corgio as used in simpleextensions")
starttime = game.runtime()
level = 1
mode = "normal"
portalready = true
player1 = sprites.create(img`
    . . . . . . . 
    . . 1 1 1 . . 
    . 1 f 1 f 1 . 
    . 1 1 1 1 1 . 
    . 1 f f f 1 . 
    . . 1 1 1 . . 
    . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(player1, 80, 0)
player1.ay = 300
player1.setStayInScreen(true)
loadlevel(level)
game.onUpdate(function () {
    info.setScore((game.runtime() - starttime) / 1000)
    grounded = false
    for (let platsprt of sprites.allOfKind(SpriteKind.platform)) {
        top = player1.vy >= 0 && player1.bottom >= platsprt.top && player1.bottom <= platsprt.top + 10 && player1.right > platsprt.left && player1.left < platsprt.right
        if (top) {
            player1.bottom = platsprt.top
            player1.vy = 0
            grounded = true
        }
        bottom = player1.vy < 0 && player1.top <= platsprt.bottom && player1.top >= platsprt.bottom - 10 && player1.right > platsprt.left && player1.left < platsprt.right
        if (bottom) {
            player1.top = platsprt.bottom
            player1.vy = 0
        }
    }
    if (player1.bottom > scene.screenHeight()) {
        player1.bottom = scene.screenHeight()
        player1.vy = 0
        grounded = true
    }
    if (player1.top < 0) {
        player1.top = 0
        player1.vy = 0
    }
    if (player1.left < 0) {
        player1.left = 0
        player1.vx = 0
    }
    if (player1.right > scene.screenWidth()) {
        player1.right = scene.screenWidth()
        player1.vx = 0
    }
})
game.onUpdate(function () {
    touching = false
    for (let portsprt of sprites.allOfKind(SpriteKind.portal)) {
        if (player1.overlapsWith(portsprt)) {
            touching = true
        }
    }
    if (!(touching)) {
        portalready = true
    }
})
