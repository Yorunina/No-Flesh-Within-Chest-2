// priority: 1000
MoreJSEvents.registerPotionBrewing(event => {
    event.addPotionBrewing('minecraft:prismarine_shard', 'minecraft:strength', 'minecraft:water_breathing')
    event.addPotionBrewing('minecraft:copper_ingot', 'minecraft:awkward', 'potioncore:lightning')

    event.addPotionBrewing('biomancy:acid_extract', 'biomancy:primordial_infestation', 'chestcavity:organ_slip')
    event.addPotionBrewing('minecraft:redstone', 'chestcavity:organ_slip', 'chestcavity:long_organ_slip')
})