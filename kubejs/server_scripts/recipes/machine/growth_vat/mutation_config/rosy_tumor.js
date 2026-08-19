// priority: 502
const RosyTumorMutationConfigModel = new TumorMutationConfigModel()
    .setCondition((machine, fluid, item, slotId, organData) => {
        return organData.getFloat('kubejs:rosy') >= 1.0 && Math.random() > 0.25
    })
    .setResult((machine, fluid, item, slotId, organData) => {
        let tumorNbt = new $CompoundTag()
        let targetOrganData = new $CompoundTag()
        organData.tags.forEach((key, value) => {
            targetOrganData.putFloat(key, key == 'kubejs:rosy' ? value.getAsFloat() : value.getAsFloat() * 2)
        })
        tumorNbt.put('organData', targetOrganData)
        return Item.of('kubejs:rosy_tumor', tumorNbt)
    })
RegistryTumorMutationConfig(RosyTumorMutationConfigModel)