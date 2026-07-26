// priority: 500
const EternalIncenseEntitySpawnedUUID = UUID.fromString('A86EE410-F466-41CB-8181-85C1D5739561')
const EternalIncenseEntitySpawnedIdentifier = 'EternalIncenseModifier'
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EntitySpawnedEventJS} event
 * @param {Internal.ItemStack} curiosItem
 */
function EternalIncenseEntitySpawned(customData, event, curiosItem) {
    /**@type {Internal.LivingEntity} */
    const entity = event.entity
    const isBossPart = entity.entityType.is(RelicsBossPartTagKey)
    const isBoss = entity.entityType.is(RelicsBossTagKey)
    if (!isBoss && !isBossPart) return
    if (!curiosItem.hasNBT()) curiosItem.setNbt(new $CompoundTag())

    const nbt = curiosItem.getNbt()
    const relicsKills = nbt.getInt('relicsKills') + 1

    if (isBoss) {
        const championTag = new $CompoundTag()
        championTag.putInt(RandomGet(['high_freq_protection', 'low_freq_protection', 'chaos_protection', 'purity_protection', 'high_damage_suppression', 'low_damage_restriction']), Math.min(Math.ceil(relicsKills / 10), 3))
        entity.persistentData.put('champion', championTag)
    }

    let healthAttr = entity.getAttribute('minecraft:generic.max_health')
    if (healthAttr) {
        healthAttr.addPermanentModifier(new $AttributeModifier(EternalIncenseEntitySpawnedUUID, EternalIncenseEntitySpawnedIdentifier, relicsKills * 20, 'multiply_base'))
        entity.setHealth(entity.getMaxHealth())
    }
    let armorAttr = entity.getAttribute('minecraft:generic.armor')
    if (armorAttr) {
        armorAttr.addPermanentModifier(new $AttributeModifier(EternalIncenseEntitySpawnedUUID, EternalIncenseEntitySpawnedIdentifier, relicsKills * 20 + 100, 'addition'))
    }
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingEntityDeathEventJS} event 
 * @param {Internal.ItemStack} curiosItem
 */
function EternalIncenseEntityKill(customData, event, curiosItem) {
    const entity = event.entity
    const nbt = curiosItem.getOrCreateTag()
    if (entity.entityType.is(RelicsBossTagKey)) return
    nbt.putInt('relicsKills', nbt.getInt('relicsKills') + 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LootContextJS} event 
 * @param {Internal.ItemStack} curiosItem
 */
function EternalIncenseChestLoot(customData, event, curiosItem) {
    const nbt = curiosItem.getOrCreateTag()
    nbt.putInt('lootTimes', nbt.getInt('lootTimes') + 1)
}

RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:eternal_incense')
    .addStrategy('entity_spawned', EternalIncenseEntitySpawned)
    .addStrategy('chest_loot', EternalIncenseChestLoot)
    .addStrategy('entity_kill', EternalIncenseEntityKill)
)
