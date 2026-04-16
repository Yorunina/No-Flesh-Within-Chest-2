// priority: 500
RegistryOrgan('kubejs:endermaptera_shell')
    .addScore('chestcavity:defense', 1)
    .setCanSpawn(true)


/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.LivingDamageEvent} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function EndermapteraShellEntityBeHurt(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    const level = entity.level
    if (Math.random() > 0.1) return
    let entityPos = entity.position()
    level.playSound(null, entityPos.x(), entityPos.y(), entityPos.z(), 'entity.enderman.teleport', entity.getSoundSource(), 1, 1)
    level.spawnParticles($ParticleTypes.PORTAL, true, entityPos.x() + Math.random(), entityPos.y() + Math.random(), entityPos.z() + Math.random(), 0.2, 0.3, 0.2, 10, 0)
    event.amount = 0
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:endermaptera_shell')
        .addOnlyStrategy('entity_be_hurt', EndermapteraShellEntityBeHurt)
)
