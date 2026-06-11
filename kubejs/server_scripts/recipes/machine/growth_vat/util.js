// priority: 501
/**
 * 未成型肿瘤生长逻辑
 * @param {CustomMachine} machine 
 * @param {Internal.ItemStack} item 
 * @param {String} slotId 
 */
function UnformedTumorGrowth(machine, item, slotId) {
    if (!item.is('kubejs:unformed_tumor')) return
    let unformedTumorNbt = item.getOrCreateTag()
    let tumorNbt = new $CompoundTag()
    let organData = new $CompoundTag()
    if (unformedTumorNbt.contains('organData')) {
        organData = organData.merge(unformedTumorNbt.getCompound('organData'))
    }
    if (unformedTumorNbt.contains('potentialOrganData')) {
        organData = organData.merge(unformedTumorNbt.getCompound('potentialOrganData'))
    }
    tumorNbt.put('organData', organData)
    machine.setItemStored(slotId, Item.of('kubejs:tumor', tumorNbt))
}

/**
 * 
 * @param {CustomMachine} machine 
 * @param {Internal.FluidStackJS} fluid 
 * @param {String} slotId 
 */
function SpawnUnformedTumor(machine, fluid, slotId) {
    if (Math.random() > 0.5) return
    let fluidId = String(fluid.id)
    if (!UnformedTumorFluidConfigMap.has(fluidId)) return
    let organDataConfig = UnformedTumorFluidConfigMap.get(fluidId)
    let organData = organDataConfig.genOrganData()
    let potentialOrganData = organDataConfig.genPotentialOrganData()

    let nbt = new $CompoundTag()
    nbt.put('potentialOrganData', potentialOrganData)
    nbt.put('organData', organData)

    machine.setItemStored(slotId, Item.of('kubejs:unformed_tumor', nbt))
}



/**
 * 未成型肿瘤变异生长逻辑
 * @param {CustomMachine} machine 
 * @param {Internal.FluidStackJS} fluid
 * @param {Internal.ItemStack} item 
 * @param {String} slotId 
 */
function UnformedTumorMutationGrowth(machine, fluid, item, slotId) {
    if (!item.is('kubejs:unformed_tumor')) return
    let unformedTumorNbt = item.getOrCreateTag()
    let tumorNbt = new $CompoundTag()
    let organData = new $CompoundTag()
    if (unformedTumorNbt.contains('organData')) {
        organData = organData.merge(unformedTumorNbt.getCompound('organData'))
    }
    if (unformedTumorNbt.contains('potentialOrganData')) {
        organData = organData.merge(unformedTumorNbt.getCompound('potentialOrganData'))
    }

    tumorNbt.put('organData', organData)
    let outputItem = Item.of('kubejs:tumor', tumorNbt)
    for (let config of TumorMutationConfigList) {
        if (config.isMatch(machine, fluid, item, slotId, organData)) {
            outputItem = config.apply(machine, fluid, item, slotId, organData)
            break
        }
    }
    machine.setItemStored(slotId, outputItem)
}

/**
 * 已成型肿瘤增殖
 * @param {CustomMachine} machine 
 * @param {Internal.FluidStackJS} fluid
 * @param {Internal.ItemStack} item 
 * @param {String} slotId 
 * @returns {Internal.ItemStack[]}
 */
function ProliferateTumor(machine, fluid, item, slotId) {
    if (!item.hasTag('kubejs:tumor')) return
    let random = Math.random()
    if (!item.hasNBT()) return
    if (random > 0.75) {
        let nbt = item.getNbt()
        let organData = nbt.getCompound('organData')
        let potentialOrganData = nbt.getCompound('potentialOrganData')
        if (Math.random() > (organData.size() / (organData.size() + potentialOrganData.size()))) {
            let randomKey = RandomGet(potentialOrganData.allKeys.toArray())
            let randomValue = FloorFix(potentialOrganData.getFloat(randomKey) * 0.9, 2)
            potentialOrganData.putFloat(randomKey, randomValue)
        } else {
            let randomKey = RandomGet(organData.allKeys.toArray())
            let randomValue = FloorFix(organData.getFloat(randomKey) * 0.9, 2)
            organData.putFloat(randomKey, randomValue)
        }
    } else if (random < 0.5) {
        return []
    }
    let targetItem = item.copy()
    return [targetItem]
}

/**
 * 混合培养基
 * @param {CustomMachine} machine 
 * @param {Internal.FluidStackJS} fluid 
 * @param {{item: Internal.ItemStack, slotId: String}[]} unformedTumorList 
 * @returns 
 */
function MixUnformedTumorAttri(machine, fluid, unformedTumorList) {
    if (unformedTumorList.length == 0) return
    /**@type {{score: String, value: Float}[]} */
    let allOrganAttri = []
    unformedTumorList.forEach(unformedTumor => {
        let pNbt = unformedTumor.item.getOrCreateTag()
        pNbt.getCompound('organData').tags.forEach((key, value) => {
            allOrganAttri.push({ score: key, value: value.getAsFloat() })
        })
        pNbt.getCompound('potentialOrganData').tags.forEach((key, value) => {
            allOrganAttri.push({ score: key, value: value.getAsFloat() })
        })
    })
    allOrganAttri = Shuffle(allOrganAttri)
    unformedTumorList.forEach(unformedTumor => {
        let pNbt = unformedTumor.item.getOrCreateTag()
        if (pNbt.contains('organData')) {
            let organData = pNbt.getCompound('organData')
            let organDataSize = organData.size()
            let newOrganData = new $CompoundTag()
            allOrganAttri.slice(0, organDataSize).forEach(attri => {
                newOrganData.putFloat(attri.score, attri.value)
            })
            allOrganAttri = allOrganAttri.slice(organDataSize)
            pNbt.put('organData', newOrganData)
        }
        if (pNbt.contains('potentialOrganData')) {
            let potentialOrganData = pNbt.getCompound('potentialOrganData')
            let potentialOrganDataSize = potentialOrganData.size()
            let newPotentialOrganData = new $CompoundTag()
            allOrganAttri.slice(0, potentialOrganDataSize).forEach(attri => {
                newPotentialOrganData.putFloat(attri.score, attri.value)
            })
            allOrganAttri = allOrganAttri.slice(potentialOrganDataSize)
            pNbt.put('potentialOrganData', newPotentialOrganData)
        }
        machine.setItemStored(unformedTumor.slotId, Item.of('kubejs:unformed_tumor', pNbt))
    })
}
