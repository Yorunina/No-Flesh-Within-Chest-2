// priority: 999
const OrganPlayerRollEvent = new OrganEventModel('player_roll')

MAAEvents.playerRoll(event => {
    const player = event.player
    let customData = {}
    OrganPlayerRollEvent.run(player, customData, [event])
})