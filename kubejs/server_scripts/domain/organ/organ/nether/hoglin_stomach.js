// priority: 500
RegistryOrgan('kubejs:hoglin_rumen')
    .addScore('chestcavity:digestion', 1)
    .addScore('chestcavity:fire_resistant', 1)
    .setCanSpawn(true)

/**
* @param {OrganChestCavityUpdateStrategyCustomData} customData
* @param {Internal.NetworkEventJS} event
* @param {Internal.ItemStack} organItem
* @param {number} organIndex
* @param {string} slotType
*/
function HoglinStomachKeyActive(customData, event, organItem, organIndex, slotType) {
    const player = event.player
    const level = event.level
    const server = event.server
    let rad = JavaMath.toRadians(player.getYHeadRot() + 90)
    let dx = JavaMath.cos(rad)
    let dy = JavaMath.sin(rad)

    let nowMove = player.getDeltaMovement().add(dx * 16, 0.35, dy * 16)
    player.setDeltaMovement(nowMove)
    player.connection.send(new $ClientboundSetEntityMotionPacket(player))
    let timer = 0
    let armorValue = player.getArmorValue()
    server.scheduleRepeatingInTicks(2, (ctx) => {
        let entityInRadius = GetLivingWithinRadius(level, player.blockPosition(), 3, (curlevel, curEntity) => {
            if (!curEntity.isPlayer()) {
                return true
            }
        })
        entityInRadius.forEach(entity => {
            entity.attack(level.damageSources().playerAttack(player), armorValue)
            entity.invulnerableTime = 0
        })
        if (timer > 5) ctx.clear()
        timer++
    })

    player.addItemCooldown(organItem, 20 * 10)
}


RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:hoglin_rumen')
        .addOnlyStrategy('key_active', HoglinStomachKeyActive)
)
