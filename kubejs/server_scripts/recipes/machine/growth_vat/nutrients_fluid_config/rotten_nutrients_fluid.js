// priority: 502
const RottenNutrientsOrganDataWeightModel = new WeightRandomModel()
    .addWeightRandom({ name: 'kubejs:extreme_strength', mean: 1, sigma: 1 }, 5)
    .addWeightRandom({ name: 'chestcavity:strength', mean: 2, sigma: 1 }, 20)

const RottenNutrientsPotentialOrganDataWeightModel = new WeightRandomModel()
    .addWeightRandom({ name: 'chestcavity:nerves', mean: -1, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:health', mean: -1, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:fire_resistant', mean: -1, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:knockback_resistant', mean: 1, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:metabolism', mean: 0.5, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:detoxification', mean: 0.5, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:filtration', mean: -1, sigma: 0.5 }, 20)
    .addWeightRandom({ name: 'kubejs:crit_damage', mean: 0.5, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'kubejs:crit_chance', mean: 0.5, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:water_breath', mean: 1, sigma: 0.5 }, 5)

registryUnformedTumorFluidConfig(
    new UnformedTumorFluidConfigModel('kubejs:rotten_nutrients_fluid')
        .setOrganDataModel(RottenNutrientsOrganDataWeightModel)
        .setPotentialOrganDataModel(RottenNutrientsPotentialOrganDataWeightModel)
        .setOrganDataCount(1)
        .setPotentialOrganDataCount(2)
)