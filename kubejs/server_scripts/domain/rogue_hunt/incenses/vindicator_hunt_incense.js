// priority: 500
const VindicatorHuntIncenseSpawns = new WeightRandomModel()
    .addWeightRandom('minecraft:vindicator', 45)
    .addWeightRandom('illagerinvasion:basher', 30)
    .addWeightRandom('illagerinvasion:inquisitor', 15)
    .addWeightRandom('minecraft:ravager', 10)

/**
 * @param {CuriosEventCustomData} customData
 * @param {Internal.SimplePlayerEventJS} event
 * @param {Internal.ItemStack} curiosItem
 */
function VindicatorHuntIncensePlayerTick(customData, event, curiosItem) {
    TickRogueHuntIncense(event, VindicatorHuntIncenseSpawns, {
        interval: 35,
        nearbyCap: 22,
        baseCount: 3,
        rankDiv: 7,
        waveCap: 10,
        health: 0.9,
        attack: 0.14,
        armor: 1.8,
        toughness: 0.6
    })
}

RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:vindicator_hunt_incense')
    .addStrategy('player_tick', VindicatorHuntIncensePlayerTick)
)
