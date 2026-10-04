// priority: 500
const OccultHuntIncenseSpawns = new WeightRandomModel()
    .addWeightRandom('minecraft:evoker', 30)
    .addWeightRandom('minecraft:witch', 20)
    .addWeightRandom('illagerinvasion:alchemist', 15)
    .addWeightRandom('illagerinvasion:sorcerer', 15)
    .addWeightRandom('illagerinvasion:archivist', 10)
    .addWeightRandom('illagerinvasion:firecaller', 7)
    .addWeightRandom('illagerinvasion:necromancer', 3)

/**
 * @param {CuriosEventCustomData} customData
 * @param {Internal.SimplePlayerEventJS} event
 * @param {Internal.ItemStack} curiosItem
 */
function OccultHuntIncensePlayerTick(customData, event, curiosItem) {
    TickRogueHuntIncense(event, OccultHuntIncenseSpawns, {
        interval: 40,
        nearbyCap: 16,
        baseCount: 2,
        rankDiv: 8,
        waveCap: 8,
        health: 1.3,
        attack: 0.03,
        armor: 0.6
    })
}

RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:occult_hunt_incense')
    .addStrategy('player_tick', OccultHuntIncensePlayerTick)
)
