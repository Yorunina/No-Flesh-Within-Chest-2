// priority: 999
const PlayerTypeDimensionRule = {
    'default': { blackList: ['kubejs:amusement_park', 'minecraft:the_nether'] },
    'amusement': { whiteList: ['kubejs:amusement_park'] },
    'rouge': { whiteList: [] }
}
MAAEvents.playerDimensionChange(event => {
    /**@type {Internal.ServerPlayer} */
    const player = event.player
    if (player.isShellTeleporting) return
    if (player.isCreative()) return
    /** @type {{ blackList?: string[], whiteList?: string[] }} */
    const config = PlayerTypeDimensionRule[player.playerType]
    if (!config) return
    const toDim = event.toDimension.location().toString()
    if (config.blackList) {
        if (config.blackList.indexOf(toDim) > -1) {
            return event.cancel()
        }
    }
    if (config.whiteList) {
        if (config.whiteList.indexOf(toDim) == -1) {
            return event.cancel()
        }
    }
})