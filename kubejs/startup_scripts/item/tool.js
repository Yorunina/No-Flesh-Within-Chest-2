// priority: 1000
// 工具（具有独立功能的物品）
StartupEvents.registry('item', event => {
    event.create('key_to_infinity').rarity('epic').texture('kubejs:item/tools/key_to_infinity').maxStackSize(1)

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
        .overrideOtherStackedOnMe(BundleStackedOnMe(4, item => item.hasTag('kubejs:organ'), true))
        .overrideStackedOnOther(BundleStackedOnOther(4, item => item.hasTag('kubejs:organ'), true))
        .barWidth(stack => BundleBarWidth(stack, 4))
        .barColor(() => Color.DARK_BLUE)
        .tooltipImage(BundleTooltip)
        .canFitInsideContainerItems(false)
        .texture('kubejs:item/tools/organ_purification_tank')


    event.create('organ_bundle').maxStackSize(1)
        .overrideOtherStackedOnMe(BundleStackedOnMe(64, item => item.hasTag('kubejs:organ'), true))
        .overrideStackedOnOther(BundleStackedOnOther(64, item => item.hasTag('kubejs:organ'), true))
        .barWidth(stack => BundleBarWidth(stack, 64))
        .barColor(() => Color.DARK_BLUE)
        .tooltipImage(BundleTooltip)
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

    event.create('kubejs:blank_compact_machine')
        .maxStackSize(1)
        .texture('kubejs:item/tools/blank_compact_machine')
        .overrideOtherStackedOnMe((stack, oStack, slot, action, player, access) => {
            if (action != ClickAction.SECONDARY) return false
            if (!oStack.hasTag('kubejs:compact_machine')) return false
            if (!oStack.hasNBT()) return false
            if (!oStack.getNbt().contains('room_pos')) return false
            slot.set(oStack.copyWithCount(stack.getCount()))
            return true
        })

    event.create('kubejs:world_token_gamerule').texture('kubejs:item/tools/world_token_gamerule').maxStackSize(1)
        .overrideOtherStackedOnMe((stack, oStack, slot, action, player, access) => {
            if ((!oStack || oStack.isEmpty()) && action == ClickAction.SECONDARY && slot.allowModification(player)) {
                if (!stack.hasNBT()) stack.setNbt(new $CompoundTag())
                const nbt = stack.getNbt()
                let state = nbt.getInt('state')
                nbt.putInt('state', (state + 1) % 24)
                return true
            }
            return false
        })

    event.create('kubejs:world_token_creative').texture('kubejs:item/tools/world_token_creative').maxStackSize(1)
        .overrideOtherStackedOnMe((stack, oStack, slot, action, player, access) => {
            if ((!oStack || oStack.isEmpty()) && action == ClickAction.SECONDARY && slot.allowModification(player)) {
                if (!stack.hasNBT()) stack.setNbt(new $CompoundTag())
                const nbt = stack.getNbt()
                let state = nbt.getInt('state')
                nbt.putInt('state', (state + 1) % 10)
                return true
            }
            return false
        })

    event.create('kubejs:world_token_weather').texture('kubejs:item/tools/world_token_weather').maxStackSize(1)
        .overrideOtherStackedOnMe((stack, oStack, slot, action, player, access) => {
            if ((!oStack || oStack.isEmpty()) && action == ClickAction.SECONDARY && slot.allowModification(player)) {
                if (!stack.hasNBT()) stack.setNbt(new $CompoundTag())
                const nbt = stack.getNbt()
                let state = nbt.getInt('state')
                nbt.putInt('state', (state + 1) % 3)
                return true
            }
            return false
        })

})
