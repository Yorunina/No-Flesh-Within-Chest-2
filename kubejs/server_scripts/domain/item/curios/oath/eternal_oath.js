// priority: 500
const EternalOathEntitySpawnedUUID = UUID.fromString('82FFC3F4-EB37-46B8-87CE-05668E406FE6')
const EternalOathEntitySpawnedIdentifier = 'EternalOathModifier'
const EternalOathEntitySpawnedConfig = [
    { healthMulti: 1, attackMulti: 1, armorMulti: 1, toughnessMulti: 1, lootMulti: 0 },
    { healthMulti: 2, attackMulti: 1, armorMulti: 1, toughnessMulti: 1, lootMulti: 0.1 },
    { healthMulti: 3, attackMulti: 1, armorMulti: 1, toughnessMulti: 1, lootMulti: 0.2 },
    { healthMulti: 5, attackMulti: 1.5, armorMulti: 1, toughnessMulti: 1, lootMulti: 0.5 },
    { healthMulti: 10, attackMulti: 1.5, armorMulti: 1, toughnessMulti: 1, lootMulti: 0.8 },
    { healthMulti: 20, attackMulti: 2, armorMulti: 1.5, toughnessMulti: 1.5, lootMulti: 1 },
    { healthMulti: 30, attackMulti: 3, armorMulti: 1.5, toughnessMulti: 1.5, lootMulti: 1.2 },
    { healthMulti: 50, attackMulti: 4, armorMulti: 2, toughnessMulti: 2, lootMulti: 1.5 },
    { healthMulti: 100, attackMulti: 5, armorMulti: 2, toughnessMulti: 2, lootMulti: 2 },
    { healthMulti: 300, attackMulti: 6, armorMulti: 2.5, toughnessMulti: 2.5, lootMulti: 2 },
    { healthMulti: 500, attackMulti: 7, armorMulti: 2.5, toughnessMulti: 2.5, lootMulti: 2 },
    { healthMulti: 1000, attackMulti: 8, armorMulti: 3, toughnessMulti: 3, lootMulti: 2 },
]

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EntitySpawnedEventJS} event 
 * @param {Internal.ItemStack} curiosItem
 */
function EternalOathEntitySpawned(customData, event, curiosItem) {
    const entity = event.entity
    if (!entity.isMonster()) return
    const nbt = curiosItem.getOrCreateTag()
    const state = Math.min(nbt.getInt('state'), 11)
    const spawnConfig = EternalOathEntitySpawnedConfig[state]
    let healthAttr = entity.getAttribute('minecraft:generic.max_health')
    if (healthAttr && spawnConfig.healthMulti != 1) {
        healthAttr.addPermanentModifier(new $AttributeModifier(EternalOathEntitySpawnedUUID, EternalOathEntitySpawnedIdentifier, spawnConfig.healthMulti - 1, 'multiply_base'))
        entity.setHealth(entity.getMaxHealth())
    }
    let attackAttr = entity.getAttribute('minecraft:generic.attack_damage')
    if (attackAttr && spawnConfig.attackMulti != 1) {
        attackAttr.addPermanentModifier(new $AttributeModifier(EternalOathEntitySpawnedUUID, EternalOathEntitySpawnedIdentifier, spawnConfig.attackMulti - 1, 'multiply_base'))
    }
    let armorAttr = entity.getAttribute('minecraft:generic.armor')
    if (armorAttr && spawnConfig.armorMulti != 1) {
        armorAttr.addPermanentModifier(new $AttributeModifier(EternalOathEntitySpawnedUUID, EternalOathEntitySpawnedIdentifier, spawnConfig.armorMulti - 1, 'multiply_base'))
    }
    let armorToughnessAttr = entity.getAttribute('minecraft:generic.armor_toughness')
    if (armorToughnessAttr && spawnConfig.toughnessMulti != 1) {
        armorToughnessAttr.addPermanentModifier(new $AttributeModifier(EternalOathEntitySpawnedUUID, EternalOathEntitySpawnedIdentifier, spawnConfig.toughnessMulti - 1, 'multiply_base'))
    }
}


RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:eternal_oath')
    .addStrategy('entity_spawned', EternalOathEntitySpawned)
)