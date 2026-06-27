// priority: 500
RegistryOrgan('kubejs:malignant_cavity_flesh')
    .addScore('chestcavity:health', 1.0)
    .addScore('chestcavity:endurance', -1.0)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function MalignantCavityFleshEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = event.chestCavity
    if (entity.age % 200 != 0) return

    let canSetSlotList = []
    for (let i = 0; i < chestCavity.inventory.getContainerSize(); i++) if (chestCavity.inventory.getItem(i).isEmpty()) canSetSlotList.push(i)
    if (canSetSlotList.length == 0) return
    let targetIndex = RandomGet(canSetSlotList)
    let targetSlotType = chestCavity.inventoryTypeData.getSlotType(targetIndex)
    SetChestCavityOrgan(customData, chestCavity, Item.of('biomancy:fibrous_flesh'), targetIndex, targetSlotType, true)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:malignant_cavity_flesh')
        .addOnlyStrategy('entity_tick', MalignantCavityFleshEntityTick)
)