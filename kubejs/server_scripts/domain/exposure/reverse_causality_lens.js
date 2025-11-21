// priority: 500
RegistryExposureAttachmentStrategy('kubejs:reverse_causality_lens', ReverseCausalityLensStrategy)

/**
 * @param {any} customData 
 * @param {Internal.ModifyFrameDataEventJS} event 
 */
function ReverseCausalityLensStrategy(customData, event) {
    const level = event.level
    const entityList = event.getEntitiesInFrame()
    entityList.forEach(pEntity => {
        level.createExplosion(pEntity.x, pEntity.y, pEntity.z).explode()
    })
}