// priority: 999
const OrganPlayerRespawnedEvent = new OrganEventModel('player_respawned')

PlayerEvents.respawned(event => {
    const player = event.player
    let customData = {}
    OrganPlayerRespawnedEvent.run(player, customData, [event])
})
