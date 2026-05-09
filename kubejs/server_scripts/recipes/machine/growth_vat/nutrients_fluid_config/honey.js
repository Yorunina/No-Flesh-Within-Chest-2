// priority: 502
const HoneyOrganDataWeightModel = new WeightRandomModel()
    .addWeightRandom({ name: 'chestcavity:health', mean: 1, sigma: 1 }, 30)
    .addWeightRandom({ name: 'chestcavity:nutrition', mean: 1, sigma: 1 }, 15)
    .addWeightRandom({ name: 'chestcavity:digestion', mean: 1, sigma: 1 }, 15)
    .addWeightRandom({ name: 'chestcavity:metabolism', mean: 1, sigma: 1 }, 15)
    .addWeightRandom({ name: 'chestcavity:nerves', mean: -1, sigma: 0.5 }, 10)
    .addWeightRandom({ name: 'chestcavity:strength', mean: -1, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:knockback_resistant', mean: -2, sigma: 1 }, 5)
    .addWeightRandom({ name: 'chestcavity:fire_resistant', mean: -2, sigma: 1 }, 5)
    .addWeightRandom({ name: 'chestcavity:detoxification', mean: -1, sigma: 1 }, 5)

const HoneyPotentialOrganDataWeightModel = new WeightRandomModel()
    .addWeightRandom({ name: 'kubejs:extreme_fitness', mean: 1, sigma: 0.5 }, 15)
    .addWeightRandom({ name: 'kubejs:extreme_strength', mean: -1, sigma: 0.5 }, 10)
    .addWeightRandom({ name: 'chestcavity:filtration', mean: -1, sigma: 1 }, 5)

RegistryUnformedTumorFluidConfig(
    new UnformedTumorFluidConfigModel('create:honey')
        .setOrganDataModel(HoneyOrganDataWeightModel)
        .setPotentialOrganDataModel(HoneyPotentialOrganDataWeightModel)
        .setOrganDataCount(2)
        .setPotentialOrganDataCount(1)
)