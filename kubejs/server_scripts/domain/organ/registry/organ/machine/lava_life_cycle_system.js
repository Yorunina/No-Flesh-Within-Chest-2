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
    let curAbsorptionAmount = entity.getAbsorptionAmount()
    let maxAbsorptionAmount = (slotType == MachinaryLubricant) ? 40 : 10
    if (curAbsorptionAmount >= maxAbsorptionAmount) {
        return
    }
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    const curRelativePosition = invTypeData.getSlotDefinition(organIndex).getRelativePosition()
    const curRelativePositionX = curRelativePosition.getX()
    const curRelativePositionY = curRelativePosition.getY()

    for (let [offsetX, offsetY] of FourDirectionOffset) {
        let slotDefinition = invTypeData.getRelativeSlotDefinition(curRelativePositionX + offsetX, curRelativePositionY + offsetY)
        if (!slotDefinition) continue
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
                    if (curAbsorptionAmount + 1 > maxAbsorptionAmount) break
                    tankNbt.putInt('Amount', fluidAmount - 1)
                    curAbsorptionAmount = curAbsorptionAmount + 1
                    break
                case 'tconstruct:blazing_blood':
                    if (curAbsorptionAmount + 2 > maxAbsorptionAmount) break
                    tankNbt.putInt('Amount', fluidAmount - 1)
                    curAbsorptionAmount = curAbsorptionAmount + 2
                    break
            }
        }
    }

    entity.setAbsorptionAmount(curAbsorptionAmount)

}



RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:lava_life_cycle_system')
        .addOnlyStrategy('entity_tick', LavaLifeCycleSystemEntityTick)
)