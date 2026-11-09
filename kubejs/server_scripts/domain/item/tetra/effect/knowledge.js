// priority: 0

/**
 * 在指定位置逐个生成 value 点经验的经验球
 * @param {Internal.Level} level
 * @param {BlockPos} pos
 * @param {number} count
 * @param {number} value
 */
function KnowledgeSpawnExperience(level, pos, count, value) {
    for (let i = 0; i < count; i++) {
        level.addFreshEntity(new $ExperienceOrb(level, pos.x + 0.5, pos.y + 0.5, pos.z + 0.5, value))
    }
}

/**
 * @param {Object} customData
 * @param {Internal.LootContextJS} event
 */
function KnowledgeEntityLoot(customData, event) {
    let sourceEntity = event.killerEntity
    if (!sourceEntity || !sourceEntity.isLiving()) return
    let heldItem = sourceEntity.mainHandItem
    /**@type {Internal.ModularItem} */
    let modularItem = heldItem.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:knowledge')
    if (effectLevel <= 0) return
    let pos = event.blockPos
    if (!pos) return
    let count = 0
    event.loot.forEach(itemStack => {
        count += itemStack.getCount()
    })
    if (count <= 0) return
    KnowledgeSpawnExperience(event.level, pos, count, effectLevel)
    event.loot.clear()
}

/**
 * @param {Object} customData
 * @param {Internal.LootContextJS} event
 */
function KnowledgeBlockLoot(customData, event) {
    let entity = event.entity
    if (!entity || !entity.isLiving()) return
    let heldItem = entity.mainHandItem
    /**@type {Internal.ModularItem} */
    let modularItem = heldItem.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:knowledge')
    if (effectLevel <= 0) return
    let pos = event.blockPos
    if (!pos) return
    let count = 0
    event.loot.forEach(itemStack => {
        count += itemStack.getCount()
    })
    if (count <= 0) return
    KnowledgeSpawnExperience(event.level, pos, count, effectLevel)
    event.loot.clear()
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:knowledge')
        .addStrategy('entity_loot', KnowledgeEntityLoot, -20)
        .addStrategy('block_loot', KnowledgeBlockLoot)
)
