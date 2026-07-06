// priority: 500
RegistryOrgan('kubejs:machine_witch_fibroma')
    .addScore('chestcavity:digestion', 1)
    .addScore('chestcavity:filtration', 0.5)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function MachineWitchStomachEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const server = event.server
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    if (slotType != TransdimensionalMechanized) return

    if (entity.age % 200 != 0) return

    let curRelativePos = invTypeData.getSlotDefinition(organIndex).getRelativePosition()
    let targetRelativePos = invTypeData.getRelativeSlotDefinition(curRelativePos.getX(), curRelativePos.getY() - TransdimensionalMechanizedRelativeYSlot)
    if (!targetRelativePos) return
    let compressBlockItem = ccInv.getStackInSlot(targetRelativePos.getId())

    let roomOpt = CompactMachineUtil.getRoomFromItem(compressBlockItem)
    if (!roomOpt || roomOpt.isEmpty()) return
    const room = roomOpt.get()
    CompactMachineUtil.getAllFluidsBySide(server, room).forEach((direction, fluid) => {
        if (!fluid.hasTag()) return
        if (fluid.getAmount() < 5) return
        let potion = MAAUtils.getPotionByTag(fluid.getTag())
        let effects = potion.getEffects()
        if (effects.isEmpty()) return
        for (let effect of effects) {
            entity.potionEffects.add(effect.effect, effect.duration, effect.amplifier)
        }
        fluid.setAmount(fluid.getAmount() - 5)
    })
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:machine_witch_fibroma')
        .addOnlyStrategy('entity_tick', MachineWitchStomachEntityTick)
)