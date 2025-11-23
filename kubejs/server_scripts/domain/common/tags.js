// priority: 1000
ServerEvents.tags('item', event => {
    event.add('kubejs:sweets', ['bakery:pudding_slice', 'bakery:chocolate_tart_slice', 'bakery:glowberry_pie_slice', 'bakery:cornet', 'bakery:jam_roll', 'bakery:apple_cupcake', 'bakery:misslilitu_biscuit', 'bakery:waffle', 'bakery:chocolate_truffle', 'bakery:sweetberry_cupcake', 'bakery:apple_pie_slice', 'minecraft:cookie', 'bakery:strawberry_cake_slice', 'minecraft:honey_bottle', 'supplementaries:candy', 'bakery:chocolate_cake_slice', 'bakery:sweetberry_cake_slice', 'bakery:chocolate_gateau_slice', 'bakery:bundt_cake_slice', 'bakery:linzer_tart_slice', 'bakery:strawberry_cupcake', 'bakery:chocolate_glazed_cookie', 'bakery:sweetberry_glazed_cookie', 'bakery:strawberry_glazed_cookie', 'minecraft:cake', 'bakery:strawberry_cake', 'bakery:sweetberry_cake', 'bakery:chocolate_cake', 'bakery:chocolate_gateau', 'bakery:bundt_cake', 'bakery:linzer_tart', 'bakery:apple_pie', 'bakery:glowberry_tart', 'bakery:chocolate_tart', 'bakery:pudding'])

    event.add('kubejs:cake', ['minecraft:cake', 'bakery:strawberry_cake', 'bakery:sweetberry_cake', 'bakery:chocolate_cake', 'bakery:chocolate_gateau', 'bakery:bundt_cake', 'bakery:linzer_tart', 'bakery:apple_pie', 'bakery:glowberry_tart', 'bakery:chocolate_tart', 'bakery:pudding', 'create:blaze_cake', 'create:creative_blaze_cake', 'tconstruct:earth_cake', 'tconstruct:sky_cake', 'tconstruct:ichor_cake', 'tconstruct:ender_cake', 'tconstruct:blood_cake', 'tconstruct:magma_cake'])

    event.add('kubejs:beer', ['brewery:beer_wheat', 'brewery:beer_hops', 'brewery:beer_nettle', 'brewery:beer_oat', 'brewery:beer_haley', 'brewery:whiskey_jojannik', 'brewery:whiskey_lilitusinglemalt', 'brewery:whiskey_cristelwalker', 'brewery:beer_barley', 'brewery:whiskey_maggoallan', 'brewery:whiskey_ak', 'brewery:whiskey_carrasconlabel', 'brewery:whiskey_smokey_reverie', 'brewery:whiskey_highland_hearth', 'brewery:whiskey_jamesons_malt'])

    event.add('kubejs:wine', ['vinery:jo_special_mixture', 'vinery:eiswein', 'vinery:glowing_wine', 'vinery:apple_wine', 'vinery:red_wine', 'vinery:apple_cider', 'vinery:solaris_wine', 'vinery:mellohi_wine', 'vinery:mead', 'vinery:chorus_wine', 'vinery:villagers_fright', 'vinery:cherry_wine', 'vinery:chenet_wine', 'vinery:clark_wine', 'vinery:magnetic_wine', 'vinery:stal_wine', 'vinery:jellie_wine', 'vinery:bottle_mojang_noir', 'vinery:noir_wine', 'vinery:strad_wine', 'vinery:bolvar_wine', 'vinery:aegis_wine', 'vinery:cristel_wine', 'vinery:creepers_crush', 'vinery:kelp_cider', 'vinery:lilitu_wine',])

    event.add('kubejs:nature', ['crittersandcompanions:dragonfly_wing'])

    event.add('kubejs:tinker_organ', ['chestcavity:tinker_heart'])
    event.add('kubejs:heart', ['chestcavity:tinker_heart'])
    event.add('kubejs:machine', ['chestcavity:tinker_heart'])

    event.add('tconplanner:creative_material', ['kubejs:genesis_tinker_blueprint'])

    event.add('tconstruct_js:cannot_mending', ['kubejs:god_tinker_heart', 'kubejs:furnace_core', 'kubejs:burning_heart', 'kubejs:energy_bottle_red', 'kubejs:originiums', 'kubejs:soul_cage', 'kubejs:red_wolf_beard', 'kubejs:raccoon_paw', 'kubejs:boar_nose', 'kubejs:ignited_armour', 'kubejs:pitcher_stomach', 'kubejs:vita_sunflower', 'kubejs:ender_guardian_spine', 'kubejs:embers_liver', 'kubejs:harbinger_lung'])

    event.add('kubejs:tinker_anvil', ['tconstruct:tinkers_anvil', 'tconstruct:scorched_anvil'])

    event.add('ftbqaa:immune/lightning', ['kubejs:unstable_matter'])
    event.add('ftbqaa:immune/explosion', [])
    event.add('ftbqaa:immune/fire', [])
    event.add('ftbqaa:immune/cactus', [])
})

ServerEvents.tags('entity_type', event => {
    event.add('ars_nouveau:drygmy_blacklist', BossEntityTypeList)
})