// priority: 500
RegistryOrgan('kubejs:cyborgization_device')
    .addScore('chestcavity:health', 1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function CyborgizationDeviceEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = event.chestCavity
    const level = event.level
    if (!entity.isPlayer()) return
    let fireTicks = entity.getRemainingFireTicks()
    if (fireTicks < 3580) return
    let damageValue = organItem.getDamageValue() + 1
    let maxDamageValue = organItem.getMaxDamage()
    if (damageValue >= maxDamageValue) {
        RemoveChestCavityOrgan(customData, chestCavity, organIndex, slotType, true)
        chestCavity.setInventoryType('kubejs:cc_inventory_types/revolution_machine')
        entity.setRemainingFireTicks(fireTicks - 3580)
        level.playSound(null, entity.getX(), entity.getY(), entity.getZ(), 'ui.toast.challenge_complete', entity.getSoundSource(), 0.25, 1)
    } else {
        organItem.setDamageValue(damageValue)
    }
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:cyborgization_device')
        .addOnlyStrategy('entity_tick', CyborgizationDeviceEntityTick)
)
