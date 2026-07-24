// priority: 500
const RelicsBossTagKey = $TagKey.create($Registries.ENTITY_TYPE, 'kubejs:relics_boss')
/**
 * @param {Internal.EntitySpawnedEventJS} event 
 */
function IncenseEntitySpawned(event, customData) {
    const player = customData.player
    if (!player) return
    /**@type {Internal.LivingEntity} */
    const entity = event.entity
    if (!entity.isLiving()) return
    if (!entity.entityType.is(RelicsBossTagKey)) return

    let curiosItemHandler = GetCuriosInventoryCap(player)
    let oathStackOpt = curiosItemHandler.getStacksHandler('incense')
    if (!oathStackOpt.isPresent()) return
    let oathStackHandler = oathStackOpt.get()
    let oathStacks = oathStackHandler.getStacks()
    if (oathStacks.getSlots() <= 0) return

    oathStacks.allItems.forEach(pItem => {
        if (pItem.is('kubejs:relics_incense')) {
            let championTag = new $CompoundTag()
            if (Math.random() < 0.5) {
                championTag.putInt('high_damage_suppression', 1)
            } else {
                championTag.putInt('low_damage_restriction', 1)
            }
            entity.persistentData.put('champion', championTag)
            let healthAttr = entity.getAttribute('minecraft:generic.max_health')
            if (healthAttr) {
                healthAttr.addPermanentModifier(new $AttributeModifier(EternalOathEntitySpawnedUUID, EternalOathEntitySpawnedIdentifier, 9, 'multiply_base'))
                entity.setHealth(entity.getMaxHealth())
            }
            let armorAttr = entity.getAttribute('minecraft:generic.armor')
            if (armorAttr) {
                armorAttr.addPermanentModifier(new $AttributeModifier(EternalOathEntitySpawnedUUID, EternalOathEntitySpawnedIdentifier, 90, 'addition'))
            }
        }
    })
}