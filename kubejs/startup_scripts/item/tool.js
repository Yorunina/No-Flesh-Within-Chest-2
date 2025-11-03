// priority: 1000
// 工具（具有独立功能的物品）
StartupEvents.registry('item', event => {
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

    event.create('blood_extractor').texture('kubejs:item/tools/blood_extractor').maxStackSize(1)

    event.create('key_to_infinity').texture('kubejs:item/tools/key_to_infinity').maxStackSize(1)

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
