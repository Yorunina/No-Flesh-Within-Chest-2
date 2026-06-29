// priority: 999
const ChampionEntitySpawnedEvent = new ChampionEventModel('entity_spawned')

EntityEvents.spawned(event => {
    const entity = event.entity
    if (!entity) return
    let customData = {}
    ChampionEntitySpawnedEvent.run(entity, customData, [event])
    OathEntitySpawned(event)
})