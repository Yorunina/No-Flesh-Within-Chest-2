// priority: 500
RegistryOrgan('kubejs:scylla_star_gem')
    .addScore('kubejs:magic_capacity', 3)
    .setCanSpawn(true)

/**
* @param {OrganEventCustomData} customData
* @param {Internal.EffectResolveEvent$Post} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function ScyllaStarGemEffectResolvePost(customData, event, organItem, organIndex, slotType) {
    const hitResult = event.rayTraceResult
    if (!(hitResult instanceof $EntityHitResult)) return
    /**@type {Internal.LivingEntity } */
    let entity = hitResult.getEntity()
    if (entity.isOnFire()) {
        entity.extinguishFire()
        entity.setTicksFrozen(entity.getRemainingFireTicks() * 2)
        entity.potionEffects.add('minecraft:fire_resistance', 10 * 20, 0, false, false)
    }
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:scylla_star_gem')
        .addOnlyStrategy('ars_effect_resolve_post', ScyllaStarGemEffectResolvePost)
)