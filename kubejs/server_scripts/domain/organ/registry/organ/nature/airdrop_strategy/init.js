
// priority: 999
ItemEvents.entityInteracted('minecraft:shears', event => {
    const target = event.target
    const player = event.player
    if (target.type.indexOf('airdrop') <= 0) return
    if (event.getHand() != 'main_hand') return
    if (player && player.isCrouching()) return
    target.kill()
})

EntityEvents.death(event => {
    const { entity, level } = event
    if (!entity.type.indexOf('airdrop') < 0) return
    let customData = {
        lootList: []
    }
    let typeListTag = entity.persistentData.getList('types', GET_STRING_TYPE)
    let types = []
    typeListTag.forEach(type => types.push(type.getAsString()))
    AirdropDeathStrategy.run(types, [event], customData)
    if (customData.lootList.length <= 0) return
    PopItemFromAirdrop(level, entity, customData.lootList)
})

const AirdropDeathStrategy = new StrategyModel()

function RegistryAirDropDeathStrategy(id, func) {
    AirdropDeathStrategy.addStrategy(id, func)
}