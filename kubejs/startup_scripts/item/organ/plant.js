// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:pitcher_stomach').maxStackSize(1).texture('kubejs:item/organs/plant/pitcher_stomach').maxDamage(10).tag('kubejs:plant').tag('kubejs:stomach')
    event.create('kubejs:crimson_brain').maxStackSize(1).texture('kubejs:item/organs/plant/crimson_brain').tag('kubejs:plant')
    event.create('kubejs:twisting_weeping_intestine').maxStackSize(1).texture('kubejs:item/organs/plant/twisting_weeping_intestine').tag('kubejs:plant').tag('kubejs:intestine')
    event.create('kubejs:vita_rose_liver').maxStackSize(1).texture('kubejs:item/organs/plant/vita_rose_liver').tag('kubejs:plant').tag('kubejs:liver')
    event.create('kubejs:lily_pad_lung').maxStackSize(1).texture('kubejs:item/organs/plant/lily_pad_lung').tag('kubejs:plant').tag('kubejs:lung')
    event.create('kubejs:cherry_bone').maxStackSize(1).texture('kubejs:item/organs/plant/cherry_bone').tag('kubejs:plant').tag('kubejs:bone')
    event.create('kubejs:vita_berry').maxStackSize(1).texture('kubejs:item/organs/plant/vita_berry').tag('kubejs:plant')
    event.create('kubejs:vita_sunflower').maxStackSize(1).texture('kubejs:item/organs/plant/vita_sunflower').maxDamage(15).tag('kubejs:plant')
    event.create('kubejs:rootling_ectoplasm').maxStackSize(1).texture('kubejs:item/organs/plant/rootling_ectoplasm').tag('kubejs:plant')
    event.create('kubejs:foliaath_stem').maxStackSize(1).texture('kubejs:item/organs/plant/foliaath_stem').tag('kubejs:plant').tag('kubejs:spine')
    event.create('kubejs:crimson_rib').maxStackSize(1).tag('kubejs:plant').texture('kubejs:item/organs/nature/crimson_rib').tag('kubejs:bone')

    event.create('kubejs:hop_kidney')
        .overrideOtherStackedOnMe((stack, oStack, slot, action, player, access) => {
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY || !slot.allowModification(player)) return false
            if (oStack.isEmpty()) {
                RemoveBundleOneStack(stack).ifPresent(pStack => {
                    PlayBundleRemoveSound(player)
                    access.set(pStack)
                })
            } else if (oStack.hasTag('kubejs:beer')) {
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
            } else if (oStack.hasTag('kubejs:beer')) {
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
        .food(food => food.hunger(2).saturation(1).effect('brewery:drunk', 200, 0, 1))
        .maxStackSize(1)
        .texture('kubejs:item/organs/plant/hop_kidney')
        .tag('kubejs:plant')
        .tag('kubejs:kidney')
})