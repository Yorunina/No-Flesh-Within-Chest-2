// priority: 500

let MAGIC_SHOT_LEVEL = 'kubejs_magic_shot_level'

/** 1 tick 后执行转化：此刻 tetra 已 shoot 原箭并完成全部 baseDamage 调整
 *  （材料/力量/速度归一），箭已在世界中且速度就绪
 * @param {Internal.AbstractArrow} arrow
 */
function MagicShotConvert(arrow) {
    if (arrow.nbt.getBoolean('inGround')) return
    if (arrow.isRemoved()) return
    let effectLvl = arrow.persistentData.getInt(MAGIC_SHOT_LEVEL)
    let base = Number(arrow.getBaseDamage())
    let speed = Number(arrow.getDeltaMovement().length())
    let damage = Math.max(1, base * effectLvl / 10 * speed)
    let level = arrow.level
    let owner = arrow.getOwner()
    let magic = new $ISSMagicArrow(level, owner)
    magic.setDamage(damage)
    magic.setPos(arrow.getX(), arrow.getY(), arrow.getZ())
    magic.setDeltaMovement(arrow.getDeltaMovement())
    level.addFreshEntity(magic)
    arrow.discard()
}

/**
 * @param {Object} customData
 * @param {Internal.CreateArrowEventJS} event
 */
function MagicShotCreateArrow(customData, event) {
    let player = event.player
    if (!player || player.level.isClientSide()) return
    let heldItem = event.item
    /**@type {Internal.ModularItem} */
    let modularItem = heldItem.getItem()
    if (!TetraJSUtils.isModularItem(modularItem)) return
    let effectLevel = modularItem.getEffectLevel(heldItem, 'kubejs:magic_shot')
    if (effectLevel <= 0) return
    if (!player.isCrouching() && modularItem.getEffectEfficiency(heldItem, 'kubejs:magic_shot') < 1) return

    let arrow = event.getProjectile()
    arrow.persistentData.putInt(MAGIC_SHOT_LEVEL, effectLevel)
    player.server.scheduleInTicks(1, () => MagicShotConvert(arrow))
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:magic_shot')
        .addStrategy('create_arrow', MagicShotCreateArrow, -20)
)
