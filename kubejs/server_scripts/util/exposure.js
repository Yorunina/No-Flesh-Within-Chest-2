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
    /**@type {Internal.CameraItem} */
    let camera = cameraStack.getItem()
    let attachmentList = []
    camera.getAttachmentTypes(cameraStack).forEach(attachmentType => {
        let attachmentOpt = camera.getAttachment(cameraStack, attachmentType)
        if (attachmentOpt.present) {
            let attachmentItem = attachmentOpt.get()
            if (attachmentItem && !attachmentItem.isEmpty()) {
                attachmentList.push(attachmentItem.getId().toString())
            }
        }
    })
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
