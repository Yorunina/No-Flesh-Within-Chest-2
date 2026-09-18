// priority: 999
const CuriosPlayerTickEvent = new CuriosEventModel('player_tick')

PlayerEvents.tick(event => {
    const player = event.player
    if (!player || player.age % 20 != 0) return
    let customData = {}
    CuriosPlayerTickEvent.run(player, customData, [event])
})