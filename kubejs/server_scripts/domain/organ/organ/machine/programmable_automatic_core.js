// priority: 500
RegistryOrgan('kubejs:programmable_automatic_core')
    .addScore('chestcavity:filtration', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ProgrammableAutomaticCoreEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    entity.heal(1)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:programmable_automatic_core')
        .addOnlyStrategy('entity_tick', ProgrammableAutomaticCoreEntityTick)
)
