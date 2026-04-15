// priority: 500
RegistryOrgan('kubejs:bookwyrm_star_gem')
    .addScore('kubejs:magic_capacity', 1)
    .addScore('chestcavity:nerves', 1)
    .setCanSpawn(true)
/**
 * 
 * @param {any} customData 
 * @param {Internal.EffectResolveEvent} event 
 * @param {Internal.ItemStack} organItem 
 * @param {number} organIndex 
 * @param {string} slotType 
 */
function BookwyrmStarGemEffectResolvePost(customData, event, organItem, organIndex, slotType) {
    if (!(event.resolveEffect instanceof $EffectSmelt)) return
    const level = event.world
    const rayTraceResult = event.rayTraceResult
    if (!(rayTraceResult instanceof $BlockHitResult)) return
    const spellStats = event.spellStats
    let itemEntities = level.getEntitiesOfClass($ItemEntity, AABB.ofBlock(rayTraceResult.getBlockPos()).inflate(spellStats.getAoeMultiplier() + 1.0))
    /**@type {Internal.ItemEntity[]} */
    let enchantItemEntityList = []
    /**@type {Internal.Map<string, number>[]} */
    let enchantList = []
    itemEntities.forEach(pItemEntity => {
        let pItem = pItemEntity.getItem()
        let enchants = EnchantmentHelper.getEnchantments(pItem)
        if (!enchants || enchants.size() <= 0) return
        enchantItemEntityList.push(pItemEntity)
        enchantList.push(enchants)
    })
    if (enchantItemEntityList.length == 0) return
    /**@type {Internal.Map<string, number>} */
    let targetEnchant = RandomGet(enchantList)
    enchantItemEntityList.forEach(pItemEntity => {
        let pItem = pItemEntity.getItem()
        if (!pItem.hasNBT()) return
        let nbt = pItem.getNbt()
        pItem.is('enchanted_book') ? nbt.remove('StoredEnchantments') : nbt.remove('Enchantments')
        EnchantmentHelper.setEnchantments(targetEnchant, pItem)
    })
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:bookwyrm_star_gem')
        .addOnlyStrategy('ars_effect_resolve_post', BookwyrmStarGemEffectResolvePost)
)
