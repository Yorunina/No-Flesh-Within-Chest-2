// priority: 500
RegistryOrgan('kubejs:candy_heart')
    .addScore('chestcavity:filtration', 1.5)
    .addScore('chestcavity:defense', -1)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.EntitySpellCastEventJS} event 
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function CandyHeartEntitySpellCast(customData, event, organItem, organIndex, slotType) {
    /**@type {Internal.LivingEntity} */
    const entity = event.getEntity()
    const spell = event.getSpell()
    const manaCost = spell.getManaCost()
    let effectDuration = manaCost * 2
    let effectAmplifier = 0
    if (entity.hasEffect('kubejs:sweet_dream')) {
        let sweetDreamEffect = entity.getEffect('kubejs:sweet_dream')
        effectDuration = effectDuration + sweetDreamEffect.getDuration()
        effectAmplifier = sweetDreamEffect.getAmplifier()
    }
    entity.potionEffects.add('kubejs:sweet_dream', effectDuration, effectAmplifier, false, false)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:candy_heart')
        .addOnlyStrategy('entity_spell_cast', CandyHeartEntitySpellCast)
)