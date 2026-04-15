// priority: 500
RegistryOrgan('kubejs:immortal_volcanic_rock')
    .addScore('chestcavity:strength', -1)
    .addScore('chestcavity:fire_resistant', -1)


/**
* @param {OrganEventCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function ImmortalVolcanicRockEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    let fireTick = entity.getRemainingFireTicks()
    if (fireTick < 2000) {
        entity.setRemainingFireTicks(fireTick + 20)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:immortal_volcanic_rock')
        .addOnlyStrategy('entity_tick', ImmortalVolcanicRockEntityTick)
)