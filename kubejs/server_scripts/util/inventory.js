// priority: 3000
/**
 * 从容器中取出第一个满足条件的物品
 * @param {Internal.Inventory} inv 
 * @param {function(Internal.ItemStack):boolean} predict
 * @returns {number|{slot:number, pickItem:Internal.ItemStack}}
 */
function FindValidSlotOfInventory(inv, predict) {
    for (let slot = 0; slot < inv.getSlots(); slot++) {
        let slotItem = inv.getStackInSlot(slot)
        if (!slotItem) continue
        if (!predict(slotItem)) continue
        let testItem = inv.extractItem(slot, 1, true)
        if (testItem) return {slot : slot, pickItem : testItem}
    }
    return -1
}
