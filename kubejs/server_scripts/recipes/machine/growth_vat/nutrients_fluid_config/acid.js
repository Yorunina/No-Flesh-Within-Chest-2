// priority: 502
const AcidOrganDataWeightModel = new WeightRandomModel()
    .addWeightRandom({ name: 'chestcavity:defense', mean: 1.5, sigma: 0.8 }, 15)
    .addWeightRandom({ name: 'chestcavity:strength', mean: 0, sigma: 1 }, 5)

const AcidPotentialOrganDataWeightModel = new WeightRandomModel()
    .addWeightRandom({ name: 'chestcavity:nerves', mean: -1, sigma: 0.5 }, 10)
    .addWeightRandom({ name: 'chestcavity:endurance', mean: 1.5, sigma: 0.4 }, 10)
    .addWeightRandom({ name: 'chestcavity:breath_recovery', mean: -1, sigma: 0.5 }, 10)
    .addWeightRandom({ name: 'chestcavity:breath_capacity', mean: -1, sigma: 0.5 }, 10)
    .addWeightRandom({ name: 'chestcavity:nutrition', mean: -1, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:digestion', mean: -1, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:metabolism', mean: -1, sigma: 0.5 }, 5)
    .addWeightRandom({ name: 'chestcavity:fire_resistant', mean: 1.5, sigma: 0.4 }, 5)
    .addWeightRandom({ name: 'chestcavity:knockback_resistant', mean: 1.5, sigma: 0.4 }, 5)

RegistryUnformedTumorFluidConfig(
    new UnformedTumorFluidConfigModel('biomancy:acid')
        .setOrganDataModel(AcidOrganDataWeightModel)
        .setPotentialOrganDataModel(AcidPotentialOrganDataWeightModel)
        .setOrganDataCount(1)
        .setPotentialOrganDataCount(3)
)