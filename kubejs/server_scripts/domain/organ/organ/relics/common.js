// priority: 501
/**
 * 永恒遗物镌刻方法，优先级需要高些
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function RelicsOrganScoreChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    const nbt = organItem.getOrCreateTag()
    if (!nbt.contains('relicsOrganScore')) return
    const organScores = chestCavity.organScores
    const relicsOrganScore = nbt.getCompound('relicsOrganScore')
    Object.keys(relicsOrganScore).forEach(key => {
        organScores.put(key, relicsOrganScore.getFloat(key))
    })
}