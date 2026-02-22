// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:worm_neuron')
        .maxStackSize(1)
        .texture('kubejs:item/organs/infected/worm_neuron')
        .tag('kubejs:infected')

    event.create('kubejs:tumor')
        .texture('kubejs:item/organs/infected/tumor')
        .maxStackSize(1)
        .tag('kubejs:organ')
        .tag('kubejs:infected')
        .tag('kubejs:tumor')

    event.create('kubejs:unformed_tumor')
        .texture('kubejs:item/organs/infected/unformed_tumor')
        .maxStackSize(1)
        .tag('kubejs:organ')
        .tag('kubejs:infected')
        .tag('kubejs:tumor')

    event.create('kubejs:rosy_tumor')
        .texture('kubejs:item/organs/infected/rosy_tumor')
        .maxStackSize(1)
        .tag('kubejs:organ')
        .tag('kubejs:rose')
        .tag('kubejs:infected')
        .tag('kubejs:tumor')

    event.create('kubejs:malignant_neuron_tumor')
        .texture('kubejs:item/organs/infected/malignant_neuron_tumor')
        .maxDamage(600)
        .maxStackSize(1)
        .tag('kubejs:organ')
        .tag('kubejs:infected')

    event.create('kubejs:parasitic_tumor')
        .overrideStackedOnOther((stack, slot, action, player) => {
            if (stack.getCount() != 1 || action != $ClickAction.SECONDARY) return false
            let nbt = stack.getOrCreateTag()
            if (!nbt.contains('organData')) return false
            let oStack = slot.getItem()
            if (oStack.isEmpty()) return false
            if (!oStack.hasTag('kubejs:organ') || oStack.hasTag('kubejs:tumor')) return false
            let organDataNbt = nbt.getCompound('organData')
            if (!oStack.hasNBT()) oStack.setNbt(new $CompoundTag())
            let oNbt = oStack.getNbt()
            oNbt.put('organData', organDataNbt)
            oNbt.putBoolean('Infected', true)
            stack.setCount(0)
            return true
        })
        .texture('kubejs:item/organs/infected/parasitic_tumor')
        .maxStackSize(1)
        .tag('kubejs:organ')
        .tag('kubejs:infected')
        .tag('kubejs:tumor')
})