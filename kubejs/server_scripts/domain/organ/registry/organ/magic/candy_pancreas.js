// priority: 500
RegistryOrgan('kubejs:candy_pancreas')
    .addScore('chestcavity:endurance', 2)
    .addScore('chestcavity:defense', -1)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.EntitySpellCastEventJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function CandyPancreasEntitySpellCast(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.ServerPlayer} */
    const entity = event.entity
    if (!entity.isPlayer()) return
    if (OrganItemCoolDown(entity, organItem)) return
    const chestCavity = entity.getChestCavityInstance()
    const enduranceOrganScore = chestCavity.getOrganScore('chestcavity:endurance')
    let recoverMana = manaCost * Clamp(enduranceOrganScore * 0.1, 0, 0.9)
    const spell = event.getSpell()
    const manaCost = spell.getManaCost()
    entity.getMagicData().addMana(recoverMana)
    entity.addItemCooldown(organItem, 15 * 20)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:candy_pancreas')
        .addOnlyStrategy('iss_entity_spell_cast', CandyPancreasEntitySpellCast)
)