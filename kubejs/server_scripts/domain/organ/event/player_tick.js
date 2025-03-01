// priority: 500
const OrganPlayerTickEvent = new OrganEventModel('player_tick')
    .setInit(
        /** 
         * @param {OrganEventCustomData} customData
         * @param {Internal.SimplePlayerEventJS} event
         */
        (customData, event) => {
        }
    )
    .setDefer(
        /**
         * @param {OrganEventCustomData} customData
         * @param {Internal.SimplePlayerEventJS} event
         */
        (customData, event) => {
        }
    )


PlayerEvents.tick(event => {
    const player = event.player
    if (!player || player.age % 20 != 0) return
    let customData = {}
    OrganPlayerTickEvent.run(player, customData, [event])
})
