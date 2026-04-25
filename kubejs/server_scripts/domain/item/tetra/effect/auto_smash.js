// priority: 500
LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.BLOCK)
        .apply(ctx => {
            const entity = ctx.entity
            if (!entity || !entity.isLiving()) return
            const level = ctx.level
            const block = ctx.destroyedBlock
            if (!block) return
            let heldItem = entity.mainHandItem
            /**@type {Internal.ModularItem} */
            let modularItem = heldItem.getItem()
            if (!TetraJSUtils.isModularItem(modularItem)) return
            let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:auto_smash')
            if (effectLevel <= 0) return
            let newLoot = []
            ctx.loot.forEach(pItem => {
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
                ctx.loot.clear()
                ctx.loot.addAll(newLoot)
            }
        })
})