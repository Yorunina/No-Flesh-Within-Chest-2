// priority: 500
RegistryOrgan('kubejs:pumpkin_shooter')
    .addScore('chestcavity:nerves', 1)
    .setCanSpawn(true)

/**
 * @param {OrganChestCavityUpdateStrategyCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function PumpkinShooterChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    const ccInv = chestCavity.inventory
    let llamaGlandCount = 0
    let ghastSacCount = 0
    ccInv.allItems.forEach(pItem => {
        if (pItem.isEmpty()) return
        if (pItem.is('kubejs:llama_gland')) {
            llamaGlandCount++
        } else if (pItem.is('kubejs:ghast_sac')) {
            ghastSacCount++
        }
    })
    SetCustomDataMap(chestCavity, 'llamaGlandCount', llamaGlandCount)
    SetCustomDataMap(chestCavity, 'ghastSacCount', ghastSacCount)
}


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function PumpkinShooterEntityTick(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const level = event.level
    const chestCavity = entity.chestCavityInstance
    if (entity.age % 20 != 0) return
    if (GetCustomDataMap(chestCavity, 'llamaGlandCount', 0) > 0) {
        SpitTowardFacing(entity, level)
    } else if (GetCustomDataMap(chestCavity, 'ghastSacCount', 0) > 0) {
        SummonFireballTowardFacing(entity, level)
    } else {
        SummonSnowballTowardFacing(entity, level)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:pumpkin_shooter')
        .addOnlyStrategy('entity_tick', PumpkinShooterEntityTick)
        .addOnlyStrategy('chest_cavity_update', PumpkinShooterChestCavityUpdate)
)
