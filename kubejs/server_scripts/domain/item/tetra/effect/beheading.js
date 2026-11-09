// priority: 500
/**
 * @param {Object} customData
 * @param {Internal.LootContextJS} event
 */
function BeheadingEntityLoot(customData, event) {
    const entity = event.entity
    if (!entity || !entity.isLiving()) return
    const killer = event.killerEntity
    if (!killer || !killer.isLiving()) return
    let heldItem = killer.mainHandItem
    /**@type {Internal.ModularItem} */
    let modularItem = heldItem.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:beheading')
    if (effectLevel <= 0) return
    if (Math.random() > effectLevel * 0.02) return
    let headItem = GetEntityHeadItem(entity)
    if (!headItem) return
    event.loot.add(headItem)
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:beheading')
        .addStrategy('entity_loot_before', BeheadingEntityLoot)
)
