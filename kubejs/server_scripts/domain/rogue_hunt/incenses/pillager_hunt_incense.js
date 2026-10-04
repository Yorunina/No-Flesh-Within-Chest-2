// priority: 500
const PillagerHuntIncenseSpawns = new WeightRandomModel()
    .addWeightRandom('minecraft:pillager', 45)
    .addWeightRandom('illagerinvasion:provoker', 25)
    .addWeightRandom('illagerinvasion:marauder', 15)
    .addWeightRandom('minecraft:illusioner', 15)

/**
 * @param {CuriosEventCustomData} customData
 * @param {Internal.SimplePlayerEventJS} event
 * @param {Internal.ItemStack} curiosItem
 */
function PillagerHuntIncensePlayerTick(customData, event, curiosItem) {
    TickRogueHuntIncense(event, PillagerHuntIncenseSpawns, {
        interval: 22,
        nearbyCap: 48,
        baseCount: 6,
        rankDiv: 4,
        waveCap: 22,
        health: 0.4,
        attack: 0.06,
        armor: 0.5
    })
}

RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:pillager_hunt_incense')
    .addStrategy('player_tick', PillagerHuntIncensePlayerTick)
)
