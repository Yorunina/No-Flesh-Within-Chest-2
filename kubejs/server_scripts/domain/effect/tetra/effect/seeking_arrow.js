// priority: 500
TetraJSEvents.createArrow('bow', event => {
    if (event.drawProgress < 18) return
    applySeekingArrowEffect(event)
})

TetraJSEvents.createArrow('crowssbow', event => {
    applySeekingArrowEffect(event)
})

function applySeekingArrowEffect(event) {
    const player = event.player
    if (!player) return
    let heldItem = event.item
    /**@type {Internal.ModularItem} */
    let modularItem = heldItem.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:seeking_arrow')
    let effectEfficiency = modularItem.getEffectEfficiency(heldItem, 'kubejs:seeking_arrow')
    if (effectEfficiency <= 0 || effectLevel <= 0) return
    let seekingArrowEntity = new SeekingArrowEntity(event.getProjectile())
    seekingArrowEntity.setMaxTrackDist(10 + effectLevel)
    seekingArrowEntity.setSpeedFactor(1 + effectEfficiency * 0.25)
    event.setProjectile(seekingArrowEntity)
}