// priority: 5000
const DrygmyBlacklistTag = $TagKey.create($Registries.ENTITY_TYPE, 'ars_nouveau:drygmy_blacklist')
ServerEvents.tags('item', event => {
    event.add('curios:body', ['supplementaries:quiver'])

    event.add('kubejs:sweets', ['bakery:pudding_slice', 'bakery:chocolate_tart_slice', 'bakery:glowberry_pie_slice', 'bakery:cornet', 'bakery:jam_roll', 'bakery:apple_cupcake', 'bakery:misslilitu_biscuit', 'bakery:waffle', 'bakery:chocolate_truffle', 'bakery:sweetberry_cupcake', 'bakery:apple_pie_slice', 'minecraft:cookie', 'bakery:strawberry_cake_slice', 'minecraft:honey_bottle', 'supplementaries:candy', 'bakery:chocolate_cake_slice', 'bakery:sweetberry_cake_slice', 'bakery:chocolate_gateau_slice', 'bakery:bundt_cake_slice', 'bakery:linzer_tart_slice', 'bakery:strawberry_cupcake', 'bakery:chocolate_glazed_cookie', 'bakery:sweetberry_glazed_cookie', 'bakery:strawberry_glazed_cookie', 'minecraft:cake', 'bakery:strawberry_cake', 'bakery:sweetberry_cake', 'bakery:chocolate_cake', 'bakery:chocolate_gateau', 'bakery:bundt_cake', 'bakery:linzer_tart', 'bakery:apple_pie', 'bakery:glowberry_tart', 'bakery:chocolate_tart', 'bakery:pudding'])

    event.add('kubejs:cake', ['minecraft:cake', 'bakery:strawberry_cake', 'bakery:sweetberry_cake', 'bakery:chocolate_cake', 'bakery:chocolate_gateau', 'bakery:bundt_cake', 'bakery:linzer_tart', 'bakery:apple_pie', 'bakery:glowberry_tart', 'bakery:chocolate_tart', 'bakery:pudding', 'create:blaze_cake', 'create:creative_blaze_cake'])

    event.add('kubejs:beer', ['brewery:beer_wheat', 'brewery:beer_hops', 'brewery:beer_nettle', 'brewery:beer_oat', 'brewery:beer_haley', 'brewery:whiskey_jojannik', 'brewery:whiskey_lilitusinglemalt', 'brewery:whiskey_cristelwalker', 'brewery:beer_barley', 'brewery:whiskey_maggoallan', 'brewery:whiskey_ak', 'brewery:whiskey_carrasconlabel', 'brewery:whiskey_smokey_reverie', 'brewery:whiskey_highland_hearth', 'brewery:whiskey_jamesons_malt', 'kubejs:tasty_beer'])

    event.add('kubejs:wine', ['vinery:jo_special_mixture', 'vinery:eiswein', 'vinery:glowing_wine', 'vinery:apple_wine', 'vinery:red_wine', 'vinery:apple_cider', 'vinery:solaris_wine', 'vinery:mellohi_wine', 'vinery:mead', 'vinery:chorus_wine', 'vinery:villagers_fright', 'vinery:cherry_wine', 'vinery:chenet_wine', 'vinery:clark_wine', 'vinery:magnetic_wine', 'vinery:stal_wine', 'vinery:jellie_wine', 'vinery:bottle_mojang_noir', 'vinery:noir_wine', 'vinery:strad_wine', 'vinery:bolvar_wine', 'vinery:aegis_wine', 'vinery:cristel_wine', 'vinery:creepers_crush', 'vinery:kelp_cider', 'vinery:lilitu_wine',])


    event.add('kubejs:machine', [])

    event.add('maa:cannot_mending', ['kubejs:furnace_core', 'kubejs:burning_heart', 'kubejs:energy_bottle_red', 'kubejs:soul_cage', 'kubejs:red_wolf_beard', 'kubejs:raccoon_paw', 'kubejs:boar_nose', 'kubejs:ignited_armour', 'kubejs:pitcher_stomach', 'kubejs:vita_sunflower', 'kubejs:ender_guardian_spine', 'kubejs:harbinger_lung', 'kubejs:void_stomach_pouch'])

    event.add('maa:immune/lightning', ['kubejs:unstable_matter', 'tetra:thermal_cell'])
    event.add('maa:immune/explosion', ['tetra:thermal_cell'])
    event.add('maa:immune/fire', ['tetra:thermal_cell'])
    event.add('maa:immune/cactus', [])
    event.add('chestcavity:cannot_remove', [])
})

ServerEvents.tags('entity_type', event => {
    event.add('ars_nouveau:drygmy_blacklist', [])
})


ServerEvents.tags('block', event => {
    event.add('kubejs:chair_block', [
        'refurbished_furniture:oak_chair', 'refurbished_furniture:spruce_chair', 'refurbished_furniture:birch_chair', 'refurbished_furniture:jungle_chair', 'refurbished_furniture:acacia_chair', 'refurbished_furniture:dark_oak_chair', 'refurbished_furniture:mangrove_chair', 'refurbished_furniture:cherry_chair', 'refurbished_furniture:crimson_chair', 'refurbished_furniture:warped_chair', '#kaleidoscope_cookery:chair', 'candlelight:crimson_chair', 'candlelight:cherry_chair', 'candlelight:chair', 'candlelight:oak_chair', 'candlelight:dark_oak_chair', 'candlelight:acacia_chair', 'candlelight:jungle_chair', 'candlelight:birch_chair', 'candlelight:spruce_chair', 'candlelight:warped_chair', 'candlelight:mangrove_chair', 'candlelight:bamboo_chair', 'bakery:iron_chair'
    ])
    event.add('kubejs:table_block', [
        '#refurbished_furniture:tuckable', '#kaleidoscope_cookery:table', 'candlelight:dark_oak_big_table', 'candlelight:crimson_table', 'candlelight:crimson_big_table', 'candlelight:cherry_table', 'candlelight:cherry_big_table', 'candlelight:bamboo_table', 'candlelight:bamboo_big_table', 'bakery:iron_table', 'brewery:table', 'candlelight:dark_oak_table', 'candlelight:table', 'candlelight:side_table', 'candlelight:oak_table', 'candlelight:oak_big_table', 'candlelight:birch_table', 'candlelight:birch_big_table', 'candlelight:spruce_table', 'candlelight:spruce_big_table', 'candlelight:warped_big_table', 'candlelight:warped_table', 'candlelight:mangrove_big_table', 'candlelight:mangrove_table', 'candlelight:jungle_big_table', 'candlelight:jungle_table', 'candlelight:acacia_big_table', 'candlelight:acacia_table'
    ])
})

ServerEvents.tags('fluid', event => {
    event.add('kubejs:nutrients_fluid', ['minecraft:honey', 'minecraft:milk'])
})