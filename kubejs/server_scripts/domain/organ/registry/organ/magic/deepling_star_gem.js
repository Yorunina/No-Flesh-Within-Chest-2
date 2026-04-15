// priority: 500
RegistryOrgan('kubejs:deepling_star_gem')
    .addScore('chestcavity:health', 1)
    .addScore('kubejs:magic_capacity', 1)
    .setCanSpawn(true)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.EffectResolveEvent$Post} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function DeeplingStarGemEffectResolvePost(customData, event, organItem, organIndex, slotType) {
    const hitResult = event.rayTraceResult
    if (!(hitResult instanceof $EntityHitResult)) return
    /**@type {Internal.LivingEntity } */
    let entity = hitResult.getEntity()
    entity.setTicksFrozen(400)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:deepling_star_gem')
        .addOnlyStrategy('ars_effect_resolve_post', DeeplingStarGemEffectResolvePost)
)