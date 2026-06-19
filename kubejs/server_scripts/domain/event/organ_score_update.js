// priority: 999
const OrganScoreAttributeMap = new Map()
ChestCavityEvents.updateOrganScore(event => {
    const chestCavity = event.chestCavity
    if (!chestCavity) return
    OrganScoreAttributeMap.forEach((func, organScoreName) => {
        if (isScoreChanged(chestCavity, organScoreName)) {
            func(event)
        }
    })
})

function RegistryOrganScoreAttribute(organScoreName, func) {
    OrganScoreAttributeMap.set(organScoreName, func)
}

/**
 * 
 * @param {Internal.ChestCavityInstance} chestCavity 
 * @param {String} organScoreName 
 * @returns 
 */
function isScoreChanged(chestCavity, organScoreName) {
    return chestCavity.getOldOrganScore(organScoreName) != chestCavity.getOrganScore(organScoreName)
}