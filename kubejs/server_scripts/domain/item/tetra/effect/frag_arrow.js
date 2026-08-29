// priority: 500
TetraJSEvents.createArrow('bow', event => {
    if (event.drawProgress < 18) return
    applyFragArrowEffect(event)
})
TetraJSEvents.createArrow('crossbow', event => {
    applyFragArrowEffect(event)
})

function applyFragArrowEffect(event) {
    const player = event.player
    if (!player) return
    let heldItem = event.item
    /**@type {Internal.ModularItem} */
    let modularItem = heldItem.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:frag_arrow')
    let effectEfficiency = modularItem.getEffectEfficiency(heldItem, 'kubejs:frag_arrow')
    if (effectEfficiency <= 0 || effectLevel <= 0) return
    let aoeArrowEntity = EntityJSUtils.createArrowFrom(event.getProjectile(), 'kubejs:aoe_arrow')
    aoeArrowEntity.persistentData.putBoolean('kubejs_aoe_done', false)
    aoeArrowEntity.persistentData.putFloat('kubejs_aoe_damage_factor', 0.1 + effectEfficiency * 0.1)
    aoeArrowEntity.persistentData.putFloat('kubejs_aoe_size', 2 + effectLevel * 0.5)
    event.setProjectile(aoeArrowEntity)
}
