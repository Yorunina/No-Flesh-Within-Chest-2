// priority: 1000
StartupEvents.registry('minecraft:item', event => {
    event.create('kubejs:relics_incense', 'basic')
        .texture('kubejs:item/curios/relics_incense')
        .maxStackSize(1)
        .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
            .canEquip(() => true)
            .canUnequip(() => true)
        )
        .tag('curios:incense')

    event.create('kubejs:ancient_incense', 'basic')
        .texture('kubejs:item/curios/ancient_incense')
        .maxStackSize(1)
        .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
            .canEquip(() => true)
            .canUnequip(() => true)
        )
        .tag('curios:incense')

    event.create('kubejs:eternal_incense', 'basic')
        .texture('kubejs:item/curios/eternal_incense')
        .maxStackSize(1)
        .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
            .canEquip(() => true)
            .canUnequip(() => true)
        )
        .overrideStackedOnOther((stack, slot, action, player) => {
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY) return false
            const nbt = stack.getOrCreateTag()
            const relicsKills = nbt.getInt('relicsKills') + 1
            const lootTimes = nbt.getInt('lootTimes') + 1
            
            const oStack = slot.getItem()
            if (oStack.isEmpty()) return false
            if (!oStack.hasTag('kubejs:organ') || !oStack.hasTag('kubejs:relics')) return false
            
            if (!oStack.hasNBT()) oStack.setNbt(new $CompoundTag())
            const oNbt = oStack.getNbt()
            const organDataNbt = new $CompoundTag()
            organDataNbt.putFloat('kubejs:extreme_strength', relicsKills * 0.1)
            organDataNbt.putFloat('kubejs:extreme_fitness', lootTimes * 0.01)
            oNbt.put('relicsOrganScore', organDataNbt)
            return true
        })
        .tag('curios:incense')
})