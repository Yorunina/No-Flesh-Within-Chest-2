// priority: 500
RegistryOrgan('kubejs:amethyst_core')
    .addScore('kubejs:magic_capacity', 1)
    .addScore('chestcavity:health', 1)
    .setCanSpawn(true)
/**
* @param {OrganEventCustomData} customData
* @param {Internal.LivingHurtEvent} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function AmethystCoreEntityDoDamage(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    const entity = event.source.actual
    
    if (!entity.isPlayer()) return
    
    let magicData = entity.getMagicData()
    let curMana = magicData.getMana()
    if (curMana <= 10) return
    let bonusDamage = curMana / 10
    magicData.setMana(curMana - bonusDamage)
    event.amount += bonusDamage
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:amethyst_core')
        .addOnlyStrategy('entity_do_damage', AmethystCoreEntityDoDamage)
)