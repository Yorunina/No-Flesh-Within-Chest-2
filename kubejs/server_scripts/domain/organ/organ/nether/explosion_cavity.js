// priority: 500
RegistryOrgan('kubejs:explosion_cavity')
    .addScore('chestcavity:breath_capacity', 3)
    .addScore('chestcavity:breath_recovery', 0.5)
    .setCanSpawn(true)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.NetworkEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function ExplosionCavityKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const level = event.level
    let fireTick = player.getRemainingFireTicks()
    let playerPos = player.position()
    if (fireTick <= 200) return
    let damageAmount = Math.floor(fireTick / 20)
    /**@type {Internal.LivingEntity[]} */
    let entityList = GetLivingWithinRadiusVec3d(level, playerPos, 5, (plevel, pEntity) => !pEntity.equals(player))
    let damageSource = level.damageSources().explosion(player, player)
    entityList.forEach(pEntity => pEntity.attack(damageSource, damageAmount))
    level.createExplosion(playerPos.x(), playerPos.y(), playerPos.z()).explode()
    player.setRemainingFireTicks(fireTick - 200)
    player.addItemCooldown(organItem, 20 * 3)
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:explosion_cavity')
        .addOnlyStrategy('key_active', ExplosionCavityKeyActive)
)