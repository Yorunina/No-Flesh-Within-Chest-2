// priority: 500
// todo
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
    if (!entity.isPlayer()) return
    let fireTicks = entity.getRemainingFireTicks()
    if (fireTicks < 11980) return
    RemoveChestCavityOrgan(customData, chestCavity, organIndex, slotType, true)
    chestCavity.setInventoryType('kubejs:cc_inventory_types/revolution_machine')
    entity.setRemainingFireTicks(fireTicks - 11980)
    level.playSound(null, player.getX(), player.getY(), player.getZ(), 'ui.toast.challenge_complete', player.getSoundSource(), 0.25, 1)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:cyborgization_device')
        .addOnlyStrategy('entity_tick', CyborgizationDeviceEntityTick)
)
