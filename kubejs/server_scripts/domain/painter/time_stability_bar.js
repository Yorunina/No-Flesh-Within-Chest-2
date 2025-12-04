// priority: 500
PlayerEvents.loggedIn(event => {
    const server = event.server
    const level = event.level
    const player = event.player
    UpdatePlaysTimeStabilityBar(server, level, player)
})

/**
 * 
 * @param {Internal.MinecraftServer} server 
 * @param {Internal.ServerLevel} level 
 * @param {Internal.ServerPlayer} player 
 */
function UpdatePlaysTimeStabilityBar(server, level, player) {
    let doDayCycle = server.gameRules.getBoolean($GameRules.RULE_DAYLIGHT)
    var ratio
    if (doDayCycle) {
        let daySpeed = GetDaySpeed(server)
        let nightSpeed = GetNightSpeed(server)
        ratio = nightSpeed / (daySpeed + nightSpeed)
    } else {
        if (level.isDay()) {
            ratio = 1
        } else {
            ratio = 0
        }
    }
    player.paint({
        'day_time_bar': {
            'type': 'rectangle',
            'x': 0,
            'y': `-16`,
            'z': 1,
            'w': 3,
            'h': `$screenH * ${ratio} + 16`,
            'alignX': 'left',
            'alignY': 'top',
            'texture': 'kubejs:textures/gui/day_time_bar.png',
            'visible': true
        },
        'night_time_bar': {
            'type': 'rectangle',
            'x': 0,
            'y': `$screenH - $screenH * ${1 - ratio}`,
            'z': 1,
            'w': 3,
            'h': `$screenH * ${1 - ratio} + 16`,
            'alignX': 'left',
            'alignY': 'top',
            'texture': 'kubejs:textures/gui/night_time_bar.png',
            'visible': true
        }
    })
}
