// priority: 500
MAAEvents.lightmansTerminalVisibility(event => {
    const player = event.player
    const level = player.level
    let huntBody = player.playerType == 'rogue_hunt'
    let id = event.persistentId

    if (level.dimension == 'kubejs:rogue_hunt') {
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
