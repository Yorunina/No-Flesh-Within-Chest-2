// priority: 500
RegistryOrgan('kubejs:pig_stomach')
    .addScore('chestcavity:digestion', 1.5)
    .addScore('chestcavity:endurance', 1)
    .setCanSpawn(true)
    
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.OpenedEntityTickJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function PigStomachFoodEaten(customData, event, organItem, organIndex, slotType) {
    /**@type {Player} */
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    let digestion = chestCavity.getOrganScore('chestcavity:digestion')
    entity.potionEffects.add('farm_and_charm:sustenance', Math.max(200, digestion * 20 * 5 + 200), 0, false, false)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:pig_stomach')
        .addOnlyStrategy('food_eaten', PigStomachFoodEaten)
)