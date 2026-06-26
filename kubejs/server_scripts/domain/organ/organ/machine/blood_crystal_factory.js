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
    const server = event.server
    if (entity.age % 1200 != 0) return
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()

    let convertableHealth = entity.getHealth() - entity.getMaxHealth() * 0.1
    let bloodCrystalCount = Math.max(Math.floor(convertableHealth / 2), 0)
    if (slotType != TransdimensionalMechanized) {
        if (bloodCrystalCount <= 0) return
        let canSetSlotList = []
        for (let i = 0; i < chestCavity.inventory.getContainerSize(); i++) if (chestCavity.inventory.getItem(i).isEmpty()) canSetSlotList.push(i)
        if (canSetSlotList.length == 0) return
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

    let itemHandlerLazyOpt = CompactMachineUtil.drainFluid(server, room, 'down', Fluid.of('minecraft:empty'), 'execute')

}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:blood_crystal_factory')
        .addOnlyStrategy('entity_tick', BloodCrystalFactoryEntityTick)
)