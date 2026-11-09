// priority: 0

/**
 * 按概率从当前掉落中随机复制 rolls 份（跳过器官），加入掉落列表
 * @param {Internal.LootContextJS} ctx
 * @param {number} effectLevel
 * @param {number} effectEfficiency
 */
function WealthyDuplicateLoot(ctx, effectLevel, effectEfficiency) {
    let entries = []
    ctx.loot.forEach(stack => {
        if (stack.hasTag('kubejs:organ')) return
        entries.push(stack)
    })
    if (entries.length === 0) return

    let chance = effectLevel / 100
    for (let i = 0; i < effectEfficiency; i++) {
        if (Math.random() >= chance) continue
        let pick = entries[Math.floor(Math.random() * entries.length)]
        ctx.loot.add(pick.copy())
    }
}

/**
 * @param {Object} customData
 * @param {Internal.LootContextJS} event
 */
function WealthyEntityLoot(customData, event) {
    let entity = event.entity
    if (!entity || !entity.isLiving()) return
    let killer = event.killerEntity
    if (!killer || !killer.isLiving()) return
    let heldItem = killer.mainHandItem
    /**@type {Internal.ModularItem} */
    let modularItem = heldItem.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:wealthy')
    if (effectLevel <= 0) return
    let effectEfficiency = modularItem.getEffectEfficiency(heldItem, 'kubejs:wealthy')
    if (effectEfficiency <= 0) effectEfficiency = 1
    WealthyDuplicateLoot(event, effectLevel, effectEfficiency)
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:wealthy')
        .addStrategy('entity_loot', WealthyEntityLoot, -40)
)
