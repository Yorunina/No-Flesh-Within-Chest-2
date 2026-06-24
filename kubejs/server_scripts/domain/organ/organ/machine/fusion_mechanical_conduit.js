// priority: 500
RegistryOrgan('kubejs:transdimensional_adaptation_gland')
    .addScore('chestcavity:detoxification', 1.0)
    .addScore('chestcavity:filtration', -1.0)


/**
* 
* @param {OrganEventCustomData} customData
* @param {Internal.OpenedEntityTickJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function LavaLifeCycleSystemEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()

    // 超维胸腔逻辑
    if (entity.age % 200 == 0 && slotType == TransdimensionalMechanized) {
        let curRelativePos = invTypeData.getSlotDefinition(organIndex).getRelativePosition()
        let targetRelativePos = invTypeData.getRelativeSlotDefinition(curRelativePos.getX(), curRelativePos.getY() - 2)
        let compressBlockItem = ccInv.getStackInSlot(targetRelativePos.getId())


        let roomOpt = CompactMachineUtil.getRoomFromItem(compressBlockItem)
        if (!roomOpt || roomOpt.isEmpty()) return
        const room = roomOpt.get()
        CompactMachineUtil.insertItem(server, room, 'up', 'minecraft:iron_ingot', false)
        let fluidOpt = CompactMachineUtil.getFluid(server, room, 'down')
        if (!fluidOpt || fluidOpt.isEmpty()) return
        let fluid = fluidOpt.get()
        if (!fluid.getFluid().isSame('minecraft:lava')) return
        let amount = fluid.getAmount()
        return
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:transdimensional_adaptation_gland')
        .addOnlyStrategy('entity_tick', LavaLifeCycleSystemEntityTick)
)