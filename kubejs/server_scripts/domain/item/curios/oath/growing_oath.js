// priority: 500
const GrowingOathEntitySpawnedUUID = UUID.fromString('E1C16618-5E2F-42A7-AF28-416FC6713373')
const GrowingOathEntitySpawnedIdentifier = 'GrowingOathModifier'

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EntitySpawnedEventJS} event 
 * @param {Internal.ItemStack} curiosItem
 */
function GrowingOathEntitySpawned(customData, event, curiosItem) {
    const entity = event.entity
    if (!entity.isMonster()) return
    const nbt = curiosItem.getOrCreateTag()
    const dayCount = nbt.getInt('dayCount')
    if (dayCount <= 0) return

    let healthAttr = entity.getAttribute('minecraft:generic.max_health')
    if (healthAttr) {
        healthAttr.addPermanentModifier(new $AttributeModifier(GrowingOathEntitySpawnedUUID, GrowingOathEntitySpawnedIdentifier, dayCount * 0.2, 'multiply_base'))
        entity.setHealth(entity.getMaxHealth())
    }

    let attackAttr = entity.getAttribute('minecraft:generic.attack_damage')
    if (attackAttr) attackAttr.addPermanentModifier(new $AttributeModifier(GrowingOathEntitySpawnedUUID, GrowingOathEntitySpawnedIdentifier, dayCount * 0.02, 'multiply_base'))

    let armorAttr = entity.getAttribute('minecraft:generic.armor')
    if (armorAttr) armorAttr.addPermanentModifier(new $AttributeModifier(GrowingOathEntitySpawnedUUID, GrowingOathEntitySpawnedIdentifier, dayCount * 0.1, 'multiply_base'))

    let armorToughnessAttr = entity.getAttribute('minecraft:generic.armor_toughness')
    if (armorToughnessAttr) armorToughnessAttr.addPermanentModifier(new $AttributeModifier(GrowingOathEntitySpawnedUUID, GrowingOathEntitySpawnedIdentifier, dayCount * 0.1, 'multiply_base'))
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingEntityDeathEventJS} event 
 * @param {Internal.ItemStack} curiosItem
 */
function GrowingOathEntityDeath(customData, event, curiosItem) {
    if (!event.entity.isPlayer()) return
    const nbt = curiosItem.getOrCreateTag()
    nbt.putInt('dayCount', Math.max(nbt.getInt('dayCount') - 10, 0))
}


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.ServerEventJS} event 
 * @param {Internal.ItemStack} curiosItem
 */
function GrowingOathNewDay(customData, event, curiosItem) {
    const nbt = curiosItem.getOrCreateTag()
    nbt.putInt('dayCount', nbt.getInt('dayCount') + 1)
    curiosItem.setNbt(nbt)
}

RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:growing_oath')
    .addStrategy('new_day', GrowingOathNewDay)
    .addStrategy('entity_death', GrowingOathEntityDeath)
    .addStrategy('entity_spawned', GrowingOathEntitySpawned)
)