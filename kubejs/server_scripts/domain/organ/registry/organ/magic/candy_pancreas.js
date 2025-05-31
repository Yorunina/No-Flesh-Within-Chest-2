// priority: 500
RegistryOrgan('kubejs:candy_pancreas')
    .addScore('chestcavity:endurance', 1)
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
    const entity = event.getEntity()
    if (!entity.isPlayer()) return
    if (entity.getCooldowns().isOnCooldown(organItem)) return
    const chestCavity = entity.getChestCavityInstance()
    const enduranceOrganScore = chestCavity.getOrganScore('chestcavity:endurance')
    let recoverMana = manaCost * Clamp(enduranceOrganScore * 0.1, 0, 0.9)
    const spell = event.getSpell()
    const manaCost = spell.getManaCost()
    if (spell.schoolType.getId().toString() != 'kubejs:candy') return
    entity.getMagicData().addMana(recoverMana)
    entity.addItemCooldown(organItem, 10 * 20)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:candy_pancreas')
        .addOnlyStrategy('entity_spell_cast', CandyStomachEntitySpellCast)
)