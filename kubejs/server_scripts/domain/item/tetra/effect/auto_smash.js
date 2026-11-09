// priority: 500
/**
 * @param {Object} customData
 * @param {Internal.LootContextJS} event
 */
function AutoSmashBlockLoot(customData, event) {
    const entity = event.entity
    if (!entity || !entity.isLiving()) return
    const level = event.level
    const block = event.destroyedBlock
    if (!block) return
    let heldItem = entity.mainHandItem
    /**@type {Internal.ModularItem} */
    let modularItem = heldItem.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:auto_smash')
    if (effectLevel <= 0) return
    let newLoot = []
    event.loot.forEach(pItem => {
        let processingInv = new $ProcessingInventory(pCtx => { })
        processingInv.insertItem(pItem, false)
        let warpper = new $RecipeWrapper(processingInv)
        let curshingRecipe = $CreateRecipesType.CRUSHING.find(warpper, level)
        if (!curshingRecipe.isPresent()) {
            curshingRecipe = $CreateRecipesType.MILLING.find(warpper, level)
        }
        if (!curshingRecipe.isPresent()) return newLoot.push(pItem)
        for (let i = 0; i < pItem.getCount(); i++) {
            /**@type {Internal.ItemStack[]} */
            let pResult = curshingRecipe.get().rollResults()
            if (pResult.length <= 0) return
            newLoot = newLoot.concat(pResult)
        }
    })
    if (newLoot.length > 0) {
        event.loot.clear()
        event.loot.addAll(newLoot)
    }
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:auto_smash')
        .addStrategy('block_loot_before', AutoSmashBlockLoot, -10)
)
