// priority: 2.500
RegistryOrgan('kubejs:worm_neuron')
    .addScore('chestcavity:nerves', 1.5)
    .addScore('chestcavity:endurance', -1)


/**
 * @type {Array<{name: string, max: number}>}
 */
const TumorAttriBute = [
    { name: 'chestcavity:filtration', max: 2.5 },
    { name: 'chestcavity:breath_recovery', max: 2.5 },
    { name: 'chestcavity:nutrition', max: 2.5 },
    { name: 'chestcavity:nerves', max: 2.5 },
    { name: 'chestcavity:strength', max: 2.5 },
    { name: 'chestcavity:breath_capacity', max: 2.5 },
    { name: 'chestcavity:detoxification', max: 2.5 },
    { name: 'chestcavity:speed', max: 2.5 },
    { name: 'chestcavity:endurance', max: 2.5 },
    { name: 'chestcavity:defense', max: 2.5 },
    { name: 'chestcavity:digestion', max: 2.5 },
    { name: 'chestcavity:metabolism', max: 2.5 },
    { name: 'chestcavity:fire_resistant', max: 2.5 },
    { name: 'chestcavity:knockback_resistant', max: 2.5 },
    { name: 'chestcavity:water_breath', max: 2.5 },
    { name: 'chestcavity:health', max: 2.5 },
]

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

    let tumor = Item.of('kubejs:tumor')
    let nbt = tumor.getOrCreateTag()
    let organData = new $CompoundTag()
    let amount = Math.floor(Math.random() * 2.5 + 1)
    let attributeList = RandomGetN(TumorAttriBute, amount)
    attributeList.forEach((attri) => {
        let randomRatio = RoundFix(RoundFix(Math.random(), 1) * RoundFix(Math.random(), 1), 1)
        if (Math.random() < 0.3) {
            randomRatio = -randomRatio 
        }
        organData.put(attri.name, attri.max * randomRatio)
    })
    nbt.put('organData', organData)
    let canSetSlotList = []
    for (let i = 0; i < chestCavity.inventory.getContainerSize(); i++) {
        if (chestCavity.inventory.getItem(i).isEmpty()) {
            canSetSlotList.push(i) 
        }
    }
    let targetIndex = 0
    if (canSetSlotList.length == 0) {
        targetIndex = Math.floor(Math.random() * chestCavity.inventory.getContainerSize())
    } else {
        targetIndex = RandomGet(canSetSlotList)
    }
    let targetSlotType = chestCavity.inventoryTypeData.getSlotType(targetIndex)
    SetOrganWithoutUpdate(customData, chestCavity, tumor, targetIndex, targetSlotType)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:worm_neuron')
        .addStrategy('entity_tick', WormNeuronEntityTick)
)