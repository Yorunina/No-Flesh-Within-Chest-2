// priority: 500
RegistryExposureAttachmentStrategy('kubejs:frost_lens', FrostLensStrategy)

/**
 * @param {any} customData 
 * @param {Internal.ModifyFrameDataEventJS} event 
 */
function FrostLensStrategy(customData, event) {
    const entityList = event.getEntitiesInFrame()
    let frozenTicks = 20 * 20 / entityList.size()
    entityList.forEach(pEntity => {
        pEntity.setTicksFrozen(pEntity.getTicksFrozen() + frozenTicks)
    })
}