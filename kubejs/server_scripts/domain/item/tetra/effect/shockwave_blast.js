// priority: 500

let SHOCKWAVE_BLAST_MANA_COST = 40

/**
 * @param {Object} customData
 * @param {Internal.CreateThrownItemEventJS} event
 */
function ShockwaveBlastCreateThrownItem(customData, event) {
    let stack = event.item
    if (stack.getItem().getEffectLevel(stack, 'kubejs:shockwave_blast') <= 0) return
    event.projectile.persistentData.putDouble('kubejs:thrown_attack',
        event.player.getAttribute('minecraft:generic.attack_damage').getValue())
}

/**
 * 调用前已确认物品为模块化物品且冲击波等级大于 0。
 * @param {Internal.Player} player
 * @param {Internal.Projectile} projectile
 * @param {Internal.ItemStack} stack
 * @param {number} cx
 * @param {number} cy
 * @param {number} cz
 */
function ShockwaveBlastCast(player, projectile, stack, cx, cy, cz) {
    /** @type {Internal.ModularItem} */
    let modularItem = stack.getItem()
    if (!player.isCreative() && !(player.isInWaterOrRain() || player.level.isThundering())) {
        let md = $MagicData.getPlayerMagicData(player)
        let mana = md.getMana()
        let reduction = modularItem.getEffectLevel(stack, 'kubejs:magic_reduction')
        let cost = Math.max(0, SHOCKWAVE_BLAST_MANA_COST * (1 - reduction / 100))
        if (mana < cost) return
        md.setMana(mana - cost)
    }
    let pd = player.persistentData
    let lvl = modularItem.getEffectLevel(stack, 'kubejs:shockwave_blast')
    let eff = modularItem.getEffectEfficiency(stack, 'kubejs:shockwave_blast')
    let attack = projectile.persistentData.contains('kubejs:thrown_attack')
        ? projectile.persistentData.getDouble('kubejs:thrown_attack')
        : player.getAttribute('minecraft:generic.attack_damage').getValue()
    let damage = Math.max(1, Math.floor(attack * lvl / 100))
    if (player.level.isThundering()) { damage *= 2 }
    else if (player.isInWaterOrRain()) { damage = Math.floor(damage * 1.2) }
    pd.putDouble('shockwave_blast_damage', damage)
    if (eff > 0) pd.putInt('shockwave_blast_radius', eff)
    pd.putDouble('shockwave_blast_x', cx)
    pd.putDouble('shockwave_blast_y', cy)
    pd.putDouble('shockwave_blast_z', cz)
    let spell = SpellRegistry["getSpell(java.lang.String)"]('kubejs:shockwave_alt')
    let magicData = $MagicData.getPlayerMagicData(player)
    spell.onCast(player.level, 1, player, $CastSource.COMMAND, magicData)
    player.level.playSound(null, cx, cy, cz,
        'irons_spellbooks:spell.shockwave.cast', 'players', 1.0, 1.0)
}

/**
 * @param {Object} customData
 * @param {Internal.ProjectileImpactEvent} event
 */
function ShockwaveBlastProjectileImpact(customData, event) {
    let projectile = event.projectile
    if (!projectile || projectile.level.isClientSide()) return
    let result = event.rayTraceResult
    if (!result) return

    let owner = projectile.getOwner()
    if (!owner || !owner.isPlayer()) return
    let player = owner
    if (!player.level.equals(projectile.level)) return

    let projectileData = projectile.persistentData
    if (projectileData.getBoolean('kubejs:shockwave_blast_fired')) return

    let stack = GetTetraProjectileItem(projectile, player)
    let item = stack.getItem()
    if (!TetraJSUtils.isModularItem(item) || item.getEffectLevel(stack, 'kubejs:shockwave_blast') <= 0) return
    projectileData.putBoolean('kubejs:shockwave_blast_fired', true)

    if (result.type == $HitResultType.ENTITY) {
        let bc = result.getEntity().getBoundingBox().getCenter()
        ShockwaveBlastCast(player, projectile, stack, bc.x(), bc.y(), bc.z())
    } else if (result.type == $HitResultType.BLOCK) {
        let pos = result.getBlockPos()
        let cy = result.getDirection() == $Direction.DOWN ? pos.y : pos.y + 1
        ShockwaveBlastCast(player, projectile, stack, pos.x + 0.5, cy, pos.z + 0.5)
    }
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:shockwave_blast')
        .addStrategy('create_thrown_item', ShockwaveBlastCreateThrownItem)
        .addStrategy('projectile_impact', ShockwaveBlastProjectileImpact, -20)
)
