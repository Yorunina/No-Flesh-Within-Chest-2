// priority: 1000
// 工具（具有独立功能的物品）
StartupEvents.registry('item', event => {
    event.create('key_to_infinity').rarity('epic').texture('kubejs:item/tools/key_to_infinity').maxStackSize(1)

    event.create('blood_extractor')
        .texture('kubejs:item/tools/blood_extractor')
        .maxStackSize(1)
        .useDuration(itemStack => 20)
        .useAnimation('bow')
        .use((level, player, hand) => true)
        .releaseUsing((itemstack, level, entity) => {
            return itemstack
        })
        .finishUsing((itemstack, level, entity) => {
            let nbt = itemstack.getOrCreateTag()
            let organScores = new $CompoundTag()
            let ray = entity.rayTrace(4, false)
            let target = entity
            if (ray.entity && ray.entity.isAlive()) target = ray.entity
            let targetCC = target.getChestCavityInstance()
            if (!targetCC) return itemstack
            targetCC.getOrganScores().forEach((key, value) => {
                organScores.putFloat(key, value)
            })
            nbt.put('organScores', organScores)
            itemstack.setNbt(nbt)
            return itemstack
        })

    event.create('experience_injection').maxStackSize(1).texture('kubejs:item/injections/experience_injection')
        .useDuration(itemStack => 65)
        .useAnimation('none')
        .use((level, player, hand) => {
            if (player instanceof $DeployerFakePlayer) return false
            if (level.isClientSide()) return true
            if (player.isPlayer()) player.triggerAnimation('kubejs:inject_animation', 3.25, 'linear', true, true)
            return true
        })
        .releaseUsing((itemstack, level, entity) => {
            if (level.isClientSide()) return itemstack
            if (entity.isPlayer()) entity.stopAnimation('kubejs:inject_animation')
            return itemstack
        })
        .finishUsing(/**@param {Player} entity */(itemstack, level, entity) => {
            if (level.isClientSide()) return itemstack
            if (!entity.isPlayer()) return itemstack

            if (!itemstack.hasNBT()) return itemstack
            const nbt = itemstack.getNbt()
            let expValue = nbt.getInt('value')
            if (entity.isCrouching()) {
                let remainingValue = MAAUtils.repairPlayerItems(entity, expValue, expValue)
                if (remainingValue > 0) entity.giveExperiencePoints(remainingValue)
                return Item.empty
            } else {
                let remainingValue = MAAUtils.repairPlayerItems(entity, expValue, expValue)
                if (remainingValue <= 0) return Item.empty
                nbt.putInt('value', remainingValue)
            }
            return itemstack
        })

    event.create('organ_purification_tank').maxStackSize(1)
        .overrideOtherStackedOnMe((stack, oStack, slot, action, player, access) => {
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY || !slot.allowModification(player)) return false
            if (oStack.isEmpty()) {
                RemoveBundleOneStack(stack).ifPresent(pStack => {
                    PlayBundleRemoveSound(player)
                    access.set(pStack)
                })
            } else if (oStack.hasTag('kubejs:organ')) {
                let added = AddItemIntoBundle(stack, oStack, 4, (pStack) => 1)
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
            } else if (oStack.hasTag('kubejs:organ')) {
                let taken = slot.safeTake(oStack.getCount(), 65535, player)
                let added = AddItemIntoBundle(stack, taken, 4, (pStack) => 1)
                if (added > 0) PlayerBundleInsertSound(player)
                if (taken.getCount() > added) slot.safeInsert(taken.copyWithCount(taken.getCount() - added))
            }
            return true
        })
        .barWidth((stack) => {
            let stackList = GetBundleContents(stack)
            return Math.min(1 + 12 * stackList.length / 4, 13)
        })
        .barColor(() => Color.DARK_BLUE)
        .tooltipImage((stack) => {
            let itemList = $NonNullList.create()
            GetBundleContents(stack).forEach((pStack) => itemList.add(pStack))
            return Optional.of(new $BundleTooltip(itemList, GetBundleCountentWeight(stack, (pStack) => 1)))
        })
        .canFitInsideContainerItems(false)
        .texture('kubejs:item/tools/organ_purification_tank')


    event.create('organ_bundle').maxStackSize(1)
        .overrideOtherStackedOnMe((stack, oStack, slot, action, player, access) => {
            if (stack.getCount() != 1 || action != ClickAction.SECONDARY || !slot.allowModification(player)) return false
            if (oStack.isEmpty()) {
                RemoveBundleOneStack(stack).ifPresent(pStack => {
                    PlayBundleRemoveSound(player)
                    access.set(pStack)
                })
            } else if (oStack.hasTag('kubejs:organ')) {
                let added = AddItemIntoBundle(stack, oStack, 64, (pStack) => 1)
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
            } else if (oStack.hasTag('kubejs:organ')) {
                let taken = slot.safeTake(oStack.getCount(), 65535, player)
                let added = AddItemIntoBundle(stack, taken, 64, (pStack) => 1)
                if (added > 0) PlayerBundleInsertSound(player)
                if (taken.getCount() > added) slot.safeInsert(taken.copyWithCount(taken.getCount() - added))
            }
            return true
        })
        .barWidth((stack) => {
            let stackList = GetBundleContents(stack)
            return Math.min(1 + 12 * stackList.length / 64, 13)
        })
        .barColor(() => Color.DARK_BLUE)
        .tooltipImage((stack) => {
            let itemList = $NonNullList.create()
            GetBundleContents(stack).forEach((pStack) => itemList.add(pStack))
            return Optional.of(new $BundleTooltip(itemList, GetBundleCountentWeight(stack, (pStack) => 1)))
        })
        .canFitInsideContainerItems(false)
        .texture('kubejs:item/tools/organ_bundle')

    event.create('kubejs:trophy_sword', 'sword')
        .tier('diamond')
        .attackDamageBaseline(2.0)
        .attackDamageBonus(3.0)
        .speedBaseline(-2.5)
        .speed(4.0)
        .maxDamage(32)
        .maxStackSize(1)
        .tag('minecraft:swords').tag('forge:tools').tag('minecraft:tools').texture('kubejs:item/tools/trophy_sword')
})
