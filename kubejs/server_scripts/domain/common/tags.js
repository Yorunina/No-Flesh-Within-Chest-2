// priority: 1000
ServerEvents.tags('item', event => {
    event.add('kubejs:sweets', ['bakery:pudding_slice', 'bakery:chocolate_tart_slice', 'bakery:glowberry_pie_slice', 'bakery:cornet', 'bakery:jam_roll', 'bakery:apple_cupcake', 'bakery:misslilitu_biscuit', 'bakery:waffle', 'bakery:chocolate_truffle', 'bakery:sweetberry_cupcake', 'bakery:apple_pie_slice', 'minecraft:cookie', 'bakery:strawberry_cake_slice', 'minecraft:honey_bottle', 'supplementaries:candy', 'bakery:chocolate_cake_slice', 'bakery:sweetberry_cake_slice', 'bakery:chocolate_gateau_slice', 'bakery:bundt_cake_slice', 'bakery:linzer_tart_slice', 'bakery:strawberry_cupcake', 'bakery:chocolate_glazed_cookie', 'bakery:sweetberry_glazed_cookie', 'bakery:strawberry_glazed_cookie', 'minecraft:cake', 'bakery:strawberry_cake', 'bakery:sweetberry_cake', 'bakery:chocolate_cake', 'bakery:chocolate_gateau', 'bakery:bundt_cake', 'bakery:linzer_tart', 'bakery:apple_pie', 'bakery:glowberry_tart', 'bakery:chocolate_tart', 'bakery:pudding'])

    event.add('kubejs:cake', ['minecraft:cake', 'bakery:strawberry_cake', 'bakery:sweetberry_cake', 'bakery:chocolate_cake', 'bakery:chocolate_gateau', 'bakery:bundt_cake', 'bakery:linzer_tart', 'bakery:apple_pie', 'bakery:glowberry_tart', 'bakery:chocolate_tart', 'bakery:pudding', 'create:blaze_cake', 'create:creative_blaze_cake', 'tconstruct:earth_cake', 'tconstruct:sky_cake', 'tconstruct:ichor_cake', 'tconstruct:ender_cake', 'tconstruct:blood_cake', 'tconstruct:magma_cake'])

    event.add('kubejs:beer', ['brewery:beer_wheat', 'brewery:beer_hops', 'brewery:beer_nettle', 'brewery:beer_oat', 'brewery:beer_haley', 'brewery:whiskey_jojannik', 'brewery:whiskey_lilitusinglemalt', 'brewery:whiskey_cristelwalker', 'brewery:beer_barley', 'brewery:whiskey_maggoallan', 'brewery:whiskey_ak', 'brewery:whiskey_carrasconlabel', 'brewery:whiskey_smokey_reverie', 'brewery:whiskey_highland_hearth', 'brewery:whiskey_jamesons_malt'])

    event.add('kubejs:wine', ['vinery:jo_special_mixture', 'vinery:eiswein', 'vinery:glowing_wine', 'vinery:apple_wine', 'vinery:red_wine', 'vinery:apple_cider', 'vinery:solaris_wine', 'vinery:mellohi_wine', 'vinery:mead', 'vinery:chorus_wine', 'vinery:villagers_fright', 'vinery:cherry_wine', 'vinery:chenet_wine', 'vinery:clark_wine', 'vinery:magnetic_wine', 'vinery:stal_wine', 'vinery:jellie_wine', 'vinery:bottle_mojang_noir', 'vinery:noir_wine', 'vinery:strad_wine', 'vinery:bolvar_wine', 'vinery:aegis_wine', 'vinery:cristel_wine', 'vinery:creepers_crush', 'vinery:kelp_cider', 'vinery:lilitu_wine',])

    event.add('kubejs:nature', ['crittersandcompanions:dragonfly_wing'])

    event.add('kubejs:tinker_organ', ['chestcavity:tinker_heart'])
    event.add('kubejs:heart', ['chestcavity:tinker_heart', 'chestcavity:dragon_heart', 'chestcavity:fireproof_heart', 'chestcavity:small_animal_heart', 'chestcavity:rabbit_heart', 'chestcavity:insect_heart', 'chestcavity:ender_heart', 'chestcavity:saltwater_heart', 'chestcavity:rotten_heart', 'chestcavity:animal_heart'])
    event.add('kubejs:bone', ['chestcavity:withered_rib', 'chestcavity:fireproof_rib', 'chestcavity:small_animal_rib', 'chestcavity:rotten_rib', 'chestcavity:animal_rib', 'chestcavity:dragon_rib', 'chestcavity:rib', 'chestcavity:ender_rib'])
    event.add('kubejs:machine', ['chestcavity:tinker_heart'])

    event.add('tconplanner:creative_material', ['kubejs:genesis_tinker_blueprint'])

    event.add('tconstruct_js:cannot_mending', ['kubejs:god_tinker_heart', 'kubejs:furnace_core', 'kubejs:burning_heart', 'kubejs:energy_bottle_red', 'kubejs:originiums', 'kubejs:soul_cage', 'kubejs:red_wolf_beard', 'kubejs:raccoon_paw', 'kubejs:boar_nose', 'kubejs:ignited_armour', 'kubejs:pitcher_stomach', 'kubejs:vita_sunflower', 'kubejs:ender_guardian_spine', 'kubejs:embers_liver', 'kubejs:harbinger_lung'])

    event.add('kubejs:tinker_anvil', ['tconstruct:tinkers_anvil', 'tconstruct:scorched_anvil'])

    event.add('ftbqaa:immune/lightning', ['kubejs:unstable_matter'])
    event.add('ftbqaa:immune/explosion', [])
    event.add('ftbqaa:immune/fire', [])
    event.add('ftbqaa:immune/cactus', [])

    // 谢肉祭桌子物品标签
    event.add('kubejs:the_carnival/table', ['kaleidoscope_cookery:table_oak', 'kaleidoscope_cookery:table_spruce', 'kaleidoscope_cookery:table_acacia', 'kaleidoscope_cookery:table_bamboo', 'kaleidoscope_cookery:table_birch', 'kaleidoscope_cookery:table_cherry', 'kaleidoscope_cookery:table_crimson', 'kaleidoscope_cookery:table_dark_oak', 'kaleidoscope_cookery:table_jungle', 'kaleidoscope_cookery:table_mangrove', 'kaleidoscope_cookery:table_warped'])

    event.add('kubejs:the_carnival/cake', ['bakery:linzer_tart', 'bakery:bundt_cake', 'bakery:chocolate_gateau', 'bakery:chocolate_cake', 'bakery:sweetberry_cake', 'bakery:strawberry_cake', 'minecraft:cake', 'bakery:chocolate_tart', 'bakery:pudding', 'bakery:glowberry_tart', 'bakery:apple_pie'])

    event.add('kubejs:the_carnival/bread', ['bakery:crusty_bread', 'bakery:bread', 'bakery:baguette', 'bakery:toast', 'bakery:braided_bread', 'bakery:bun', 'farm_and_charm:farmers_bread', 'farm_and_charm:oat_pancake', 'bakery:waffle'])
    event.add('kubejs:the_carnival/food_bag', ['vinery:white_grape_bag', 'vinery:cherry_bag', 'farm_and_charm:lettuce_bag', 'farm_and_charm:potato_bag', 'farm_and_charm:carrot_bag', 'farm_and_charm:onion_bag', 'farm_and_charm:strawberry_bag', 'farm_and_charm:corn_bag', 'farm_and_charm:flour_bag', 'vinery:red_grape_bag', 'farm_and_charm:tomato_bag', 'farm_and_charm:beetroot_bag'])
    event.add('kubejs:the_carnival/treasure', ['lightmanscurrency:coinpile_copper', 'lightmanscurrency:coinblock_copper', 'lightmanscurrency:coinblock_gold', 'lightmanscurrency:coinpile_gold', 'lightmanscurrency:coinpile_iron', 'lightmanscurrency:coinblock_iron', 'lightmanscurrency:coinpile_emerald', 'lightmanscurrency:coinblock_emerald', 'lightmanscurrency:coinpile_diamond', 'lightmanscurrency:coinblock_diamond', 'lightmanscurrency:coinpile_netherite', 'lightmanscurrency:coinblock_netherite'])
    event.add('kubejs:the_carnival/flower', ['minecraft:allium', 'minecraft:orange_tulip', 'minecraft:pink_tulip', 'minecraft:oxeye_daisy', 'minecraft:wither_rose', 'minecraft:poppy', 'minecraft:dandelion', 'minecraft:red_tulip', 'minecraft:cornflower', 'minecraft:lily_of_the_valley', 'minecraft:azure_bluet', 'minecraft:blue_orchid', 'minecraft:white_tulip'])
})

ServerEvents.tags('entity_type', event => {
    event.add('ars_nouveau:drygmy_blacklist', BossEntityTypeList)
})


ServerEvents.tags('block', event => {
    event.add('kubejs:the_carnival/feasts', ['kaleidoscope_cookery:fondant_spider_eye', 'kaleidoscope_cookery:crystal_lamb_chop', 'kaleidoscope_cookery:blaze_lamb_chop', 'kaleidoscope_cookery:dark_cuisine', 'kaleidoscope_cookery:suspicious_stir_fry', 'kaleidoscope_cookery:slime_ball_meal', 'kaleidoscope_cookery:dongpo_pork', 'kaleidoscope_cookery:braised_fish', 'kaleidoscope_cookery:pan_seared_knight_steak', 'kaleidoscope_cookery:stargazy_pie', 'kaleidoscope_cookery:golden_salad', 'kaleidoscope_cookery:frost_lamb_chop', 'kaleidoscope_cookery:nether_style_sashimi', 'kaleidoscope_cookery:desert_style_sashimi', 'kaleidoscope_cookery:tundra_style_sashimi', 'kaleidoscope_cookery:fondant_pie', 'kaleidoscope_cookery:chorus_fried_egg', 'kaleidoscope_cookery:yakitori', 'kaleidoscope_cookery:end_style_sashimi', 'kaleidoscope_cookery:spicy_chicken', 'kaleidoscope_cookery:sweet_and_sour_ender_pearls', 'kaleidoscope_cookery:cold_style_sashimi', 'kaleidoscope_cookery:shengjian_mantou'])
    event.add('kubejs:the_carnival/cake', ['bakery:linzer_tart', 'bakery:bundt_cake', 'bakery:chocolate_gateau', 'bakery:chocolate_cake', 'bakery:sweetberry_cake', 'bakery:strawberry_cake', 'minecraft:cake', 'bakery:chocolate_tart', 'bakery:pudding', 'bakery:glowberry_tart', 'bakery:apple_pie'])
    event.add('kubejs:the_carnival/beer', ['brewery:beer_hops', 'brewery:beer_wheat', 'brewery:beer_barley', 'brewery:whiskey_maggoallan', 'brewery:whiskey_carrasconlabel', 'brewery:whiskey_ak', 'brewery:whiskey_highland_hearth', 'brewery:whiskey_smokey_reverie', 'brewery:whiskey_jamesons_malt', 'brewery:whiskey_jojannik', 'brewery:whiskey_lilitusinglemalt', 'brewery:whiskey_cristelwalker', 'brewery:beer_haley', 'brewery:beer_oat', 'brewery:beer_nettle'])
    event.add('kubejs:the_carnival/bread', ['bakery:crusty_bread_block', 'bakery:bread_block', 'bakery:baguette_block', 'bakery:toast_block', 'bakery:braided_bread_block', 'bakery:bun_block', 'farm_and_charm:farmers_bread_block', 'farm_and_charm:oat_pancake_block', 'bakery:waffle_block'])
    event.add('kubejs:the_carnival/food_bag', ['vinery:white_grape_bag', 'vinery:cherry_bag', 'farm_and_charm:lettuce_bag', 'farm_and_charm:potato_bag', 'farm_and_charm:carrot_bag', 'farm_and_charm:onion_bag', 'farm_and_charm:strawberry_bag', 'farm_and_charm:corn_bag', 'farm_and_charm:flour_bag', 'vinery:red_grape_bag', 'farm_and_charm:tomato_bag', 'farm_and_charm:beetroot_bag'])
    event.add('kubejs:the_carnival/treasure', ['lightmanscurrency:coinpile_copper', 'lightmanscurrency:coinblock_copper', 'lightmanscurrency:coinblock_gold', 'lightmanscurrency:coinpile_gold', 'lightmanscurrency:coinpile_iron', 'lightmanscurrency:coinblock_iron', 'lightmanscurrency:coinpile_emerald', 'lightmanscurrency:coinblock_emerald', 'lightmanscurrency:coinpile_diamond', 'lightmanscurrency:coinblock_diamond', 'lightmanscurrency:coinpile_netherite', 'lightmanscurrency:coinblock_netherite'])
})