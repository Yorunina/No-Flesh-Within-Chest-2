// priority: 502
const PrimalBoneCageMutationConfigModel = new TumorMutationConfigModel()
    .setCondition((machine, fluid, item, slotId, organData) => {
        return fluid.id == 'kubejs:primal_nutrients_fluid' && organData.getFloat('chestcavity:defense') >= 3 && organData.getFloat('kubejs:primitivization') >= 3
    })
    .setResult((machine, fluid, item, slotId, organData) => Item.of('kubejs:primal_bone_cage'))
RegistryTumorMutationConfig(PrimalBoneCageMutationConfigModel)