// priority: 500
RegistryOrgan('kubejs:ender_golem_line')
    .addScore('kubejs:extreme_fitness', 1)
    .addScore('chestcavity:nerves', 0.5)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function EnderGolemLineKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const level = event.level
    let playerPos = player.blockPosition()
    let entityList = GetLivingWithinRadius(level, playerPos, 10, (level, entity) => {
        return !entity.equals(player)
    })
    entityList.forEach(entity => {
        let entityPos = entity.position()
        let diff = playerPos.subtract(entityPos)
        diff = diff.normalize().scale(1)
        entity.setDeltaMovement(diff)
        for (let i = 0; i < 3; i++) {
            level.spawnParticles($ParticleTypes.PORTAL, true, entityPos.x() + Math.random(), entityPos.y() + Math.random(), entityPos.z() + Math.random(), 0.2, 0.3, 0.2, 5, 0)
        }
    })
    player.addItemCooldown(organItem, 20 * 3)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:ender_golem_line')
        .addOnlyStrategy('key_active', EnderGolemLineKeyActive)
)
