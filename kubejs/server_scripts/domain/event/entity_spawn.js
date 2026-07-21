// priority: 999
const ChampionEntitySpawnedEvent = new ChampionEventModel('entity_spawned')

EntityEvents.spawned(event => {
    const entity = event.entity
    if (!entity) return
    let customData = {}
    if (entity.persistentData.getBoolean('hadSpawned')) return
    customData.player = GetNearestPlayer(event.level, entity.blockPosition(), 128)
    ChampionEntitySpawnedEvent.run(entity, customData, [event])
    OathEntitySpawned(event, customData)
    IncenseEntitySpawned(event, customData)
    entity.persistentData.putBoolean('hadSpawned', true)
})