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
    customData['excretionOrganList'].forEach((value, key) => {
        ccInstance.inventory.setItemNoUpdate(key, Item.of('air'))
        ccInstance.owner.block.popItem(value)
    })
    customData['excretionOrganList'].clear()
}