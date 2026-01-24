// priority: 500
RegistryOrgan('kubejs:source_resonator')
    .addScore('kubejs:magic_capacity', 1)
    .addScore('chestcavity:luck', 1)

/**
* @param {AirdropDeathEventCustomData} customData 
* @param {Internal.LivingEntityDeathEventJS} event 
*/
function SourceResonatorAirdropStrategy(customData, event) {
    let lootList = [Item.of('kubejs:source_focus_crystal')]
    if (Math.random() < 0.5) {
        lootList.push(Item.of('kubejs:flame_fragment', Math.floor(Math.random() * 3)))
    }
    customData.lootList = customData.lootList.concat(lootList)
}
RegistryAirDropDeathStrategy('source_resonator', SourceResonatorAirdropStrategy)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function SourceResonatorChestCavityTakeOn(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    /**@type {Map<string, WeightRandomItem[]>} */
    let koiFishPool = GetCustomDataMap(entity.chestCavityInstance, 'koiFishPool', new Map())
    koiFishPool.set('source_resonator', [new WeightRandomItem('source_resonator', 10)])
    SetCustomDataMap(entity.chestCavityInstance, 'koiFishPool', koiFishPool)
}

/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function SourceResonatorChestCavityTakeOff(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    /**@type {Map<string, WeightRandomItem[]>} */
    let koiFishPool = GetCustomDataMap(entity.chestCavityInstance, 'koiFishPool', new Map())
    koiFishPool.delete('source_resonator')
    SetCustomDataMap(entity.chestCavityInstance, 'koiFishPool', koiFishPool)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:source_resonator')
        .addOnlyStrategy('organ_take_on', SourceResonatorChestCavityTakeOn)
        .addOnlyStrategy('organ_take_off', SourceResonatorChestCavityTakeOff)
)

