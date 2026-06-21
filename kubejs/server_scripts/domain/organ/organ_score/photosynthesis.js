// priority: 500
/**
 * 
 * @param {Internal.OpenedEntityTickJS} event 
 */
function PhotosynthesisEntityTick(event) {
    const entity = event.entity
    const level = event.level
    const chestCavity = event.chestCavity
    const photosynthesis = chestCavity.getOrganScore('kubejs:photosynthesis')
    if (photosynthesis <= 0) return
    if (!IsSunBurn(level, entity)) return
    const customDataMap = chestCavity.customDataMap

    let photosynthesisTimer = customDataMap.getOrDefault('photosynthesisTimer', 0)
    photosynthesisTimer++
    if (photosynthesisTimer < 10) return customDataMap.put('photosynthesisTimer', photosynthesisTimer)
    customDataMap.put('photosynthesisTimer', 0)

    if (entity instanceof $ServerPlayer) {
        RecoverPlayerHungerAndSaturation(entity, photosynthesis * 0.5)
    } else {
        entity.heal(photosynthesis)
    }
}

RegistryOrganScoreAttribute('kubejs:photosynthesis', PhotosynthesisEntityTick)
