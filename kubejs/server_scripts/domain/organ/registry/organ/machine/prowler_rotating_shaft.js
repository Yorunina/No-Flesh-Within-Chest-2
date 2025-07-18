// priority: 500
RegistryOrgan('kubejs:prowler_rotating_shaft')
    .addScore('chestcavity:nerves', 0.5)
    .addScore('chestcavity:defense', -1)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ProwlerRotatingShaftEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    if (event.amount <= 1) return
    const entity = event.entity
    const chestCavity = entity.chestCavityInstance
    const ccInv = chestCavity.inventory
    const invTypeData = chestCavity.getInventoryTypeData()
    const curRelativePosition = invTypeData.getSlotDefinition(organIndex).getRelativePosition()
    const curRelativePositionX = curRelativePosition.getX()
    const curRelativePositionY = curRelativePosition.getY()
    let targetLivingList = []
    for (let [offsetX, offsetY] of EightDirectionOffset) {
        let slotDefinition = invTypeData.getRelativeSlotDefinition(curRelativePositionX + offsetX, curRelativePositionY + offsetY)
        if (!slotDefinition) continue
        let curItem = ccInv.getStackInSlot(slotDefinition.getId())
        if (curItem.isEmpty() || curItem.id != 'kubejs:living_controller') continue
        let targetLiving = GetRemoteControlTarget(entity.level, curItem)
        if (!targetLiving) return
        if (!(targetLiving instanceof $PathfinderMob)) continue
        targetLivingList.push(targetLiving)
    }
    if (targetLivingList.length <= 0) return
    let sharedAmount = event.amount / (targetLivingList.length + 1)
    for (let targetLiving of targetLivingList) {
        targetLiving.attack(event.source, sharedAmount)
    }
    event.amount = sharedAmount
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:prowler_rotating_shaft')
        .addOnlyStrategy('entity_be_hurt', ProwlerRotatingShaftEntityBeHurt)
)
