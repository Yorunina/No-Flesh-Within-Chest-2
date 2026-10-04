// priority: 500
const ConstructHuntIncenseSpawns = new WeightRandomModel()
    .addWeightRandom('cataclysm:the_watcher', 55)
    .addWeightRandom('cataclysm:the_prowler', 45)

/**
 * @param {CuriosEventCustomData} customData
 * @param {Internal.SimplePlayerEventJS} event
 * @param {Internal.ItemStack} curiosItem
 */
function ConstructHuntIncensePlayerTick(customData, event, curiosItem) {
    TickRogueHuntIncense(event, ConstructHuntIncenseSpawns, {
        interval: 50,
        nearbyCap: 10,
        baseCount: 1,
        rankDiv: 10,
        waveCap: 4,
        health: 1.2,
        attack: 0.1,
        armor: 2.2,
        toughness: 0.8
    })
}

RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:construct_hunt_incense')
    .addStrategy('player_tick', ConstructHuntIncensePlayerTick)
)
