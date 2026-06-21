// priority: 500
RegistryOrgan('kubejs:dolphin_fin')
    .addScore('chestcavity:swim_speed', 1)
    .addScore('chestcavity:defense', 0.5)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.OpenedEntityTickJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function DolphinFinEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.hasEffect('minecraft:dolphins_grace') && entity.getEffect('minecraft:dolphins_grace').getDuration() > 20 * 3) return
    if (!entity.isInFluidType()) return
    entity.potionEffects.add('minecraft:dolphins_grace', 20 * 30, 0, false, false)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:dolphin_fin')
        .addOnlyStrategy('entity_tick', DolphinFinEntityTick)
)