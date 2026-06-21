// priority: 500
RegistryOrgan('kubejs:maledictus_wing')
    .addScore('chestcavity:speed', 2)
    .addScore('chestcavity:strength', 1)
    .addScore('kubejs:crit_chance', 1)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function MaledictusWingKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const level = event.level
    const server = event.server
    const chestCavity = player.chestCavityInstance
    let rad = JavaMath.toRadians(player.getYHeadRot() + 90)
    let dx = JavaMath.cos(rad)
    let dy = JavaMath.sin(rad)

    let nowMove = player.getDeltaMovement().add(dx * 16, 0.35, dy * 16)
    player.setDeltaMovement(nowMove)
    player.connection.send(new $ClientboundSetEntityMotionPacket(player))
    let timer = 0
    let playerStrength = chestCavity.getOrganScore('chestcavity:strength')
    server.scheduleRepeatingInTicks(2, (ctx) => {
        level.spawnParticles($ParticleTypes.SONIC_BOOM, false, player.x, player.y, player.z, 0, 0, 0, 1, 0)
        let entityInRadius = GetLivingWithinRadius(level, player.blockPosition(), 3, (curlevel, curEntity) => {
            if (!curEntity.isPlayer()) {
                return true
            }
        })
        entityInRadius.forEach(entity => {
            entity.attack(level.damageSources().playerAttack(player), 5 * playerStrength)
            entity.invulnerableTime = 0
        })
        if (timer > 5) ctx.clear()
        timer++
    })

    player.addItemCooldown(organItem, 20 * 30)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:maledictus_wing')
        .addOnlyStrategy('key_active', MaledictusWingKeyActive)
)


