// priority: 500
const ORGAN_EFFECT_SYNC_CHANNEL = 'organ_effect_sync'
const MAX_ORGAN_EFFECT_SLOTS = 5

PlayerEvents.loggedIn(event => {
    syncOrganEffects(event.player)
})

PlayerEvents.tick(event => {
    const player = event.player
    if (!player.chestCavityInstance || !player.chestCavityInstance.inventory) return
    const chestCavity = player.chestCavityInstance
    const customDataMap = chestCavity.customDataMap
    if (!customDataMap.containsKey('organEffectChanged') || !customDataMap.get('organEffectChanged')) return
    customDataMap.put('organEffectChanged', false)
    syncOrganEffects(player)
})

/**
 * Collect organ effects from chestCavity and send to client via network.
 * @param {Internal.ServerPlayer} player
 */
function syncOrganEffects(player) {
    const chestCavity = player.chestCavityInstance
    if (!chestCavity) return
    const customDataMap = chestCavity.customDataMap

    /** @type {OragnEffectModel[]} */
    let organEffectList = []
    if (customDataMap.containsKey('organEffectMap')) {
        /** @type {Map<string, OragnEffectModel>} */
        let organEffectMap = customDataMap.get('organEffectMap')
        organEffectMap.forEach((value, key) => {
            if (value instanceof OragnEffectModel) {
                organEffectList.push(value)
            }
        })
    }

    organEffectList.sort((a, b) => b.priority - a.priority)

    let effectListTag = new $ListTag()
    for (let i = 0; i < Math.min(organEffectList.length, MAX_ORGAN_EFFECT_SLOTS); i++) {
        let effect = organEffectList[i]
        let tag = new $CompoundTag()
        tag.putString('itemId', String(effect.item.id))
        tag.putString('customText', effect.customText || '')
        tag.putBoolean('visible', effect.visible)
        tag.putBoolean('overlay', effect.overlay)
        tag.putInt('priority', effect.priority)
        effectListTag.add(tag)
    }

    let data = new $CompoundTag()
    data.put('effects', effectListTag)
    player.sendData(ORGAN_EFFECT_SYNC_CHANNEL, data)
}
