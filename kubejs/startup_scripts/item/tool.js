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
})
