// priority: 1000
StartupEvents.registry('item', event => {
    event.create('scrap').texture('kubejs:item/scrap')
    event.create('fire_gem').texture('kubejs:item/fire_gem')
    event.create('relic_metal_ingot').texture('kubejs:item/relic_metal_ingot')
    event.create('polished_amber').texture('kubejs:item/polished_amber')
    event.create('dreadsteel_ingot').texture('kubejs:item/dreadsteel_ingot')
    event.create('common_mineral_cluster').texture('kubejs:item/common_mineral_cluster')
    event.create('rare_mineral_cluster').texture('kubejs:item/rare_mineral_cluster')
    event.create('dark_stardust_fragment').texture('kubejs:item/dark_stardust_fragment')
    event.create('unbreakable_core').texture('kubejs:item/unbreakable_core')
    event.create('disenchantment_book').texture('kubejs:item/disenchantment_book')
    event.create('exclamation_mark').texture('kubejs:item/exclamation_mark')
    event.create('full_mark').texture('kubejs:item/full_mark')
    event.create('ritual_catalyst').texture('kubejs:item/ritual_catalyst')
    event.create('lime_powder').texture('kubejs:item/lime_powder')



    event.create('kubejs:sponsor_badge').texture('kubejs:item/sponsor_badge').maxStackSize(1)
    event.create('kubejs:mysterious_trinket').texture('kubejs:item/mysterious_trinket').maxStackSize(64)
    event.create('kubejs:chicken_flavor_powder').texture('kubejs:item/chicken_flavor_powder').maxStackSize(64)


    event.create('lucky_cookie').texture('kubejs:item/organs/food/lucky_cookie').food(food => {
        food.hunger(1).saturation(1).alwaysEdible().eaten(event => {
            if (!event.player) return
            event.player.server.runCommandSilent(`/title ${event.player.name.getString()} title {"translate":"${randomGet(luckyCookieSentence)}"}`)
            if (Math.random() < 0.02) {
                event.player.give(Item.of('kubejs:lucky_cookie_organ'))
            }
        })
    }).tag('supplementaries:cookies').maxStackSize(64)


    event.create('friend_to_the_end').texture('kubejs:item/friend_to_the_end').maxStackSize(1)
        .tag('curios:ring')
        .useAnimation('bow')
        .useDuration(itemStack => 40)
        .use((level, player, hand) => {
            return true
        })
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

    event.create('candy_canes_wand', 'basic').texture('kubejs:item/candy_canes_wand')
        .maxStackSize(1)
        .modifyAttribute('irons_spellbooks:spell_power', 'kubejsSpellPowerWeaponBoost', 0.1, 'addition')
        .rarity('epic')
        .useAnimation('eat')
        .use((level, player, hand) => {
            return true
        })
        .useDuration(itemStack => 20)
        .finishUsing((itemstack, level, entity) => {
            if (level.isClientSide()) return itemstack
            entity.playSound('entity.player.burp')
            entity.eat(level, Item.of('kubejs:candy'))
            entity.addItemCooldown(itemstack, 20 * 30)
            return itemstack
        })


    event.create('artist_wand', 'irons_spells_js:magic_sword')
        .tier('diamond')
        .attackDamageBaseline(2.0)
        .attackDamageBonus(3.0)
        .speedBaseline(-2.5)
        .speed(4.0)
        .maxDamage(1680)
        .maxStackSize(1)
        .rarity('epic')
        .useAnimation('bow')
        .use((level, player, hand) => {
            return true
        })
        .useDuration(itemStack => 20)
        .finishUsing((itemstack, level, entity) => {
            if (level.isClientSide()) return itemstack
            entity.potionEffects.add('kubejs:colorful', 20 * 20, 0)
            entity.addItemCooldown(itemstack, 20 * 60)
            return itemstack
        })


    event.create('unholy_grail').texture('kubejs:item/unholy_grail')
        .maxStackSize(1)
        .rarity('epic')
        .useAnimation('drink')
        .use((level, player, hand) => {
            return true
        })
        .useDuration(itemStack => 20)
        .finishUsing((itemstack, level, entity) => {
            if (level.isClientSide()) return itemstack
            entity.playSound('entity.player.burp')
            let itemMap = global.getPlayerChestCavityItemMap(entity)
            global.organCharmPlayerWarpTask(entity)
            if (itemMap.has('kubejs:forbidden_fruit')) {
                entity.potionEffects.add('minecraft:regeneration', 20 * 24, 2)
                entity.potionEffects.add('minecraft:absorption', 20 * 40, 1)
                entity.potionEffects.add('minecraft:strength', 20 * 50, 1)
                entity.potionEffects.add('minecraft:speed', 20 * 60, 0)
                entity.potionEffects.add('minecraft:resistance', 20 * 60, 1)
                entity.potionEffects.add('irons_spellbooks:instant_mana', 1, 2)
            } else {
                entity.potionEffects.add('minecraft:hunger', 20 * 8, 2)
                entity.potionEffects.add('minecraft:poison', 20 * 8, 1)
                entity.potionEffects.add('minecraft:wither', 20 * 5, 2)
                entity.potionEffects.add('minecraft:weakness', 20 * 10, 1)
                entity.potionEffects.add('minecraft:nausea', 20 * 12, 0)
                entity.potionEffects.add('minecraft:slowness', 20 * 12, 0)
            }
            entity.addItemCooldown(itemstack, 20 * 60)
            return itemstack
        })



    event.create('holy_potion').texture('kubejs:item/holy_potion').maxStackSize(1)
        .rarity('epic')
        .useAnimation('drink')
        .use((level, player, hand) => {
            return true
        })
        .useDuration(itemStack => 20)
        .finishUsing((itemstack, level, entity) => {
            if (level.isClientSide()) return itemstack
            entity.server.runCommandSilent(`/lichdom revoke ${entity.name.getString()}`)
            return
        })


    event.create('advanced_chest_opener').texture('kubejs:item/advanced_chest_opener').maxStackSize(1)
    
    event.create('blood_extractor').texture('kubejs:item/blood_extractor').maxStackSize(1)

    event.create('glass_vial').texture('kubejs:item/glass_vial').maxStackSize(1)
        .useAnimation('bow')
        .use((level, player, hand) => {
            return true
        })
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
