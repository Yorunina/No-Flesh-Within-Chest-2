// priority: 1000
const EternalOathEntitySpawnedConfig = [
    { healthMulti: 1, attackMulti: 1, armorMulti: 1, toughnessMulti: 1, lootMulti: 0 },
    { healthMulti: 2, attackMulti: 1, armorMulti: 1, toughnessMulti: 1, lootMulti: 0.1 },
    { healthMulti: 3, attackMulti: 1, armorMulti: 1, toughnessMulti: 1, lootMulti: 0.2 },
    { healthMulti: 5, attackMulti: 1.5, armorMulti: 1, toughnessMulti: 1, lootMulti: 0.5 },
    { healthMulti: 10, attackMulti: 1.5, armorMulti: 1, toughnessMulti: 1, lootMulti: 0.8 },
    { healthMulti: 20, attackMulti: 2, armorMulti: 1.5, toughnessMulti: 1.5, lootMulti: 1 },
    { healthMulti: 30, attackMulti: 3, armorMulti: 1.5, toughnessMulti: 1.5, lootMulti: 1.2 },
    { healthMulti: 50, attackMulti: 4, armorMulti: 2, toughnessMulti: 2, lootMulti: 1.5 },
    { healthMulti: 100, attackMulti: 5, armorMulti: 2, toughnessMulti: 2, lootMulti: 2 },
    { healthMulti: 300, attackMulti: 6, armorMulti: 2.5, toughnessMulti: 2.5, lootMulti: 2 },
    { healthMulti: 500, attackMulti: 7, armorMulti: 2.5, toughnessMulti: 2.5, lootMulti: 2 },
    { healthMulti: 1000, attackMulti: 8, armorMulti: 3, toughnessMulti: 3, lootMulti: 2 },
]
const EternalOathLootMultiplierIdentifier = 'EternalOathLootMultiplier'

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
            .dynamicAttribute(ctx => {
                const stack = ctx.getStack()
                const nbt = stack.getOrCreateTag()
                const state = Math.min(nbt.getInt('state'), 11)
                if (state == 0) return
                ctx.modify('kubejs:loot_multiplier', EternalOathLootMultiplierIdentifier, EternalOathEntitySpawnedConfig[state].lootMulti, 'addition')
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