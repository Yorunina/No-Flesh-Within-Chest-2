// priority: 500
RegistryOrgan('kubejs:blood_crystal_factory')
    .addScore('chestcavity:detoxification', 1.0)
    .addScore('chestcavity:filtration', -1.0)
// todo 没做完
/**
* 
* @param {OrganEventCustomData} customData
* @param {Internal.OpenedEntityTickJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function BloodCrystalFactoryEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (entity.age % 1200 != 0) return
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()

    let convertableHealth = entity.getHealth() - entity.getMaxHealth() * 0.1
    let bloodCrystalCount = Math.max(Math.floor(convertableHealth / 2), 0)
    if (slotType != TransdimensionalMechanized) {
        if (bloodCrystalCount <= 0) return
        let canSetSlotList = []
        for (let i = 0; i < chestCavity.inventory.getContainerSize(); i++) {
            if (chestCavity.inventory.getItem(i).isEmpty()) {
                canSetSlotList.push(i)
            }
        }
        let targetIndex = RandomGet(canSetSlotList)
        let targetSlotType = chestCavity.inventoryTypeData.getSlotType(targetIndex)
        bloodCrystalCount = Math.min(bloodCrystalCount, 64)
        entity.setHealth(entity.getHealth() - bloodCrystalCount * 2)
        SetChestCavityOrgan(customData, chestCavity, Item.of('kubejs:blood_crystal', bloodCrystalCount), targetIndex, targetSlotType, true)
        return
    }

    let curRelativePos = invTypeData.getSlotDefinition(organIndex).getRelativePosition()
    let targetRelativePos = invTypeData.getRelativeSlotDefinition(curRelativePos.getX(), curRelativePos.getY() - TransdimensionalMechanizedRelativeYSlot)
    let compressBlockItem = ccInv.getStackInSlot(targetRelativePos.getId())

    let roomOpt = CompactMachineUtil.getRoomFromItem(compressBlockItem)
    if (!roomOpt || roomOpt.isEmpty()) return
    const room = roomOpt.get()
    bloodCrystalCount = Math.min(bloodCrystalCount, 640)
    entity.setHealth(entity.getHealth() - bloodCrystalCount * 2)
    CompactMachineUtil.insertItem(server, room, 'up', Item.of('kubejs:blood_crystal', bloodCrystalCount), false)

    let itemHandlerLazyOpt = CompactMachineUtil.getItemHandler(server, room, 'down')
    let r = 0, g = 0, b = 0
    if (itemHandlerLazyOpt.isPresent()) return
    let itemHandler = itemHandlerLazyOpt.resolve().get()
    for (let i = 0; i < itemHandler.getSlots(); i++) {
        let pItem = itemHandler.getStackInSlot(i)
        if (pItem.is('#forge:dyes')) {
            let dyeRatio = DyeRGBRatioConfig[pItem.getId()]
            r += dyeRatio.r * pItem.getCount()
            g += dyeRatio.g * pItem.getCount()
            b += dyeRatio.b * pItem.getCount()
            itemHandler.extractItem(i, pItem.getCount(), false)
        }
    }

}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:blood_crystal_factory')
        .addOnlyStrategy('entity_tick', BloodCrystalFactoryEntityTick)
)