// priority: 500
publicField.NFWC.events.OrganPlayerTickEvent = new OrganEventModel('player_tick')

const OrganPlayerTickEvent = publicField.NFWC.events.OrganPlayerTickEvent
PlayerEvents.tick(event => {
    const player = event.player
    if (!player || player.age % 20 != 0) return
    let customData = {}
    OrganPlayerTickEvent.run(player, customData, [event])
})
