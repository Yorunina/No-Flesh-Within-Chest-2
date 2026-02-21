// priority: 502
const RoseNutrientsOrganDataWeightModel = new WeightRandomModel()
    .addWeightRandom({ name: 'chestcavity:breath_recovery', mean: 1, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:breath_capacity', mean: 1, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:detoxification', mean: 1, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:filtration', mean: 1, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:nutrition', mean: 1, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:digestion', mean: 1, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:metabolism', mean: 1, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'kubejs:zine_refine_efficiency', mean: 2, sigma: 1 }, 50)

const RoseNutrientsPotentialOrganDataWeightModel = new WeightRandomModel()
    .addWeightRandom({ name: 'kubejs:extreme_fitness', mean: 1, sigma: 0.5 }, 30)
    .addWeightRandom({ name: 'kubejs:extreme_strength', mean: 1, sigma: 0.5 }, 30)
    .addWeightRandom({ name: 'kubejs:proliferation_efficiency', mean: 2, sigma: 1 }, 30)
    .addWeightRandom({ name: 'kubejs:genetic_stability', mean: 2, sigma: 1 }, 15)

registryUnformedTumorFluidConfig(
    new UnformedTumorFluidConfigModel('kubejs:rose_nutrients_fluid')
        .setOrganDataModel(RoseNutrientsOrganDataWeightModel)
        .setPotentialOrganDataModel(RoseNutrientsPotentialOrganDataWeightModel)
)