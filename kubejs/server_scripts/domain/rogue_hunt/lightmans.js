// priority: 500
MAAEvents.lightmansTerminalVisibility(event => {
    const player = event.player
    const level = player.level
    let huntBody = player.playerType == ROGUE_HUNT_PLAYER_TYPE
    let id = event.persistentId

    if (level.dimension == ROGUE_HUNT_DIM) {
        if (!event.persistent) {
            event.hide()
            return
        }
        if (!(id.indexOf('rogue_hunt') == 0 && huntBody)) {
            event.hide()
        }
        return
    }

    if (event.persistent && id.indexOf('rogue_hunt') == 0) {
        event.hide()
    }
})
