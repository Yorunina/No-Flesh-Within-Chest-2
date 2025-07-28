// priority: 3000

/**
 * 
 * @param {Internal.ItemStack} cameraStack 
 * @param {'Film' | 'Flash' | 'Lens' | 'Filter'} type 
 * @returns {Internal.ItemStack}
 */
function ExposureGetAttachment(cameraStack, type) {
    if (!cameraStack.hasNBT()) return null
    let nbt = cameraStack.getNbt()
    if (!nbt.contains(type)) return null
    let attachment = nbt.getCompound(type)
    return $ItemStack.of(attachment)
}

/**
 * 
 * @param {Internal.ItemStack} cameraStack 
 * @returns {String[]}
 */
function ExposureGetAttachmentIds(cameraStack) {
    if (!cameraStack.hasNBT()) return null
    let nbt = cameraStack.getNbt()
    let attachmentList = []
    if (nbt.contains('Film')) {
        attachmentList.push(nbt.getCompound('Film').getString('id'))
    }
    if (nbt.contains('Flash')) {
        attachmentList.push(nbt.getCompound('Flash').getString('id'))
    }
    if (nbt.contains('Lens')) {
        attachmentList.push(nbt.getCompound('Lens').getString('id'))
    }
    if (nbt.contains('Filter')) {
        attachmentList.push(nbt.getCompound('Filter').getString('id'))
    }
    return attachmentList
}

/**
 * 
 * @param {Internal.ItemStack} cameraStack 
 * @param {'Film' | 'Flash' | 'Lens' | 'Filter'} type 
 * @param {Internal.ItemStack} itemStack 
 * @returns 
 */
function ExposureSetAttachment(cameraStack, type, itemStack) {
    if (!cameraStack.hasNBT()) return null
    let nbt = cameraStack.getNbt()
    nbt.put(type, itemStack.toNBT())
    cameraStack.setNbt(nbt)
}
