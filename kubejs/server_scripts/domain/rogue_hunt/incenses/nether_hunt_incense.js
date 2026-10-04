// priority: 500
const NetherHuntIncenseSpawns = new WeightRandomModel()
    .addWeightRandom('minecraft:zoglin', 45)
    .addWeightRandom('minecraft:blaze', 30)
    .addWeightRandom('cataclysm:ignited_berserker', 20)
    .addWeightRandom('minecraft:ghast', 5)

/**
 * @param {CuriosEventCustomData} customData
 * @param {Internal.SimplePlayerEventJS} event
 * @param {Internal.ItemStack} curiosItem
 */
function NetherHuntIncensePlayerTick(customData, event, curiosItem) {
    TickRogueHuntIncense(event, NetherHuntIncenseSpawns, {
        interval: 45,
        nearbyCap: 24,
        baseCount: 2,
        rankDiv: 8,
        waveCap: 8,
        health: 1.6,
        attack: 0.12,
        armor: 0.4
    })
}

RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:nether_hunt_incense')
    .addStrategy('player_tick', NetherHuntIncensePlayerTick)
)
