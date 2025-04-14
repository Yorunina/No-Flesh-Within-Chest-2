// priority: 500
/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.ChestCavityInstance} ccInstance 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex\
 * @param {string} slotType
 */
function SetOrganWithoutUpdate(customData, ccInstance, organItem, organIndex, slotType) {
    ccInstance.inventory.setItemNoUpdate(organIndex, organItem)
    if (slotType == 'excretion_slot') {
        if (!customData['excretionOrganList']) {
            customData['excretionOrganList'] = new Map()
        }
        customData['excretionOrganList'].set(organIndex, organItem)
    }
}


/**
 * @param {OrganEventCustomData} customData 
 * @param {Internal.ChestCavityInstance} ccInstance 
 * @returns 
 */
function ExcretionSlot(customData, ccInstance) {
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
                strategyFuncList.push({
                    'strategyModel': e,
                    'arg': args.concat(item, index, slotType)
                })
            })
        }
        if (organEventStrategy['default'] && organEventStrategy['default'].length > 0) {
            organEventStrategy['default'].forEach(e => {
                strategyFuncList.push({
                    'strategyModel': e,
                    'arg': args.concat(item, index, slotType)
                })
            })
        }
    })
    if (strategyFuncList.length > 0) {
        strategyFuncList.sort((a, b) => {
            return b['strategyModel']['priority'] - a['strategyModel']['priority']
        })
        strategyFuncList.forEach((model) => {
            model['strategyModel']['func'].apply(null, model['arg'])
        })
    }
    customData['excretionOrganList'].clear()
}