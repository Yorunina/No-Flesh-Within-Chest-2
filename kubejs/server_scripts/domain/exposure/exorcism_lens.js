// priority: 500
RegistryExposureAttachmentStrategy('kubejs:exorcism_lens', ExorcismLensStrategy)

/**
 * @param {any} customData 
 * @param {Internal.ModifyFrameDataEventJS} event 
 */
function ExorcismLensStrategy(customData, event) {
    const player = event.player

    const entityList = event.getEntitiesInFrame()
    entityList.forEach(pEntity => {
        pEntity.attack(player.damageSources().magic(), 5)
    })
}