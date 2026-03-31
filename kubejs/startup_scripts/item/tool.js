// priority: 1000
// 工具（具有独立功能的物品）
StartupEvents.registry('item', event => {
    event.create('lucky_cookie').texture('kubejs:item/organs/food/lucky_cookie').food(food => {
        food.hunger(1).saturation(1).alwaysEdible().eaten(event => {
            if (!event.player) return
            event.player.server.runCommandSilent(`/title ${event.player.name.getString()} title {"translate":"${randomGet(luckyCookieSentence)}"}`)
            if (Math.random() < 0.02) {
                event.player.give(Item.of('kubejs:lucky_cookie_organ'))
            }
        })
    }).tag('supplementaries:cookies').maxStackSize(64)

    event.create('key_to_infinity').rarity('epic').texture('kubejs:item/tools/key_to_infinity').maxStackSize(1)

    event.create('blood_extractor')
        .texture('kubejs:item/tools/blood_extractor')
        .maxStackSize(1)
        .useDuration(itemStack => 30)
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

    event.create('infinity_dimension_interference')
        .texture('kubejs:item/tools/infinity_dimension_interference')
        .maxStackSize(1)
        .useDuration(itemStack => 20)
        .useAnimation('bow')
        .use((level, player, hand) => true)
        .releaseUsing((itemstack, level, entity) => {
            return itemstack
        })
        .finishUsing((itemstack, level, entity) => {
            if (!entity.isPlayer() || !AStages.serverHasStage('ftb_final_dim_restrict_1', level.server)) return Item.empty
            let restriction = AStages.getRestrictionById(ARestrictionTypes.DIMENSION, 'main/final_dim_restrict_1')
            if (entity instanceof $ServerPlayer) ADimensionRestriction.removeDimensionAccess(entity, restriction)
            return Item.empty
        })
})
