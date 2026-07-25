// priority: 500
const RelicsIncenseEntitySpawnedUUID = UUID.fromString('7C2C74AF-0652-4BF1-A8DB-8F9F47A97DD5')
const RelicsIncenseEntitySpawnedIdentifier = 'RelicsIncenseModifier'
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EntitySpawnedEventJS} event 
 * @param {Internal.ItemStack} curiosItem
 */
function RelicsIncenseEntitySpawned(customData, event, curiosItem) {
    const entity = event.entity
    if (!entity.entityType.is(RelicsBossTagKey)) return

    const championTag = new $CompoundTag()
    if (Math.random() < 0.5) {
        championTag.putInt('high_damage_suppression', 1)
    } else {
        championTag.putInt('low_damage_restriction', 1)
    }
    entity.persistentData.put('champion', championTag)
    entity.persistentData.putString('relicsStage', 'relics')
    let healthAttr = entity.getAttribute('minecraft:generic.max_health')
    if (healthAttr) {
        healthAttr.addPermanentModifier(new $AttributeModifier(RelicsIncenseEntitySpawnedUUID, RelicsIncenseEntitySpawnedIdentifier, 9, 'multiply_base'))
        entity.setHealth(entity.getMaxHealth())
    }
    let armorAttr = entity.getAttribute('minecraft:generic.armor')
    if (armorAttr) {
        armorAttr.addPermanentModifier(new $AttributeModifier(RelicsIncenseEntitySpawnedUUID, RelicsIncenseEntitySpawnedIdentifier, 90, 'addition'))
    }
}


RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:relics_incense')
    .addStrategy('entity_spawned', RelicsIncenseEntitySpawned)
)
