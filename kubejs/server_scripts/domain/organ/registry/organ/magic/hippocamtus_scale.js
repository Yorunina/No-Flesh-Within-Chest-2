// priority: 500
RegistryOrgan('kubejs:hippocamtus_scale')
    .addScore('kubejs:magic_capacity', 1)
    .addScore('chestcavity:defense', 1)
    .setCanSpawn(true)
/**
* @param {OrganEventCustomData} customData
* @param {Internal.ShieldBlockEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function HippocamtusScaleShieldBlock(customData, event, organItem, organIndex, slotType) {
    const source = event.damageSource.actual
    if (!source) return
    let forzenTicks = source.getTicksFrozen()
    source.setTicksFrozen(forzenTicks + 60)
    if (forzenTicks <= 0) return
    customData.thornsDamage = customData.thornsDamage + forzenTicks / 10
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:hippocamtus_scale')
        .addOnlyStrategy('shield_block', HippocamtusScaleShieldBlock)
)