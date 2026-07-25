// priority: 500
const AncientIncenseEntitySpawnedUUID = UUID.fromString('FEB3EB11-925F-4E5C-A61D-057AEEC50D85')
const AncientIncenseEntitySpawnedIdentifier = 'AncientIncenseModifier'
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EntitySpawnedEventJS} event
 * @param {Internal.ItemStack} curiosItem
 */
function AncientIncenseEntitySpawned(customData, event, curiosItem) {
    const entity = event.entity
    if (!entity.entityType.is(RelicsBossTagKey)) return

    const championTag = new $CompoundTag()
    if (Math.random() < 0.5) {
        championTag.putInt('high_freq_protection', 1)
    } else {
        championTag.putInt('low_freq_protection', 1)
    }
    entity.persistentData.put('champion', championTag)
    entity.persistentData.putString('relicsStage', 'ancient')
    let healthAttr = entity.getAttribute('minecraft:generic.max_health')
    if (healthAttr) {
        healthAttr.addPermanentModifier(new $AttributeModifier(AncientIncenseEntitySpawnedUUID, AncientIncenseEntitySpawnedIdentifier, 19, 'multiply_base'))
        entity.setHealth(entity.getMaxHealth())
    }
    let armorAttr = entity.getAttribute('minecraft:generic.armor')
    if (armorAttr) {
        armorAttr.addPermanentModifier(new $AttributeModifier(AncientIncenseEntitySpawnedUUID, AncientIncenseEntitySpawnedIdentifier, 90, 'addition'))
    }
}

RegistryCuriosStrategy(new CuriosStrategyModel('kubejs:ancient_incense')
    .addStrategy('entity_spawned', AncientIncenseEntitySpawned)
)
