// priority: 500
RegistryOrgan('kubejs:wilden_heart')
    .addScore('chestcavity:health', 1)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function WildenHeartEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const chestCavity = entity.chestCavityInstance
    if (event.amount <= entity.getHealth() + entity.getAbsorptionAmount()) return
    entity.setAbsorptionAmount(entity.getAbsorptionAmount() + event.amount)
    event.amount = 0
    let replaceItem = Item.of('kubejs:rotten_heart')
    SetChestCavityOrgan(customData, chestCavity, replaceItem, organIndex, slotType, true)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:wilden_heart')
        .addOnlyStrategy('entity_be_hurt', WildenHeartEntityBeHurt)
)

