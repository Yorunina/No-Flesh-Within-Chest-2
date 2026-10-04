// priority: 500
const UndeadHuntIncenseSpawns = new WeightRandomModel()
    .addWeightRandom('minecraft:zombie', 80)
    .addWeightRandom('minecraft:skeleton', 20)

/**
 * @param {CuriosEventCustomData} customData
 * @param {Internal.SimplePlayerEventJS} event
 * @param {Internal.ItemStack} curiosItem
 */
function UndeadHuntIncensePlayerTick(customData, event, curiosItem) {
    TickRogueHuntIncense(event, UndeadHuntIncenseSpawns, {
        interval: 30,
        nearbyCap: 60,
        baseCount: 4,
        rankDiv: 5,
        waveCap: 20,
        health: 1,
        attack: 0.05,
        armor: 1
    })
}

RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:undead_hunt_incense')
    .addStrategy('player_tick', UndeadHuntIncensePlayerTick)
)
