// priority: 500
// AStages.addRestrictionForMob('mob/appledog', 'appledog_spawn', 'appledog:appledog')
//     .setEnableMobSpawning(false)
//     .restrictSpawnType('natural', 'spawn_egg', 'spawner')

EntityEvents.spawned('cataclysm:lionfish', event => {
    event.cancel()
})

EntityEvents.spawned(event => {
    const level = event.level
})