// priority: 500
RegistryOrgan('kubejs:lava_life_cycle_system')
    .addScore('chestcavity:health', 1.5)
    .addScore('chestcavity:digestion', 0.5)

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
    const server = event.server
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()

    if (slotType == TransdimensionalMechanized) {
        if (entity.age % 1200 != 0) return
        let needHeal = entity.getMaxHealth() - entity.getHealth()
        if (needHeal <= 0) return
        let curRelativePos = invTypeData.getSlotDefinition(organIndex).getRelativePosition()
        let targetRelativePos = invTypeData.getRelativeSlotDefinition(curRelativePos.getX(), curRelativePos.getY() - TransdimensionalMechanizedRelativeYSlot)
        if (!targetRelativePos) return
        let compressBlockItem = ccInv.getStackInSlot(targetRelativePos.getId())

        let roomOpt = CompactMachineUtil.getRoomFromItem(compressBlockItem)
        if (!roomOpt || roomOpt.isEmpty()) return
        const room = roomOpt.get()
        let fluidOpt = CompactMachineUtil.getFluid(server, room, 'down')

        if (fluidOpt.isEmpty()) return
        let fluid = fluidOpt.get()
        let fluidAmount = Math.min(needHeal * 100, fluid.getAmount())
        fluid.setAmount(fluid.getAmount() - fluidAmount)
        entity.heal(Math.floor(fluidAmount / 100))
        return
    }

    let fireTick = entity.getRemainingFireTicks()
    let mult = (slotType == MachinaryLubricant) ? 4 : 1
    let aroundRelativeSlots = GetDirectionRelativeSlotByParam(invTypeData, organIndex, FourDirectionOffset)
    for (let slotDefinition of aroundRelativeSlots) {
        let curItem = ccInv.getStackInSlot(slotDefinition.getId())
        if (!curItem || curItem.isEmpty()) continue
        let handler = GetItemFluidHandler(curItem)
        if (!handler) continue
        let fluid = handler.getFluid()
        if (fluid.getAmount() <= 0) continue
        if (fluid.containsFluid(Fluid.of('minecraft:lava', 1))) {
            if (fireTick + 20 * mult > 12000 * mult) continue
            handler.drain(Fluid.of('minecraft:lava', 1), 'execute')
            fireTick = fireTick + 40 * mult
            break
        }
        if (fluid.containsFluid(Fluid.of('createdieselgenerators:gasoline', 1))) {
            if (fireTick + 60 * mult > 12000 * mult) continue
            handler.drain(Fluid.of('createdieselgenerators:gasoline', 1), 'execute')
            fireTick = fireTick + 20 * mult
            break
        }
    }
    entity.setRemainingFireTicks(fireTick)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:lava_life_cycle_system')
        .addOnlyStrategy('entity_tick', LavaLifeCycleSystemEntityTick)
)