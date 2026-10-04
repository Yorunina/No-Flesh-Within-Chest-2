// priority: 500
const BroodHuntIncenseSpawns = new WeightRandomModel()
    .addWeightRandom('minecraft:spider', 45)
    .addWeightRandom('minecraft:cave_spider', 35)
    .addWeightRandom('minecraft:silverfish', 20)

/**
 * @param {CuriosEventCustomData} customData
 * @param {Internal.SimplePlayerEventJS} event
 * @param {Internal.ItemStack} curiosItem
 */
function BroodHuntIncensePlayerTick(customData, event, curiosItem) {
    TickRogueHuntIncense(event, BroodHuntIncenseSpawns, {
        interval: 18,
        nearbyCap: 60,
        baseCount: 8,
        rankDiv: 3,
        waveCap: 28,
        health: 0.25,
        attack: 0.03,
        armor: 0,
        speed: 0.06
    })
}

RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:brood_hunt_incense')
    .addStrategy('player_tick', BroodHuntIncensePlayerTick)
)
