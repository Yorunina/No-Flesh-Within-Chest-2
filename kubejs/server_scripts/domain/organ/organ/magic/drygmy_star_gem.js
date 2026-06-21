// priority: 500
RegistryOrgan('kubejs:drygmy_star_gem')
    .addScore('chestcavity:nerves', 1)
    .addScore('kubejs:magic_capacity', 1)
    .setCanSpawn(true)
/**
 * 
 * @param {any} customData 
 * @param {Internal.EffectResolveEvent} event 
 * @param {Internal.ItemStack} organItem 
 * @param {number} organIndex 
 * @param {string} slotType 
 */
function DrygmyStarGemEffectResolvePost(customData, event, organItem, organIndex, slotType) {
    const resolveEffect = event.resolveEffect
    if (resolveEffect.getRegistryName() != 'ars_nouveau:glyph_harvest') return
    /**@type {Internal.EntityHitResult} */
    const hitResult = event.rayTraceResult
    if (!(hitResult instanceof $EntityHitResult)) return
    let hitEntity = hitResult.getEntity()
    if (!(hitEntity instanceof $LivingEntity)) return
    if (hitEntity.entityType.is(DrygmyBlacklistTag)) return
    let lootTable = hitEntity.getLootTable()
    let itemList = Utils.rollChestLoot(lootTable).toArray()
    SpawnLootAtLocation(hitEntity.level, hitEntity.blockPosition(), itemList)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:drygmy_star_gem')
        .addOnlyStrategy('ars_effect_resolve_post', DrygmyStarGemEffectResolvePost)
)
