// priority: 500
/**
 * 
 * @param {Internal.UpdateOrganScoreJS} event 
 */
function GlowingUpdateOrganScore(event) {
    const entity = event.entity
    if (event.chestCavity.getOrganScore('kubejs:glowing') > 0) {
        entity.setGlowing(true)
    } else {
        entity.setGlowing(false)
    }
}

RegistryOrganScoreAttribute('kubejs:glowing', GlowingUpdateOrganScore)


