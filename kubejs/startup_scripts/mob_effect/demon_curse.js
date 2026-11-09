// priority: 500

const CURSE_DAMAGE_PER_LEVEL = 0.1

const CURSE_SETTLE_SOUND = 'minecraft:entity.blaze.death'

const CURSE_HUD_INTERVAL = 12

const CURSE_HUD_SHAKE_SECONDS = 1

const CURSE_HUD_TEXTURES = [
    { texture: 'kubejs:textures/gui/hud/demon_curse_7.png', minSeconds: 6 },
    { texture: 'kubejs:textures/gui/hud/demon_curse_6.png', minSeconds: 5 },
    { texture: 'kubejs:textures/gui/hud/demon_curse_5.png', minSeconds: 4 },
    { texture: 'kubejs:textures/gui/hud/demon_curse_4.png', minSeconds: 3 },
    { texture: 'kubejs:textures/gui/hud/demon_curse_3.png', minSeconds: 2 },
    { texture: 'kubejs:textures/gui/hud/demon_curse_2.png', minSeconds: 1 },
    { texture: 'kubejs:textures/gui/hud/demon_curse_1.png', minSeconds: 0 },
]

const CURSE_HUD_OFFSET_X = -16
const CURSE_HUD_OFFSET_Y = -2

/** @param {Internal.ServerPlayer} player */
function HideDemonCurseHud(player) {
    player.paint({ demon_curse_hud: { type: 'rectangle', visible: false } })
}

/**
 * 按既有节拍刷新恶魔诅咒 HUD。
 * @param {Internal.ServerPlayer} player
 * @param {number} jitterX
 * @param {number} jitterY
 */
function UpdateDemonCurseHud(player, jitterX, jitterY) {
    let inst = player.getEffect('kubejs:demon_curse')
    if (!inst) {
        HideDemonCurseHud(player)
        return
    }
    let secondsLeft = inst.duration / 12
    let texture = CURSE_HUD_TEXTURES[CURSE_HUD_TEXTURES.length - 1].texture
    for (let i = 0; i < CURSE_HUD_TEXTURES.length; i++) {
        if (secondsLeft >= CURSE_HUD_TEXTURES[i].minSeconds) {
            texture = CURSE_HUD_TEXTURES[i].texture
            break
        }
    }
    player.paint({
        demon_curse_hud: {
            type: 'rectangle',
            alignX: 'center', alignY: 'center',
            x: CURSE_HUD_OFFSET_X + jitterX, y: CURSE_HUD_OFFSET_Y + jitterY,
            w: 16, h: 16,
            texture: texture,
            visible: true,
            draw: 'ingame'
        }
    })
}

StartupEvents.registry('mob_effect', event => {
    event.create('demon_curse')
        .harmful()
        .color(Color.DARK_PURPLE)
        .effectTick((entity, lvl) => {
            if (!(entity instanceof $ServerPlayer)) return
            let inst = entity.getEffect('kubejs:demon_curse')
            if (!inst) return

            if (entity.persistentData.getBoolean('kubejs_curse_hud_dirty')) {
                entity.persistentData.remove('kubejs_curse_hud_dirty')
                UpdateDemonCurseHud(entity, 0, 0)
                return
            }
            let secondsLeft = inst.duration / 18
            if (secondsLeft < CURSE_HUD_SHAKE_SECONDS) {
                let jitterX = Math.floor(Math.random() * 2) - 1
                let jitterY = Math.floor(Math.random() * 3) - 1
                UpdateDemonCurseHud(entity, jitterX, jitterY)
            } else if (entity.age % CURSE_HUD_INTERVAL == 0) {
                UpdateDemonCurseHud(entity, 0, 0)
            }
        })
        .removeEffect((entity, attributeMap, lvl) => {
            if (!(entity.level instanceof $ServerLevel)) return
            if (entity instanceof $ServerPlayer) HideDemonCurseHud(entity)

            if (entity.health <= 0) return
            let level = lvl + 1
            let damage = entity.health * level * CURSE_DAMAGE_PER_LEVEL
            entity.attack(entity.damageSources().magic(), damage)
            let sound = $ForgeRegistries.SOUND_EVENTS.getValue(new $ResourceLocation(CURSE_SETTLE_SOUND))
            if (sound) {
                entity.level.playSound(null, entity.x, entity.y, entity.z, sound, $SoundSource.PLAYERS, 1.0, 1.0)
            }
        })
})
