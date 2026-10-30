// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.deploying(['kubejs:pressurized_arm'], ['kubejs:telescopic_attack_arm', 'minecraft:blaze_powder'])
    event.recipes.create.deploying(['kubejs:telescopic_attack_arm'], ['kubejs:telescopic_arm', 'minecraft:gunpowder'])
    event.recipes.create.deploying(['kubejs:telescopic_arm'], ['create:brass_hand', 'create:iron_sheet'])
    event.recipes.create.deploying(['kubejs:machine_witch_fibroma'], ['kubejs:witch_fibroma', 'supplementaries:jar'])
    event.recipes.create.deploying(['kubejs:world_token_weather'], ['minecraft:writable_book', 'minecraft:prismarine_crystals'])
    event.recipes.create.deploying(['kubejs:world_token_creative'], ['minecraft:writable_book', 'minecraft:glowstone_dust'])
    event.recipes.create.deploying(['kubejs:world_token_gamerule'], ['minecraft:writable_book', 'minecraft:redstone'])
    event.recipes.create.deploying(['kubejs:ore_vein_generator'], ['tetra:geode', 'create_connected:control_chip'])
})

ServerEvents.recipes(event => {
    event.recipes.create.deploying('kubejs:fourth_fabritem', ['kubejs:third_fabritem', 'kubejs:other_fabritem'])
    event.recipes.create.item_application('kubejs:flesh_casing', ['#forge:stripped_logs', 'kubejs:flesh_ingot'])
    event.recipes.create.item_application('kubejs:organ_processing_table', [
        'minecraft:crafting_table',
        Item.of(
            'create_biotech:large_cardboard_box',
            '{CapturedEntity:{id:"biomancy:flesh_blob"},CapturedEntityDescId:"entity.biomancy.flesh_blob"}'
        ).weakNBT()
    ])
    event.recipes.create.item_application('kubejs:stress_extract', ['createutilities:void_motor', 'kubejs:factory_ingot'])
})
