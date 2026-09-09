// priority: 999
const OrganPlayerDodgeEvent = new OrganEventModel('player_dodge')

TetraJSEvents.dodge(event => {
    const player = event.player
    let customData = {}
    OrganPlayerDodgeEvent.run(player, customData, [event])
})