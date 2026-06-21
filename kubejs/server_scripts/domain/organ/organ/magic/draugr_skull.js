// priority: 500
RegistryOrgan('kubejs:draugr_skull')
    .addScore('chestcavity:defense', 1)
    .addScore('kubejs:magic_capacity', 1)
    .setCanSpawn(true)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function DraugrSkullEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    const source = event.source.actual
    if (!source) return
    let sourceFrozenTicks = source.getTicksFrozen()
    source.setTicksFrozen(sourceFrozenTicks + 100)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:draugr_skull')
        .addOnlyStrategy('entity_be_hurt', DraugrSkullEntityBeHurt)
)