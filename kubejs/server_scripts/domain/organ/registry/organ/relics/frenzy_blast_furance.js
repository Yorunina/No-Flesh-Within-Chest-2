// priority: 500
RegistryOrgan('kubejs:frenzy_blast_furance')
    .addScore('kubejs:extreme_fitness', -1)
    .addScore('chestcavity:digestion', -1)


/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function FrenzyBlastDoDamage(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    event.amount = event.amount + (entity.maxHealth - entity.health) * 2
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:frenzy_blast_furance')
        .addStrategy('entity_do_damage', FrenzyBlastDoDamage)
)