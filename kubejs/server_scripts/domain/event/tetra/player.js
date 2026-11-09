// priority: 500

const TetraPlayerLoggedOutEvent = new TetraEffectEventModel('player_logged_out')
const TetraPlayerTickEvent = new TetraEffectEventModel('player_tick')

PlayerEvents.loggedOut(/** @param {Internal.SimplePlayerEventJS} event */ event => {
    let customData = {}
    TetraPlayerLoggedOutEvent.run(customData, [event])
})

NativeEvents.onEvent($EventPriority.NORMAL, false, $PlayerTickEvent,
    /** @param {Internal.TickEvent$PlayerTickEvent} event */ event => {
        let customData = {}
        TetraPlayerTickEvent.run(customData, [event])
    })
