// priority: 500
RegistryOrgan('kubejs:ladybug_wing')
    .addScore('kubejs:light_weight', 1)
    .addScore('chestcavity:speed', 1)
    .setCanSpawn(true)

/**
* @param {*} customData
* @param {Internal.OpenedEntityTickJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function LadybugWingEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.age % 200 != 0) return
    const level = event.level
    level.getEntitiesOfClass($TamableAnimal, entity.getBoundingBox().inflate(4), tamableAnimal => {
        if (tamableAnimal == entity) return false
        if (!tamableAnimal.isTame()) return false
        return tamableAnimal.getHealth() < tamableAnimal.getMaxHealth()
    })
        .forEach(target => target.potionEffects.add('minecraft:regeneration', 220, 0, false, false))
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ladybug_wing')
        .addOnlyStrategy('entity_tick', LadybugWingEntityTick)
)