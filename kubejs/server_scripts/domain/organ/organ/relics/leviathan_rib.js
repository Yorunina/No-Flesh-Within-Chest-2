// priority: 500
RegistryOrgan('kubejs:leviathan_rib')
    .addScore('chestcavity:defense', 2.5)
    .addScore('chestcavity:swim_speed', 1)
    .addScore('chestcavity:endurance', -0.5)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingHurtEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function LeviathanRibEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const source = event.source.actual
    if (!source) return
    const level = entity.level
    let targetPosition = source.position()
    const chestCavity = entity.getChestCavityInstance()
    targetPosition = targetPosition.add(new Vec3d(ISSUtils.getRandomScaled(1), ISSUtils.getRandomScaled(1), ISSUtils.getRandomScaled(1)))
    targetPosition = ISSUtils.moveToRelativeGroundLevel(level, targetPosition, 8)
    let tentacle = new $VoidTentacle(level, entity, Math.max(chestCavity.getOrganScore('chestcavity:defense'), 2))
    tentacle.moveTo(targetPosition)
    tentacle.setYBodyRot(Math.floor(Math.random() * 360))
    level.addFreshEntity(tentacle)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:leviathan_rib')
        .addOnlyStrategy('entity_be_hurt', LeviathanRibEntityBeHurt)
)