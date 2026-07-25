// priority: 500
// todo 没想好
const EternalIncenseEntitySpawnedUUID = UUID.fromString('A86EE410-F466-41CB-8181-85C1D5739561')
const EternalIncenseEntitySpawnedIdentifier = 'EternalIncenseModifier'
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EntitySpawnedEventJS} event
 * @param {Internal.ItemStack} curiosItem
 */
function EternalIncenseEntitySpawned(customData, event, curiosItem) {
    const entity = event.entity
    if (!entity.entityType.is(RelicsBossTagKey)) return
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LootContextJS} event 
 * @param {Internal.ItemStack} curiosItem
 */
function EternalIncenseChestLoot(customData, event, curiosItem) {
}

RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:eternal_incense')
    .addStrategy('entity_spawned', EternalIncenseEntitySpawned)
    .addStrategy('chest_loot', EternalIncenseChestLoot)
)
