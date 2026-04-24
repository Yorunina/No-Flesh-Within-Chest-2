// priority: 500
RegistryOrgan('kubejs:malignant_neuron_tumor')
    .addScore('chestcavity:digestion', -10)
    .addScore('chestcavity:nutrition', -10)
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function MalignantNeuronTumorEntityTick(customData, event, organItem, organIndex, slotType) {
    if (organItem.getDamageValue() <= 0) return
    organItem.setDamageValue(organItem.getDamageValue() - 1)
}
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function MalignantNeuronTumorEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const entity = event.entity
    const chestCavity = entity.chestCavityInstance
    let maxDamage = organItem.getMaxDamage()
    let newDamageValue = organItem.getDamageValue() + event.getAmount()
    if (newDamageValue >= maxDamage) {
        SetChestCavityOrgan(customData, chestCavity, Item.of('kubejs:inactivated_neuron_tumor'), organIndex, slotType, true)
        return
    } else {
        organItem.setDamageValue(newDamageValue)
    }
}



RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:malignant_neuron_tumor')
        .addOnlyStrategy('entity_tick', MalignantNeuronTumorEntityTick)
        .addOnlyStrategy('entity_be_hurt', MalignantNeuronTumorEntityBeHurt)
)