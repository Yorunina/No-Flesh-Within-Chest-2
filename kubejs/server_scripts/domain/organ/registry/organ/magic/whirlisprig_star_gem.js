// priority: 500
RegistryOrgan('kubejs:whirlisprig_star_gem')
    .addScore('chestcavity:defense', 1)
    .addScore('kubejs:magic_capacity', 1)
    .setCanSpawn(true)
/**
* @param {OrganEventCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function WhirlisprigStarGemChestCavityTakeOn(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    SetCustomDataMap(chestCavity, 'hasWhirlisprigStarGem', 1)
}

/**
* @param {OrganEventCustomData} customData
* @param {Internal.EvaluateChestCavityJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function WhirlisprigStarGemChestCavityTakeOff(customData, event, organItem, organIndex, slotType) {
    const chestCavity = event.chestCavity
    RemoveCustomDataMap(chestCavity, 'hasWhirlisprigStarGem')
}


/**
* @param {OrganEventCustomData} customData
* @param {Internal.EffectResolveEvent$Post} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function WhirlisprigStarGemArsEffectResolvePost(customData, event, organItem, organIndex, slotType) {
    const resolveEffect = event.resolveEffect
    if (resolveEffect.getRegistryName() != 'ars_nouveau:glyph_harvest') return
    /**@type {Internal.BlockHitResult} */
    const hitResult = event.rayTraceResult
    const spellStats = event.spellStats
    if (!(hitResult instanceof $BlockHitResult)) return
    const shooter = event.shooter
    const level = event.world
    let aoeBlockPosList = $SpellUtil.calcAOEBlocks(shooter, hitResult.blockPos, hitResult, spellStats)
    aoeBlockPosList.forEach(blockPos => {
        if ($BoneMealItem.applyBonemeal(Item.of('minecraft:bone_meal'), level, blockPos, shooter)) {
            level.spawnParticles('minecraft:glow', true, blockPos.x + 0.2, blockPos.y + 0.3, blockPos.z - 0.4, 0, 0.1, 0, 2, 0)
            level.spawnParticles('minecraft:glow', true, blockPos.x + 0.1, blockPos.y + 0.2, blockPos.z + 0.3, 0, 0.1, 0, 2, 0)
        }
    })
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:whirlisprig_star_gem')
        .addOnlyStrategy('organ_take_on', WhirlisprigStarGemChestCavityTakeOn)
        .addOnlyStrategy('organ_take_off', WhirlisprigStarGemChestCavityTakeOff)
        .addOnlyStrategy('ars_effect_resolve_post', WhirlisprigStarGemArsEffectResolvePost)
)