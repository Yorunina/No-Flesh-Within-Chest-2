// priority: 500
const OrganPlayerTickEvent = new OrganEventModel('player_tick')
    .setInit(
        /** 
         * @param {any} customData
         * @param {Internal.SimplePlayerEventJS} event
         */
        (customData, event) => {
        }
    )
    .setDefer(
        /**
         * @param {any} customData
         * @param {Internal.SimplePlayerEventJS} event
         */
        (customData, event) => {
        }
    )


PlayerEvents.tick(event => {
    const player = event.player
    if (!player || player.age % 10 != 0) return
    let customData = {}
    OrganPlayerTickEvent.run(player, customData, [event])
})
