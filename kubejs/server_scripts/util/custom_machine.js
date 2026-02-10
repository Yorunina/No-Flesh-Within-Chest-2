// priority: 950
/**
 * 将方块实体转换成为自定义机器定义的MachineJS对象
 * @param {Internal.BlockEntity} blockEntity 
 * @returns {CustomMachine} 
 */
function ConvertBlockEntity2MachineJS(blockEntity) {
    if (blockEntity instanceof $CustomMachineTile) {
        return $MachineJS.of(blockEntity)
    }
    return null
}

/**
 * @param {CustomMachine} machine 
 * @returns {Internal.ItemStack[]}
 */
function GetMachineMenuItems(machine) {
    let menu = machine.getItemStored('menu_input')
    if (menu.id != 'kubejs:menu') return []
    if (!menu.hasNBT() || !menu.nbt.contains('inventory')) return []
    let menuItemNbtList = menu.nbt.getList('inventory', TAG_COMPOUND)
    if (!menuItemNbtList) return []
    let outputList = []
    menuItemNbtList.forEach(itemNbt => {
        outputList.push(Item.of(itemNbt.getString('id')))
    })
    return outputList
}