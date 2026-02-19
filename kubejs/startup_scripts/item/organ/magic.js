// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:animted_soul').maxStackSize(1).texture('kubejs:item/organs/magic/animted_soul').tag('kubejs:magic')
    
    // 糖果
    event.create('kubejs:candy_heart').maxStackSize(1).texture('kubejs:item/organs/magic/candy_heart').tag('kubejs:magic').tag('kubejs:heart')
    event.create('kubejs:candy_pancreas').maxStackSize(1).texture('kubejs:item/organs/magic/candy_pancreas').tag('kubejs:magic')
    event.create('kubejs:candy_stomach').maxStackSize(1).texture('kubejs:item/organs/magic/candy_stomach').tag('kubejs:magic').tag('kubejs:stomach')


    // 星宝石
    event.create('kubejs:whirlisprig_star_gem').maxStackSize(1).texture('kubejs:item/organs/magic/whirlisprig_star_gem').tag('kubejs:magic').tag('kubejs:gem')
    event.create('kubejs:heal_star_gem').maxStackSize(1).texture('kubejs:item/organs/magic/heal_star_gem').tag('kubejs:magic').tag('kubejs:gem')
    event.create('kubejs:deepling_star_gem').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/deepling_star_gem').tag('kubejs:gem')
    event.create('kubejs:drygmy_star_gem').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/drygmy_star_gem').tag('kubejs:gem')
    event.create('kubejs:starbuncle_star_gem').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/starbuncle_star_gem').tag('kubejs:gem')

    event.create('kubejs:soul_cage').maxStackSize(1).maxDamage(50).texture('kubejs:item/organs/magic/soul_cage').tag('kubejs:magic')
    event.create('kubejs:soul_wing').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/soul_wing')
    event.create('kubejs:coral_armor').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/coral_armor')
    event.create('kubejs:deepling_ectoplasm').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/deepling_ectoplasm')
    event.create('kubejs:amethyst_core').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/amethyst_core')
    event.create('kubejs:koboleton_spine').maxStackSize(1).tag('kubejs:magic').tag('kubejs:spine').texture('kubejs:item/organs/magic/koboleton_spine')
    event.create('kubejs:koboleton_rib').maxStackSize(1).tag('kubejs:magic').tag('kubejs:bone').texture('kubejs:item/organs/magic/koboleton_rib')
    event.create('kubejs:koboleton_coccyx').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/koboleton_coccyx')
    event.create('kubejs:aptrgangr_soul').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/aptrgangr_soul')
    event.create('kubejs:draugr_skull').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/draugr_skull')
    event.create('kubejs:hippocamtus_scale').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/hippocamtus_scale')
    event.create('kubejs:dream_hippocampus').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/dream_hippocampus')
    event.create('kubejs:calamity_bone_spur').maxStackSize(1).tag('kubejs:magic').tag('kubejs:bone').texture('kubejs:item/organs/magic/calamity_bone_spur')
    event.create('kubejs:potion_skin').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/potion_skin')
    event.create('kubejs:necromancer_skull').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/necromancer_skull')
    event.create('kubejs:frost_eyeball').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/frost_eyeball')
    event.create('kubejs:blazing_eyeball').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/blazing_eyeball')
    event.create('kubejs:sacred_heart').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/sacred_heart')
    event.create('kubejs:organic_mana_condense').maxStackSize(1).tag('kubejs:magic').tag('kubejs:lung').texture('kubejs:item/organs/magic/organic_mana_condense')
    event.create('kubejs:source_resonator').maxStackSize(1).tag('kubejs:magic').texture('kubejs:item/organs/magic/source_resonator')
})