// priority: 1000
// 工具（具有独立功能的物品）
StartupEvents.registry('item', event => {
    event.create('kubejs:signal_launch_permit').maxStackSize(1).texture('kubejs:item/tool/signal_launch_permit')
    event.create('kubejs:preset_structure_data_storage').maxStackSize(1).texture('kubejs:item/tool/preset_structure_data_storage')
    event.create('kubejs:rule_structure_data_storage').maxStackSize(1).texture('kubejs:item/tool/rule_structure_data_storage')
    event.create('kubejs:extract_loot_data_storage').maxStackSize(1).texture('kubejs:item/tool/extract_loot_data_storage')
    event.create('kubejs:biome_data_storage').maxStackSize(1).texture('kubejs:item/tool/biome_data_storage')

    event.create('plastic_stem_cells').maxStackSize(1).texture('kubejs:item/tools/plastic_stem_cells')
    event.create('lucky_cookie').texture('kubejs:item/organs/food/lucky_cookie').food(food => {
        food.hunger(1).saturation(1).alwaysEdible().eaten(event => {
            if (!event.player) return
            event.player.server.runCommandSilent(`/title ${event.player.name.getString()} title {"translate":"${randomGet(luckyCookieSentence)}"}`)
            if (Math.random() < 0.02) {
                event.player.give(Item.of('kubejs:lucky_cookie_organ'))
            }
        })
    }).tag('supplementaries:cookies').maxStackSize(64)

    event.create('friend_to_the_end').texture('kubejs:item/tools/friend_to_the_end').maxStackSize(1)
        .tag('curios:ring')
        .useAnimation('bow')
        .useDuration(itemStack => 40)
        .use((level, player, hand) => true)
        .finishUsing((itemstack, level, entity) => {
            if (level.isClientSide()) return itemstack
            if (itemstack.hasNBT() && itemstack.nbt.friendName && entity.isPlayer()) {
                let friend = Utils.server.getPlayer(itemstack.nbt.friendName)
                if (friend && friend.isAlive()) {
                    let targetDim = friend.level.getDimension()
                    entity.teleportTo(targetDim, friend.x, friend.y, friend.z, 0, 0)
                    entity.addItemCooldown(itemstack, 20 * 10)
                } else {
                    entity.tell($Serializer.fromJsonLenient({ translate: 'kubejs.msg.friend_to_the_end.1' }))
                }
            } else {
                entity.tell($Serializer.fromJsonLenient({ translate: 'kubejs.msg.friend_to_the_end.2' }))
                itemstack.setNbt({ friendName: entity.getUsername() })
                return itemstack
            }
            return itemstack
        })

    event.create('blood_extractor').texture('kubejs:item/tools/blood_extractor').maxStackSize(1)

    event.create('glass_vial').texture('kubejs:item/tools/glass_vial').maxStackSize(1)
        .useAnimation('bow')
        .use((level, player, hand) => true)
        .useDuration(itemStack => 20)
        .finishUsing((itemstack, level, entity) => {
            if (level.isClientSide()) return itemstack
            if (!itemstack.nbt?.organScores) return itemstack

            itemstack.nbt.organScores.getAllKeys().forEach(key => {
                let roundValue = RoundFix(itemstack.nbt.organScores[key], 2)
                let scoreString = Text.translate(`tooltips.kubejs.score_tag.${key}`).getString()
                let scoreTooltips = Text.translatable('tooltips.kubejs.glass_vial.4', Text.yellow(scoreString), Text.yellow(roundValue)).hover(Text.translate(`tooltips.kubejs.score_tag.hover.${key}`))
                entity.tell(scoreTooltips)
            })

            entity.addItemCooldown(itemstack, 20 * 5)
            return itemstack
        })
})
