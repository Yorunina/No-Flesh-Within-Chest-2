// priority: 502
const ParasiticTumorMutationConfigModel = new TumorMutationConfigModel()
    .setCondition((machine, fluid, item, slotId, organData) => {
        return organData.getFloat('chestcavity:health') < 0 && Math.random() > 0.5
    })
    .setResult((machine, fluid, item, slotId, organData) => {
        let tumorNbt = new $CompoundTag()
        let targetOrganData = new $CompoundTag()
        let keys = RandomGetN(organData.allKeys.toArray(), 1)
        keys.forEach(key => {
            targetOrganData.putFloat(key, FloorFix(organData.getFloat(key) * 0.5, 2))
        })
        tumorNbt.put('organData', targetOrganData)
        return Item.of('kubejs:parasitic_tumor', tumorNbt)
    })
RegistryTumorMutationConfig(ParasiticTumorMutationConfigModel)