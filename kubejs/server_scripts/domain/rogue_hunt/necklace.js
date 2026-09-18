// priority: 500
function XpNecklaceLevelChange(customData, event, curiosItem) {
    const player = event.player
    if (player.level.dimension != ROGUE_HUNT_DIM) return
    let oldLevel = player.persistentData.getInt('rogue_hunt_xp_level')
    let newLevel = player.xpLevel
    player.persistentData.putInt('rogue_hunt_xp_level', newLevel)
    if (oldLevel < 10 && newLevel >= 10) {
        player.potionEffects.add('minecraft:regeneration', 1200, 0, false, true)
    }
    if (oldLevel < 30 && newLevel >= 30) {
        let id = RogueHuntRelicsBossIds[Math.floor(Math.random() * RogueHuntRelicsBossIds.length)]
        let boss = player.level.createEntity(id)
        if (boss) {
            boss.setPos(player.x, player.y, player.z)
            if (boss.setTarget) boss.setTarget(player)
            boss.spawn()
        }
        player.xp = 0
        player.xpLevel = 0
        player.persistentData.putInt('rogue_hunt_xp_level', 0)
    }
}


RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:xp_necklace')
    .addStrategy('xp_level_change', XpNecklaceLevelChange)
)
