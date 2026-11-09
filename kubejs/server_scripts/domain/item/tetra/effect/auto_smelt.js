// priority: 500
/**
 * @param {Object} customData
 * @param {Internal.LootContextJS} event
 */
function AutoSmeltBlockLoot(customData, event) {
    const entity = event.entity
    if (!entity || !entity.isLiving()) return
    const level = event.level
    const block = event.destroyedBlock
    if (!block) return
    const pos = block.pos
    let heldItem = entity.mainHandItem
    /**@type {Internal.ModularItem} */
    let modularItem = heldItem.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:auto_smelt')
    if (effectLevel <= 0) return
    const recipeManager = level.getRecipeManager()
    const registryAccess = level.registryAccess()
    let experience = 0
    let newLoot = []
    event.loot.forEach(pItem => {
        let pRecipe = recipeManager.getRecipeFor('minecraft:smelting', new $SimpleContainer(pItem), level)
        if (!pRecipe.isPresent()) return newLoot.push(pItem)
        let exp = pRecipe.get().getExperience() * pItem.getCount()
        let pResult = pRecipe.get().getResultItem(registryAccess).copy()
        pResult.setCount(pItem.getCount() * pResult.getCount())
        experience += exp
        newLoot.push(pResult)
    })
    if (newLoot.length > 0) {
        event.loot.clear()
        event.loot.addAll(newLoot)
    }
    if (experience > 0) {
        $ExperienceOrb.award(level, pos, experience)
    }
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:auto_smelt')
        .addStrategy('block_loot_before', AutoSmeltBlockLoot, -20)
)
