// priority: 500
LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.BLOCK)
        .apply(ctx => {
            const entity = ctx.entity
            if (!entity || !entity.isLiving()) return
            const level = ctx.level
            const block = ctx.destroyedBlock
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
            ctx.loot.forEach(pItem => {
                let pRecipe = recipeManager.getRecipeFor('minecraft:smelting', new $SimpleContainer(pItem), level)
                if (!pRecipe.isPresent()) return newLoot.push(pItem)
                let exp = pRecipe.get().getExperience() * pItem.getCount()
                let pResult = pRecipe.get().getResultItem(registryAccess).copy()
                pResult.setCount(pItem.getCount() * pResult.getCount())
                experience += exp
                newLoot.push(pResult)
            })
            if (newLoot.length > 0) {
                ctx.loot.clear()
                ctx.loot.addAll(newLoot)
            }
            if (experience > 0) {
                $ExperienceOrb.award(level, pos, experience)
            }
        })
})