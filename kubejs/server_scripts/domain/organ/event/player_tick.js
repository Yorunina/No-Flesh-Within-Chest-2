// priority: 500
const OrganPlayerTickEvent = new OrganEventModel('player_tick')

PlayerEvents.tick(event => {
    const player = event.player
    if (!player || player.age % 20 != 0) return
    let customData = {}
    OrganPlayerTickEvent.run(player, customData, [event])
})
