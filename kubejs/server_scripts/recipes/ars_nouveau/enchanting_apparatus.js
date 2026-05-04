// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.ars_nouveau.enchanting_apparatus(
        ['ars_nouveau:starbuncle_shards', 'ars_nouveau:mendosteen_pod', 'ars_nouveau:bastion_pod', 'ars_nouveau:frostaya_pod', 'ars_nouveau:bombegranate_pod', 'ars_nouveau:sourceberry_bush'],
        'kubejs:worm_of_taste',
        'kubejs:worm_of_gula',
        6666,
        false
    )

    event.recipes.ars_nouveau.enchanting_apparatus(
        ['minecraft:gold_block', 'ars_nouveau:source_gem_block', 'ars_nouveau:timer_spell_turret', 'ars_nouveau:shapers_focus', 'ars_nouveau:relay_warp', 'ars_nouveau:burst', 'ars_nouveau:glyph_aoe', 'ars_nouveau:glyph_dampen'],
        'ars_nouveau:arcane_platform',
        'kubejs:mantle_energy_extractor',
        2000,
        false
    )

    event.recipes.ars_nouveau.enchanting_apparatus(
        ['ars_nouveau:starbuncle_shards', 'ars_nouveau:whirlisprig_shards', 'ars_nouveau:wixie_shards', 'ars_nouveau:drygmy_shard'],
        'ars_nouveau:shapers_focus',
        'kubejs:dimension_shards',
        1000,
        false
    )

    event.recipes.ars_nouveau.enchanting_apparatus(
        ['create:golden_sheet', 'create:golden_sheet', 'cataclysm:ancient_metal_nugget', 'ars_nouveau:abjuration_essence'],
        'minecraft:amethyst_shard',
        'kubejs:exhausted_source_focus_crystal',
        100,
        false
    )
})
