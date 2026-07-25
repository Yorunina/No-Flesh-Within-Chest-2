// priority: 500
const ImmortalOathEntitySpawnedUUID = UUID.fromString('68D2AB65-9548-405F-8444-E495DE25AC8D')
const ImmortalOathEntitySpawnedIdentifier = 'ImmortalOathModifier'

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EntitySpawnedEventJS} event 
 * @param {Internal.ItemStack} curiosItem
 */
function ImmortalOathEntitySpawned(customData, event, curiosItem) {
    const entity = event.entity
    if (!entity.isMonster()) return
    const nbt = curiosItem.getOrCreateTag()
    const dayCount = nbt.getInt('dayCount')
    if (dayCount <= 0) return

    let healthAttr = entity.getAttribute('minecraft:generic.max_health')
    if (healthAttr) {
        healthAttr.addPermanentModifier(new $AttributeModifier(ImmortalOathEntitySpawnedUUID, ImmortalOathEntitySpawnedIdentifier, dayCount * 0.2, 'multiply_base'))
        entity.setHealth(entity.getMaxHealth())
    }

    let attackAttr = entity.getAttribute('minecraft:generic.attack_damage')
    if (attackAttr) attackAttr.addPermanentModifier(new $AttributeModifier(ImmortalOathEntitySpawnedUUID, ImmortalOathEntitySpawnedIdentifier, dayCount * 0.02, 'multiply_base'))

    let armorAttr = entity.getAttribute('minecraft:generic.armor')
    if (armorAttr) armorAttr.addPermanentModifier(new $AttributeModifier(ImmortalOathEntitySpawnedUUID, ImmortalOathEntitySpawnedIdentifier, dayCount * 0.1, 'multiply_base'))

    let armorToughnessAttr = entity.getAttribute('minecraft:generic.armor_toughness')
    if (armorToughnessAttr) armorToughnessAttr.addPermanentModifier(new $AttributeModifier(ImmortalOathEntitySpawnedUUID, ImmortalOathEntitySpawnedIdentifier, dayCount * 0.1, 'multiply_base'))
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingEntityDeathEventJS} event 
 * @param {Internal.ItemStack} curiosItem
 */
function ImmortalOathEntityDeath(customData, event, curiosItem) {
    if (!event.entity.isPlayer()) return
    const nbt = curiosItem.getOrCreateTag()
    nbt.putInt('dayCount', Math.max(nbt.getInt('dayCount') + 10, 0))
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.ServerEventJS} event 
 * @param {Internal.ItemStack} curiosItem
 */
function ImmortalOathNewDay(customData, event, curiosItem) {
    const nbt = curiosItem.getOrCreateTag()
    nbt.putInt('dayCount', nbt.getInt('dayCount') + 1)
    curiosItem.setNbt(nbt)
}



RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:immortal_oath')
    .addStrategy('entity_spawned', ImmortalOathEntitySpawned)
    .addStrategy('entity_death', ImmortalOathEntityDeath)
    .addStrategy('new_day', ImmortalOathNewDay)
)


