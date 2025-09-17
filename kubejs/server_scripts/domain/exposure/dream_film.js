// priority: 500
RegistryExposureAttachmentStrategy('exposure:dream_film', DreamFilmStrategy)

/**
 * @param {any} customData 
 * @param {Internal.ModifyFrameDataEventJS} event 
 */
function DreamFilmStrategy(customData, event) {
    const cameraStack = event.cameraStack
    let cameraNbt = cameraStack.getNbt()
    if (!cameraNbt.contains('Film')) return
    let filmItemNbt = cameraNbt.getCompound('Film')
    if (!filmItemNbt.contains('tag')) {
        filmItemNbt.put('tag', new $CompoundTag())
    }
    let nbt = filmItemNbt.getCompound('tag')
    if (!nbt.contains('Frames')) {
        nbt.put('Frames', new $ListTag())
    }
    let frameList = nbt.getList('Frames', GET_COMPOUND_TYPE)
    frameList.add(new $CompoundTag())
}
