// priority: 500
RegistryOrgan('kubejs:heal_star_gem')
    .addScore('chestcavity:luck', 1)
    .addScore('kubejs:magic_capacity', 1)


/**
* @param {OrganEventCustomData} customData
* @param {Internal.EffectResolveEvent$Post} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function HealStarGemArsEffectResolvePost(customData, event, organItem, organIndex, slotType) {
    const resolveEffect = event.resolveEffect
    if (resolveEffect.getRegistryName() != 'ars_nouveau:glyph_heal') return
    /**@type {Internal.EntityHitResult} */
    const hitResult = event.rayTraceResult
    const spellStats = event.spellStats
    if (!(hitResult instanceof $EntityHitResult)) return
    /**@type {Internal.LivingEntity } */
    let entity = hitResult.getEntity()
    let duration = Math.max(60, 20 * (spellStats.getAmpMultiplier() + 1) * 3)
    if (entity.hasEffect('minecraft:regeneration')) {
        duration = duration + entity.getEffect('minecraft:regeneration').getDuration()
    }
    entity.potionEffects.add('minecraft:regeneration', duration, 0)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:heal_star_gem')
        .addOnlyStrategy('ars_effect_resolve_post', HealStarGemArsEffectResolvePost)
)