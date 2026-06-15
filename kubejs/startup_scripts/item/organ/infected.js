// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:rotten_appendix').maxStackSize(1).food(food => food.hunger(1).saturation(0.5).effect('minecraft:hunger', 200, 0, 0.6)).tag('kubejs:infected').tag('kubejs:basic').texture('kubejs:item/organs/infected/rotten_appendix').tag('kubejs:appendix')
    event.create('kubejs:rotten_intestine').maxStackSize(1).food(food => food.hunger(1).saturation(0.5).effect('minecraft:hunger', 200, 0, 0.6)).tag('kubejs:infected').tag('kubejs:basic').texture('kubejs:item/organs/infected/rotten_intestine').tag('kubejs:intestine')
    event.create('kubejs:rotten_heart').maxStackSize(1).food(food => food.hunger(1).saturation(0.5).effect('minecraft:hunger', 200, 0, 0.6)).tag('kubejs:infected').tag('kubejs:basic').texture('kubejs:item/organs/infected/rotten_heart').tag('kubejs:heart')
    event.create('kubejs:rotten_kidney').maxStackSize(1).food(food => food.hunger(1).saturation(0.5).effect('minecraft:hunger', 200, 0, 0.6)).tag('kubejs:infected').tag('kubejs:basic').texture('kubejs:item/organs/infected/rotten_kidney').tag('kubejs:kidney')
    event.create('kubejs:rotten_liver').maxStackSize(1).food(food => food.hunger(1).saturation(0.5).effect('minecraft:hunger', 200, 0, 0.6)).tag('kubejs:infected').tag('kubejs:basic').texture('kubejs:item/organs/infected/rotten_liver').tag('kubejs:liver')
    event.create('kubejs:rotten_lung').maxStackSize(1).food(food => food.hunger(1).saturation(0.5).effect('minecraft:hunger', 200, 0, 0.6)).tag('kubejs:infected').tag('kubejs:basic').texture('kubejs:item/organs/infected/rotten_lung').tag('kubejs:lung')
    event.create('kubejs:rotten_muscle').maxStackSize(1).food(food => food.hunger(1).saturation(0.5).effect('minecraft:hunger', 200, 0, 0.6)).tag('kubejs:infected').tag('kubejs:basic').texture('kubejs:item/organs/infected/rotten_muscle').tag('kubejs:muscle')
    event.create('kubejs:rotten_rib').maxStackSize(1).tag('kubejs:infected').tag('kubejs:basic').texture('kubejs:item/organs/infected/rotten_rib').tag('kubejs:bone')
    event.create('kubejs:rotten_spine').maxStackSize(1).tag('kubejs:infected').tag('kubejs:basic').texture('kubejs:item/organs/infected/rotten_spine').tag('kubejs:spine')
    event.create('kubejs:rotten_spleen').maxStackSize(1).food(food => food.hunger(1).saturation(0.5).effect('minecraft:hunger', 200, 0, 0.6)).tag('kubejs:infected').tag('kubejs:basic').texture('kubejs:item/organs/infected/rotten_spleen').tag('kubejs:spleen')
    event.create('kubejs:rotten_stomach').maxStackSize(1).food(food => food.hunger(1).saturation(0.5).effect('minecraft:hunger', 200, 0, 0.6)).tag('kubejs:infected').tag('kubejs:basic').texture('kubejs:item/organs/infected/rotten_stomach').tag('kubejs:stomach')

    event.create('kubejs:mutation_intestine').maxStackSize(1).food(food => food.hunger(3).saturation(0.5).effect('minecraft:fire_resistance', 200, 0, 1)).tag('kubejs:infected').texture('kubejs:item/organs/infected/mutation_intestine').tag('kubejs:intestine')

    event.create('kubejs:worm_neuron').maxStackSize(1).texture('kubejs:item/organs/infected/worm_neuron').tag('kubejs:infected')

    event.create('kubejs:tumor').texture('kubejs:item/organs/infected/tumor').food(food => food.hunger(2).saturation(1).effect('minecraft:absorption', 600, 0, 1)).maxStackSize(1).tag('kubejs:organ').tag('kubejs:infected').tag('kubejs:tumor')

    event.create('kubejs:unformed_tumor').food(food => food.hunger(1).saturation(0.5).effect('minecraft:absorption', 600, 0, 1)).texture('kubejs:item/organs/infected/unformed_tumor').maxStackSize(1).tag('kubejs:organ').tag('kubejs:infected').tag('kubejs:tumor')

    event.create('kubejs:rosy_tumor').food(food => food.hunger(2).saturation(1).effect('minecraft:fire_resistance', 600, 0, 1)).texture('kubejs:item/organs/infected/rosy_tumor').maxStackSize(1).tag('kubejs:organ').tag('kubejs:rose').tag('kubejs:infected').tag('kubejs:tumor')

    event.create('kubejs:malignant_neuron_tumor').food(food => food.hunger(1).saturation(1)).texture('kubejs:item/organs/infected/malignant_neuron_tumor').maxDamage(600).maxStackSize(1).tag('kubejs:organ').tag('kubejs:infected')

    event.create('kubejs:bone_cage').texture('kubejs:item/organs/infected/bone_cage').maxStackSize(1).tag('kubejs:infected').tag('kubejs:bone')

    event.create('kubejs:wither_bone_cage').texture('kubejs:item/organs/infected/wither_bone_cage').maxStackSize(1).tag('kubejs:infected').tag('kubejs:bone')

    event.create('kubejs:parasitic_tumor')
        .overrideStackedOnOther((stack, slot, action, player) => {
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY) return false
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
        .food(food => food.hunger(2).saturation(1).effect('minecraft:absorption', 600, 0, 1))
        .texture('kubejs:item/organs/infected/parasitic_tumor')
        .maxStackSize(1)
        .tag('kubejs:organ')
        .tag('kubejs:infected')
        .tag('kubejs:tumor')

    event.create('kubejs:primal_heart')
        .texture('kubejs:item/organs/infected/primal_heart')
        .food(food => food.hunger(4).saturation(0.5).effect('minecraft:darkness', 600, 0, 1))
        .maxStackSize(1)
        .tag('kubejs:infected')
        .tag('kubejs:heart')

    event.create('kubejs:primal_bone_cage')
        .texture('kubejs:item/organs/infected/primal_bone_cage')
        .maxStackSize(1)
        .tag('kubejs:infected')
        .tag('kubejs:bone')

    event.create('kubejs:heart_of_mercy').maxStackSize(1).tag('kubejs:infected').tag('kubejs:heart').texture('kubejs:item/organs/infected/heart_of_mercy')

    event.create('kubejs:devour_teeth').maxStackSize(1).tag('kubejs:infected').texture('kubejs:item/organs/infected/devour_teeth')

    event.create('kubejs:nightmare_core').maxStackSize(1).tag('kubejs:infected').texture('kubejs:item/organs/infected/nightmare_core').tag('kubejs:organ').tag('kubejs:heart')

    event.create('kubejs:soul_core').maxStackSize(1).tag('kubejs:infected').texture('kubejs:item/organs/infected/soul_core').tag('kubejs:organ').tag('kubejs:heart')

    event.create('kubejs:bone_meal_bag').maxStackSize(1)
        .overrideOtherStackedOnMe((stack, oStack, slot, action, player, access) => {
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY || !slot.allowModification(player)) return false
            if (oStack.isEmpty()) {
                RemoveBundleOneStack(stack).ifPresent(pStack => {
                    PlayBundleRemoveSound(player)
                    access.set(pStack)
                })
            }
            return true
        })
        .overrideStackedOnOther((stack, slot, action, player) => {
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY) return false
            let oStack = slot.getItem()
            if (oStack.isEmpty()) {
                PlayBundleRemoveSound(player)
                RemoveBundleOneStack(stack).ifPresent((pStack) => slot.safeInsert(pStack))
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
        .texture('kubejs:item/organs/infected/bone_meal_bag').tag('kubejs:infected').tag('kubejs:stomach')

    event.create('kubejs:witch_fibroma')
        .overrideOtherStackedOnMe((stack, oStack, slot, action, player, access) => {
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY || !slot.allowModification(player)) return false
            if (oStack.isEmpty()) {
                RemoveBundleOneStack(stack).ifPresent(pStack => {
                    PlayBundleRemoveSound(player)
                    access.set(pStack)
                })
            } else if (!$PotionUtils.getPotion(oStack).effects.isEmpty()) {
                let added = AddItemIntoBundle(stack, oStack, 1, (pStack) => 1)
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
            } else if (!$PotionUtils.getPotion(oStack).effects.isEmpty()) {
                let taken = slot.safeTake(oStack.getCount(), 65535, player)
                let added = AddItemIntoBundle(stack, taken, 1, (pStack) => 1)
                if (added > 0) PlayerBundleInsertSound(player)
                if (taken.getCount() > added) slot.safeInsert(taken.copyWithCount(taken.getCount() - added))
            }
            return true
        })
        .barWidth((stack) => {
            let stackList = GetBundleContents(stack)
            return Math.min(1 + 12 * stackList.length, 13)
        })
        .barColor(() => Color.DARK_BLUE)
        .tooltipImage((stack) => {
            let itemList = $NonNullList.create()
            GetBundleContents(stack).forEach((pStack) => itemList.add(pStack))
            return Optional.of(new $BundleTooltip(itemList, GetBundleCountentWeight(stack, (pStack) => 1)))
        })
        .food(food => food.hunger(2).saturation(1).effect('minecraft:absorption', 600, 0, 1))
        .canFitInsideContainerItems(false)
        .texture('kubejs:item/organs/infected/witch_fibroma')
        .maxStackSize(1)
        .tag('kubejs:infected')
        .tag('kubejs:stomach')

    event.create('kubejs:navigating_liver')
        .overrideOtherStackedOnMe((stack, oStack, slot, action, player, access) => {
            const nbt = stack.getOrCreateTag()
            if (nbt.getInt('locating') == 1) return false
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY || !slot.allowModification(player)) return false
            if (oStack.isEmpty()) {
                RemoveBundleOneStack(stack).ifPresent(pStack => {
                    PlayBundleRemoveSound(player)
                    access.set(pStack)
                })
                nbt.put('locating', 0)
            } else if (oStack.getItem() instanceof $BaseSelectorItem) {
                let added = AddItemIntoBundle(stack, oStack, 1, (pStack) => 1)
                if (added > 0) {
                    PlayerBundleInsertSound(player)
                    oStack.shrink(added)
                }
                nbt.put('locating', 0)
            }
            return true
        })
        .overrideStackedOnOther((stack, slot, action, player) => {
            const nbt = stack.getOrCreateTag()
            if (nbt.getInt('locating') == 1) return false
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY) return false
            let oStack = slot.getItem()
            if (oStack.isEmpty()) {
                PlayBundleRemoveSound(player)
                RemoveBundleOneStack(stack).ifPresent((pStack) => slot.safeInsert(pStack))
                nbt.put('locating', 0)
            } else if (oStack.getItem() instanceof $BaseSelectorItem) {
                let taken = slot.safeTake(oStack.getCount(), 65535, player)
                let added = AddItemIntoBundle(stack, taken, 1, (pStack) => 1)
                if (added > 0) PlayerBundleInsertSound(player)
                if (taken.getCount() > added) slot.safeInsert(taken.copyWithCount(taken.getCount() - added))
                nbt.put('locating', 0)
            }
            return true
        })
        .barWidth((stack) => {
            let stackList = GetBundleContents(stack)
            return Math.min(1 + 12 * stackList.length, 13)
        })
        .barColor(() => Color.DARK_BLUE)
        .tooltipImage((stack) => {
            let itemList = $NonNullList.create()
            GetBundleContents(stack).forEach((pStack) => itemList.add(pStack))
            return Optional.of(new $BundleTooltip(itemList, GetBundleCountentWeight(stack, (pStack) => 1)))
        })
        .canFitInsideContainerItems(false)
        .texture('kubejs:item/organs/infected/navigating_liver')
        .maxStackSize(1)
        .tag('kubejs:infected')
        .tag('kubejs:liver')
})
