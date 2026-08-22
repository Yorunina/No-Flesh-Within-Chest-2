// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:furnace_core').maxStackSize(1).texture('kubejs:item/organs/machine/furnace_core').maxDamage(100).tag('kubejs:heart').tag('kubejs:machine')
    event.create('kubejs:burning_heart').maxStackSize(1).texture('kubejs:item/organs/machine/burning_heart').maxDamage(100).tag('kubejs:heart').tag('kubejs:machine')
    event.create('kubejs:revolution_cable').maxStackSize(1).texture('kubejs:item/organs/machine/revolution_cable').tag('kubejs:revolution').tag('kubejs:machine').tag('kubejs:spine')
    event.create('kubejs:revolution_relay').maxStackSize(1).texture('kubejs:item/organs/machine/revolution_relay').tag('kubejs:revolution').tag('kubejs:machine')
    event.create('kubejs:revolution_delay').maxStackSize(1).texture('kubejs:item/organs/machine/revolution_delay').tag('kubejs:revolution').tag('kubejs:machine')
    event.create('kubejs:revolution_bell').maxStackSize(1).texture('kubejs:item/organs/machine/revolution_bell').tag('kubejs:revolution').tag('kubejs:machine')
    event.create('kubejs:blaze_pressurizer').maxStackSize(1).texture('kubejs:item/organs/machine/blaze_pressurizer').tag('kubejs:machine')

    event.create('kubejs:telescopic_arm').maxStackSize(1).texture('kubejs:item/organs/machine/telescopic_arm').tag('kubejs:machine')
    event.create('kubejs:telescopic_attack_arm').maxStackSize(1).texture('kubejs:item/organs/machine/telescopic_attack_arm').tag('kubejs:machine')

    event.create('kubejs:lava_life_cycle_system').maxStackSize(1).texture('kubejs:item/organs/machine/lava_life_cycle_system').tag('kubejs:machine')

    event.create('kubejs:prowler_rotating_shaft').maxStackSize(1).texture('kubejs:item/organs/machine/prowler_rotating_shaft').tag('kubejs:machine')

    event.create('kubejs:watcher_probe').maxStackSize(1).texture('kubejs:item/organs/machine/watcher_probe').tag('kubejs:machine')

    event.create('kubejs:fiery_core').maxStackSize(1).texture('kubejs:item/organs/machine/fiery_core').fireResistant().tag('kubejs:machine').tag('kubejs:heart')

    event.create('kubejs:thermometer').maxStackSize(1).texture('kubejs:item/organs/machine/thermometer').tag('kubejs:machine').tag('kubejs:bone')

    event.create('kubejs:energy_bottle_red').maxStackSize(1).texture('kubejs:item/organs/machine/energy_bottle_red').maxDamage(100).tag('kubejs:muscle').tag('kubejs:machine')

    event.create('kubejs:small_acid_tank').maxStackSize(1).texture('kubejs:item/organs/machine/small_acid_tank').maxDamage(300).tag('kubejs:machine')

    event.create('kubejs:iron_repair_device').maxStackSize(1).texture('kubejs:item/organs/machine/iron_repair_device').tag('kubejs:machine')

    event.create('kubejs:cyborgization_device').maxStackSize(1).texture('kubejs:item/organs/machine/cyborgization_device').tag('kubejs:machine').maxDamage(30)

    event.create('kubejs:programmable_automatic_core').texture('kubejs:item/organs/machine/programmable_automatic_core').maxStackSize(1).tag('kubejs:machine')

    event.create('kubejs:inner_furnace').maxStackSize(1).tag('kubejs:machine').tag('kubejs:basic').texture('kubejs:item/organs/machine/inner_furnace').tag('kubejs:heart')
    event.create('kubejs:golem_cable').maxStackSize(1).tag('kubejs:machine').tag('kubejs:basic').texture('kubejs:item/organs/machine/golem_cable').tag('kubejs:spine')
    event.create('kubejs:golem_plating').maxStackSize(1).tag('kubejs:machine').tag('kubejs:basic').texture('kubejs:item/organs/machine/golem_plating').tag('kubejs:bone')
    event.create('kubejs:piston_muscle').maxStackSize(1).tag('kubejs:machine').tag('kubejs:basic').texture('kubejs:item/organs/machine/piston_muscle').tag('kubejs:muscle')

    event.create('kubejs:pure_color_reaction').maxStackSize(1).tag('kubejs:machine').texture('kubejs:item/organs/machine/pure_color_reaction').tag('kubejs:stomach')
    event.create('kubejs:blood_crystal_factory').maxStackSize(1).tag('kubejs:machine').texture('kubejs:item/organs/machine/blood_crystal_factory').tag('kubejs:heart')
    event.create('kubejs:machine_witch_fibroma').maxStackSize(1).tag('kubejs:machine').texture('kubejs:item/organs/machine/machine_witch_fibroma').tag('kubejs:stomach')
    event.create('kubejs:pressurized_arm').maxStackSize(1).tag('kubejs:machine').texture('kubejs:item/organs/machine/pressurized_arm').tag('kubejs:muscle')
    event.create('kubejs:ore_vein_generator').maxStackSize(1)
        .overrideOtherStackedOnMe((stack, oStack, slot, action, player, access) => {
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY || !slot.allowModification(player)) return false
            if (oStack.isEmpty()) {
                RemoveBundleOneStack(stack).ifPresent(pStack => {
                    PlayBundleRemoveSound(player)
                    access.set(pStack)
                })
            } else if (oStack.hasTag('forge:ores')) {
                let added = AddItemIntoBundle(stack, oStack, 3, (pStack) => 1)
                if (added > 0) {
                    PlayerBundleInsertSound(player)
                    oStack.shrink(added)
                }
            }
            return true
        })
        .overrideStackedOnOther((stack, slot, action, player) => {
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY) return false
            let oStack = slot.getItem()
            if (oStack.isEmpty()) {
                PlayBundleRemoveSound(player)
                RemoveBundleOneStack(stack).ifPresent((pStack) => slot.safeInsert(pStack))
            } else if (oStack.hasTag('forge:ores')) {
                let taken = slot.safeTake(oStack.getCount(), 65535, player)
                let added = AddItemIntoBundle(stack, taken, 3, (pStack) => 1)
                if (added > 0) PlayerBundleInsertSound(player)
                if (taken.getCount() > added) slot.safeInsert(taken.copyWithCount(taken.getCount() - added))
            }
            return true
        })
        .barWidth((stack) => {
            let stackList = GetBundleContents(stack)
            return Math.min(1 + 12 * Math.min(stackList.length, 1), 13)
        })
        .barColor(() => Color.DARK_BLUE)
        .tooltipImage((stack) => {
            let itemList = $NonNullList.create()
            GetBundleContents(stack).forEach((pStack) => itemList.add(pStack))
            return Optional.of(new $BundleTooltip(itemList, GetBundleCountentWeight(stack, (pStack) => pStack.getMaxStackSize() / 64)))
        })
        .canFitInsideContainerItems(false)
        .texture('kubejs:item/organs/machine/ore_vein_generator')
        .tag('kubejs:machine')

    event.create('kubejs:damage_mod').maxStackSize(1).tag('kubejs:machine').texture('kubejs:item/organs/machine/damage_mod')
    event.create('kubejs:bridge_mod').maxStackSize(1).tag('kubejs:machine').texture('kubejs:item/organs/machine/bridge_mod')
})