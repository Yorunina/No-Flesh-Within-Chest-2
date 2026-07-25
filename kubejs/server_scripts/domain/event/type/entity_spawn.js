// priority: 999
const ChampionEntitySpawnedEvent = new ChampionEventModel('entity_spawned')
const CuriosEntitySpawnedEvent = new CuriosEventModel('entity_spawned')


EntityEvents.spawned(event => {
    const entity = event.entity
    if (!entity) return
    // 暂只处理LivingEntity
    if (!entity.isLiving()) return
    
    if (entity.persistentData.getBoolean('hadSpawned')) return
    entity.persistentData.putBoolean('hadSpawned', true)
    const player = GetNearestPlayer(event.level, entity.blockPosition(), 128)
    let customData = {
        player: player,
    }
    ChampionEntitySpawnedEvent.run(entity, customData, [event])
    if (!player) return
    CuriosEntitySpawnedEvent.run(player, customData, [event])
})