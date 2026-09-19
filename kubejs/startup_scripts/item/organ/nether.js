// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:ignited_armour').maxDamage(30).maxStackSize(1).texture('kubejs:item/organs/nether/ignited_armour').tag('kubejs:nether').tag('kubejs:liver')

    event.create('kubejs:magam_colloid').food(food => food.hunger(1).saturation(2).effect('minecraft:fire_resistance', 600, 0, 1)).maxStackSize(1).texture('kubejs:item/organs/nether/magam_colloid').tag('kubejs:nether')

    event.create('kubejs:blaze_spine').maxStackSize(1).texture('kubejs:item/organs/nether/blaze_spine').tag('kubejs:nether').tag('kubejs:spine')

    event.create('kubejs:explosion_cavity').maxStackSize(1).texture('kubejs:item/organs/nether/explosion_cavity').tag('kubejs:nether').tag('kubejs:lung')

    event.create('kubejs:ghast_sac').food(food => food.hunger(2).saturation(1).effect('minecraft:fire_resistance', 200, 0, 1)).maxStackSize(1).texture('kubejs:item/organs/nether/ghast_sac').tag('kubejs:nether').tag('kubejs:lung')

    event.create('kubejs:hoglin_rumen').food(food => food.hunger(2).saturation(1).effect('minecraft:fire_resistance', 200, 0, 1)).maxStackSize(1).tag('kubejs:nether').texture('kubejs:item/organs/nether/hoglin_rumen').tag('kubejs:stomach')

    event.create('kubejs:golden_stone').maxStackSize(1).texture('kubejs:item/organs/nether/golden_stone').tag('kubejs:nether')

    event.create('kubejs:fireproof_appendix').food(food => food.hunger(2).saturation(0.5).effect('minecraft:fire_resistance', 200, 0, 1)).maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_appendix').tag('kubejs:appendix')
    event.create('kubejs:fireproof_intestine').food(food => food.hunger(2).saturation(0.5).effect('minecraft:fire_resistance', 200, 0, 1)).maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_intestine').tag('kubejs:intestine')
    event.create('kubejs:fireproof_heart').food(food => food.hunger(2).saturation(0.5).effect('minecraft:fire_resistance', 200, 0, 1)).maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_heart').tag('kubejs:heart')
    event.create('kubejs:fireproof_kidney').food(food => food.hunger(2).saturation(0.5).effect('minecraft:fire_resistance', 200, 0, 1)).maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_kidney').tag('kubejs:kidney')
    event.create('kubejs:fireproof_liver').food(food => food.hunger(2).saturation(0.5).effect('minecraft:fire_resistance', 200, 0, 1)).maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_liver').tag('kubejs:liver')
    event.create('kubejs:fireproof_lung').food(food => food.hunger(2).saturation(0.5).effect('minecraft:fire_resistance', 200, 0, 1)).maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_lung').tag('kubejs:lung')
    event.create('kubejs:fireproof_muscle').food(food => food.hunger(2).saturation(0.5).effect('minecraft:fire_resistance', 200, 0, 1)).maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_muscle').tag('kubejs:muscle')
    event.create('kubejs:fireproof_rib').maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_rib').tag('kubejs:bone')
    event.create('kubejs:fireproof_spine').maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_spine').tag('kubejs:spine')
    event.create('kubejs:fireproof_spleen').food(food => food.hunger(2).saturation(0.5).effect('minecraft:fire_resistance', 200, 0, 1)).maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_spleen').tag('kubejs:spleen')
    event.create('kubejs:fireproof_stomach').food(food => food.hunger(2).saturation(0.5).effect('minecraft:fire_resistance', 200, 0, 1)).maxStackSize(1).tag('kubejs:nether').tag('kubejs:basic').texture('kubejs:item/organs/nether/fireproof_stomach').tag('kubejs:stomach')
})