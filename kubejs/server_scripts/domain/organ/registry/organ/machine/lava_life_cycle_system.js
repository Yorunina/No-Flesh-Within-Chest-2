// priority: 500
RegistryOrgan('kubejs:lava_life_cycle_system')
    .addScore('chestcavity:health', 1.5)
    .addScore('chestcavity:digestion', 0.5)

/**
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
        if (curItem.isEmpty()) continue
        if (curItem.hasTag('tconstruct:tanks') && curItem.hasNBT()) {
            let nbt = curItem.getNbt()
            if (!nbt.contains('tank')) continue
            let tankNbt = nbt.getCompound('tank')
            let fluidName = tankNbt.getString('FluidName')
            let fluidAmount = tankNbt.getInt('Amount')
            if (fluidAmount <= 0) continue
            switch (fluidName) {
                case 'minecraft:lava':
                    if (fireTick + 40 * mult > 1200 * mult) break
                    tankNbt.putInt('Amount', fluidAmount - 1)
                    fireTick = fireTick + 40 * mult
                    break
                case 'tconstruct:blazing_blood':
                    if (fireTick + 100 * mult > 3600 * mult) break
                    tankNbt.putInt('Amount', fluidAmount - 1)
                    fireTick = fireTick + 100 * mult
                    break
                case 'createdieselgenerators:gasoline':
                    if (fireTick + 20 * mult > 12000 * mult) break
                    tankNbt.putInt('Amount', fluidAmount - 1)
                    fireTick = fireTick + 20 * mult
                    break
            }
        }
    }
    entity.setRemainingFireTicks(fireTick)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:lava_life_cycle_system')
        .addOnlyStrategy('entity_tick', LavaLifeCycleSystemEntityTick)
)