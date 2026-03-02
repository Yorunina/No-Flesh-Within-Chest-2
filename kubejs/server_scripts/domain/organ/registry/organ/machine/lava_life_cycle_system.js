// priority: 500
RegistryOrgan('kubejs:lava_life_cycle_system')
    .addScore('chestcavity:health', 1.5)
    .addScore('chestcavity:digestion', 0.5)

/**
 * todo 需要回归测试
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
        if (curItem.hasTag('createdieselgenerators:canister') && curItem.hasNBT()) {
            let nbt = curItem.getNbt()
            if (!nbt.contains('BlockEntityTag')) return
            let blockEntityTag = nbt.getCompound('BlockEntityTag')
            if (!blockEntityTag.contains('Tanks')) continue
            let tanksNbt = blockEntityTag.getList('Tanks')
            if (tanksNbt.size() <= 0) return
            let tankNbt = tanksNbt.get(0)
            if (tankNbt.contains('TankContent')) return
            let tankContent = tankNbt.getCompound('TankContent')
            let fluidName = tankContent.getString('FluidName')
            let fluidAmount = tankContent.getInt('Amount')
            if (fluidAmount <= 0) continue
            switch (fluidName) {
                case 'minecraft:lava':
                    if (fireTick + 40 * mult > 1200 * mult) break
                    tankNbt.putInt('Amount', fluidAmount - 1)
                    fireTick = fireTick + 40 * mult
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