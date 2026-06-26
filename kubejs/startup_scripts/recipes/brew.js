// priority: 1000
// 依赖于access widen
StartupEvents.postInit(event => {
    $PotionBrewing.addMix('minecraft:strength', 'minecraft:prismarine_shard', 'minecraft:water_breathing')
    $PotionBrewing.addMix('minecraft:awkward', 'minecraft:copper_ingot', 'potioncore:lightning')

    $PotionBrewing.addMix('biomancy:primordial_infestation', 'biomancy:acid_extract', 'chestcavity:organ_slip')
    $PotionBrewing.addMix('chestcavity:organ_slip', 'minecraft:redstone', 'chestcavity:long_organ_slip')
})