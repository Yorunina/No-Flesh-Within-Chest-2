// priority: 1000
StartupEvents.registry('minecraft:item', event => {
    event.create('kubejs:eternal_oath', 'basic')
        .texture('kubejs:item/curios/eternal_oath')
        .maxStackSize(1)
        .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
            .canEquip(() => true)
            .onEquip((itemFrom, ctx, itemTo) => {
                /**@type {Internal.ServerPlayer} */
                const entity = ctx.entity()
                const level = entity.level
                if (level.isClientSide()) return
                if (!entity.isPlayer()) return
                entity.setKeepInventory(true)
            })
            .onUnequip((itemFrom, ctx, itemTo) => {
                /**@type {Internal.ServerPlayer} */
                const entity = ctx.entity()
                const level = entity.level
                if (level.isClientSide()) return
                if (!entity.isPlayer()) return
                entity.setKeepInventory(false)
            })
            .canUnequip(() => true)
        )
        .overrideOtherStackedOnMe((stack, oStack, slot, action, player, access) => {
            if ((!oStack || oStack.isEmpty()) && action == ClickAction.SECONDARY && slot.allowModification(player)) {
                if (!stack.hasNBT()) stack.setNbt(new $CompoundTag())
                const nbt = stack.getNbt()
                let state = nbt.getInt('state')
                nbt.putInt('state', (state + 1) % 12)
                return true
            }
            return false
        })
        .tag('curios:oath')

    event.create('kubejs:growing_oath', 'basic')
        .texture('kubejs:item/curios/growing_oath')
        .maxStackSize(1)
        .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
            .canEquip(() => true)
            .onEquip((itemFrom, ctx, itemTo) => {
                /**@type {Internal.ServerPlayer} */
                const entity = ctx.entity()
                const level = entity.level
                if (level.isClientSide()) return
                if (!entity.isPlayer()) return
                entity.setKeepInventory(true)
            })
            .onUnequip((itemFrom, ctx, itemTo) => {
                /**@type {Internal.ServerPlayer} */
                const entity = ctx.entity()
                const level = entity.level
                if (level.isClientSide()) return
                if (!entity.isPlayer()) return
                entity.setKeepInventory(false)
            })
            .canUnequip(() => true)
        )
        .tag('curios:oath')

    event.create('kubejs:immortal_oath', 'basic')
        .texture('kubejs:item/curios/immortal_oath')
        .maxStackSize(1)
        .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
            .canEquip(() => true)
            .canUnequip(() => true)
        )
        .tag('curios:oath')
})