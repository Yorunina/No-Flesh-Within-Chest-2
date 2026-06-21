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
    let fireTick = entity.getRemainingFireTicks()
    let mult = (slotType == MachinaryLubricant) ? 4 : 1
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
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