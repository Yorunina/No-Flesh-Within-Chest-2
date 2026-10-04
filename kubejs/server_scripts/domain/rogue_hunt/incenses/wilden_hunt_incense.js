// priority: 500
const WildenHuntIncenseSpawns = new WeightRandomModel()
    .addWeightRandom('ars_nouveau:wilden_hunter', 45)
    .addWeightRandom('ars_nouveau:wilden_stalker', 35)
    .addWeightRandom('ars_nouveau:wilden_guardian', 20)

/**
 * @param {CuriosEventCustomData} customData
 * @param {Internal.SimplePlayerEventJS} event
 * @param {Internal.ItemStack} curiosItem
 */
function WildenHuntIncensePlayerTick(customData, event, curiosItem) {
    TickRogueHuntIncense(event, WildenHuntIncenseSpawns, {
        interval: 25,
        nearbyCap: 36,
        baseCount: 4,
        rankDiv: 5,
        waveCap: 16,
        health: 0.7,
        attack: 0.15,
        armor: 0.3,
        speed: 0.08
    })
}

RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:wilden_hunt_incense')
    .addStrategy('player_tick', WildenHuntIncensePlayerTick)
)
