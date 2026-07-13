// priority: 500
RegistryOrgan('kubejs:rough_infernal_dragon_skin')
    .addScore('chestcavity:strength', -1)
    .addScore('chestcavity:fire_resistant', 3)

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function InfernalDragonSkinUpdateChestCavityUpdate(customData, event, organItem, organIndex, slotType) {
    const entity = event.entity
    if (!entity.isPlayer()) return
    const chestCavity = event.chestCavity
    AddSpellSelection(customData, chestCavity, 'kubejs:advance_flaming_strike', 1)
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.EvaluateChestCavityJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function InfernalDragonSkinTakeOff(customData, event, organItem, organIndex, slotType) {
    const { entity, chestCavity } = event
    if (!entity.isPlayer()) return
    RemoveSpellSelectionBySpellId(customData, chestCavity, 'kubejs:advance_flaming_strike')
}

/**
 * @param {OrganEventCustomData} customData
 * @param {Internal.RollEventJS} event 
 * @param {Internal.ItemStack} organItem
 * @param {number} organIndex
 * @param {string} slotType
 */
function InfernalDragonSkinPlayerRoll(customData, event, organItem, organIndex, slotType) {
    if (slotType != AwakeRelicSlot) return
    /**@type {Internal.ServerPlayer} */
    const player = event.player
    const server = event.server
    const level = event.level
    const playerMagicData = player.magicData
    player.hasImpulse = true
    let vec = Vec3dNormalize(Vec3dMultiply(player.getLookAngle(), 3, 1, 3)).scale(6).add(new Vec3d(0, 0.25, 0))
    if (player.onGround()) {
        player.setPos(player.position().add(new Vec3d(0, 1.5, 0)))
        vec = vec.add(new Vec3d(0, 0.25, 0))
    }

    const dm = player.getDeltaMovement()
    player.setDeltaMovement(new Vec3d(Lerp(0.75, dm.x(), vec.x()), Lerp(0.75, dm.y(), vec.y()), Lerp(0.75, dm.z(), vec.z())))
    player.addEffect(new $MobEffectInstance('irons_spellbooks:burning_dash', 15, 0, false, false, false))
    playerMagicData.getSyncedData().setSpinAttackType($SpinAttackType.FIRE)
    player.connection.send(new $ClientboundSetEntityMotionPacket(player))
    let timer = 0
    let attackDamageAttr = player.getAttribute('minecraft:generic.attack_damage')
    let attackDamage = attackDamageAttr.getValue()
    server.scheduleRepeatingInTicks(2, (ctx) => {
        let entityInRadius = GetLivingWithinRadius(level, player.blockPosition(), 3, (curlevel, curEntity) => {
            if (!curEntity.isPlayer()) {
                return true
            }
        })
        entityInRadius.forEach(entity => {
            entity.attack(level.damageSources().playerAttack(player), attackDamage)
            entity.invulnerableTime = 0
        })
        if (timer > 5) ctx.clear()
        timer++
    })
    RollCap.fromPlayer(player).get().startCooldown()
}

RegistryOrganStrategy(
    new OrganStrategyModel('kubejs:rough_infernal_dragon_skin')
        .addOnlyStrategy('chest_cavity_update', InfernalDragonSkinUpdateChestCavityUpdate)
        .addOnlyStrategy('organ_take_off', InfernalDragonSkinTakeOff)
        .addOnlyStrategy('player_roll', InfernalDragonSkinPlayerRoll)
)
