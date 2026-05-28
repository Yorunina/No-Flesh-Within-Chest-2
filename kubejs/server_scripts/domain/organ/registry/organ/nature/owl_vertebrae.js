// priority: 500
RegistryOrgan('kubejs:owl_vertebrae')
    .addScore('chestcavity:nerves', 1)
    .addScore('chestcavity:defense', 0.5)
    .addScore('chestcavity:endurance', -1)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.OpenedEntityTickJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function OwlVertebraeEntityTick(customData, event, organItem, organIndex, slotType) {
    const level = event.level
    const entity = event.entity
    if (entity.hasEffect('minecraft:night_vision') && entity.getEffect('minecraft:night_vision').getDuration() > 20 * 15) return
    if (!level.isDay()) {
        entity.potionEffects.add('minecraft:night_vision', 20 * 30, 0, false, false)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:owl_vertebrae')
        .addOnlyStrategy('entity_tick', OwlVertebraeEntityTick)
)