// priority: 500
TetraJSEvents.createArrow('bow', event => {
    if (event.drawProgress < 18) return
    applySeekingArrowEffect(event)
})

TetraJSEvents.createArrow('crossbow', event => {
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
    let seekingArrowEntity = EntityJSUtils.createArrowFrom(event.getProjectile(), 'kubejs:seeking_arrow')
    seekingArrowEntity.persistentData.putInt('kubejs_seeking_target_id', -1)
    seekingArrowEntity.persistentData.putString('kubejs_seeking_target_uuid', '')
    seekingArrowEntity.persistentData.putBoolean('kubejs_seeking_stopped', false)
    seekingArrowEntity.persistentData.putFloat('kubejs_seeking_max_distance', 10 + effectLevel)
    seekingArrowEntity.persistentData.putFloat('kubejs_seeking_speed_factor', 1 + effectEfficiency * 0.25)
    event.setProjectile(seekingArrowEntity)
}