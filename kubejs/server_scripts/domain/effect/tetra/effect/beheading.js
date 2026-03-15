// priority: 500
LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.ENTITY)
        .apply(ctx => {
            const entity = ctx.entity
            if (!entity || !entity.isLiving()) return
            const killer = ctx.killerEntity
            if (!killer || !killer.isLiving()) return
            let heldItem = killer.mainHandItem
            /**@type {Internal.ModularItem} */
            let modularItem = heldItem.getItem()
            if (!TetraJSUtils.isModularItem(modularItem)) return
            let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:beheading')
            if (effectLevel <= 0) return

            if (Math.random() > effectLevel * 2) return
            let headItem = GetEntityHeadItem(entity)
            if (!headItem) return
            ctx.loot.add(headItem)
        })
})

