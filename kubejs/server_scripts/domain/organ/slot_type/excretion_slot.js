// priority: 500
const ExcretionSlot = 'excretion_slot'


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.ChestCavityInstance} ccInstance 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 * @param {boolean} needUpdate
 */
function SetChestCavityOrgan(customData, ccInstance, organItem, organIndex, slotType, needUpdate) {
    let inventory = ccInstance.inventory
    if (needUpdate) {
        inventory.setItem(organIndex, organItem)
    } else {
        inventory.setItemNoUpdate(organIndex, organItem)
    }

    if (slotType == ExcretionSlot) {
        if (!customData['excretionOrganList']) {
            customData['excretionOrganList'] = new Map()
        }
        customData['excretionOrganList'].set(organIndex, organItem)
    }
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.ChestCavityInstance} ccInstance 
 * @param {number} organIndex
 * @param {string} slotType
 * @param {boolean} needUpdate
 */
function RemoveChestCavityOrgan(customData, ccInstance, organIndex, slotType, needUpdate) {
    if (needUpdate) {
        let item = ccInstance.inventory.getStackInSlot(organIndex)
        ccInstance.inventory.removeItem(organIndex, item.getCount())
    } else {
        ccInstance.inventory.removeItemNoUpdate(organIndex)
    }
}


/**
 * @param {OrganEventCustomData} customData 
 * @param {Internal.ChestCavityInstance} ccInstance 
 * @returns 
 */
function ExcretionSlotEvent(customData, ccInstance) {
    if (!customData['excretionOrganList']) return
    const onlyMap = new Map()
    const invTypeData = ccInstance.getInventoryTypeData()
    let strategyFuncList = []
    const args = [{}, new $EvaluateChestCavityJS(ccInstance, ccInstance.owner, ccInstance.owner.level)]
    customData['excretionOrganList'].forEach((item, index) => {
        ccInstance.inventory.setItemNoUpdate(index, Item.of('air'))
        ccInstance.owner.block.popItem(item)

        let slotType = invTypeData.getSlotType(index)
        let itemId = String(item.id)
        let strategyModel = OrganStrategyMap[itemId]
        if (!strategyModel) return
        let organEventStrategy = strategyModel.strategyMap['organ_take_off']
        if (!organEventStrategy) return
        if (organEventStrategy['only'] && !onlyMap.has(itemId)) {
            onlyMap.set(itemId, true)
            organEventStrategy['only'].forEach(e => {
                strategyFuncList.push(new PriorityArgsModel(e, args.concat(item, index, slotType)))
            })
        }
        if (organEventStrategy['default'] && organEventStrategy['default'].length > 0) {
            organEventStrategy['default'].forEach(e => {
                strategyFuncList.push(new PriorityArgsModel(e, args.concat(item, index, slotType)))
            })
        }
    })
    if (strategyFuncList.length > 0) {
        strategyFuncList.sort((a, b) => {
            return b.getPriority() - a.getPriority()
        })
        strategyFuncList.forEach((model) => {
            model.getFunc().apply(null, model.getArgs())
        })
    }
    customData['excretionOrganList'].clear()
}