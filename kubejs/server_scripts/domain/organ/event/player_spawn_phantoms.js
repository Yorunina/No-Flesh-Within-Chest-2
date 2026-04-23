// priority: 999
const OrganPlayerSpawnPhantomsEvent = new OrganEventModel('player_spawn_phantoms')

NativeEvents.onEvent($PlayerSpawnPhantomsEvent, /** @param {Internal.PlayerSpawnPhantomsEvent} event */ event => {
    const entity = event.entity
    if (!entity) return
    let customData = {}
    OrganPlayerSpawnPhantomsEvent.run(entity, customData, [event])
})
