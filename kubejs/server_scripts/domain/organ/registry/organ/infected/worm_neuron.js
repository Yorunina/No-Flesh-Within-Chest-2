// priority: 500
RegistryOrgan('kubejs:worm_neuron')
    .addScore('chestcavity:nerves', 1.5)
    .addScore('chestcavity:metabolism', 1)
    .addScore('chestcavity:endurance', -1)
    .setCanSpawn(true)
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function WormNeuronEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = event.chestCavity
    if (entity.age % 1200 != 0) return

    // 视作用默认培养液培养
    let tumorConfigModel = UnformedTumorFluidConfigMap.get('kubejs:nutrients_fluid')
    let organData = tumorConfigModel.genOrganData()
    let potentialOrganData = tumorConfigModel.genPotentialOrganData()

    let nbt = new $CompoundTag()
    // 故意预先存储，后续处理可以不依据该潜藏属性
    nbt.put('potentialOrganData', potentialOrganData)
    nbt.put('organData', organData)
    let canSetSlotList = []
    for (let i = 0; i < chestCavity.inventory.getContainerSize(); i++) {
        if (chestCavity.inventory.getItem(i).isEmpty()) {
            canSetSlotList.push(i)
        }
    }

    if (canSetSlotList.length == 0) {
        SetChestCavityOrgan(customData, chestCavity, Item.of('kubejs:malignant_neuron_tumor'), organIndex, slotType, true)
        return
    }
    let targetIndex = RandomGet(canSetSlotList)

    let targetSlotType = chestCavity.inventoryTypeData.getSlotType(targetIndex)
    SetChestCavityOrgan(customData, chestCavity, Item.of('kubejs:unformed_tumor', nbt), targetIndex, targetSlotType, true)
}




RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:worm_neuron')
        .addOnlyStrategy('entity_tick', WormNeuronEntityTick)
)