// priority: 500
RegistryOrgan('kubejs:starbuncle_star_gem')
    .addScore('kubejs:magic_capacity', 2)
    .setCanSpawn(true)
/**
 * 
 * @param {any} customData 
 * @param {Internal.EffectResolveEvent$Pre} event 
 * @param {Internal.ItemStack} organItem 
 * @param {number} organIndex 
 * @param {string} slotType 
 */
function StarbuncleStarGemEffectResolvePre(customData, event, organItem, organIndex, slotType) {
    const spellStats = event.spellStats
    const shooter = event.shooter
    const chestCavity = shooter.chestCavityInstance
    let magicCapacity = chestCavity.getOrganScore('kubejs:magic_capacity')
    spellStats.setAmpMultiplier(spellStats.getAmpMultiplier() + Math.max(magicCapacity, 0))
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:starbuncle_star_gem')
        .addOnlyStrategy('ars_effect_resolve_pre', StarbuncleStarGemEffectResolvePre)
)
