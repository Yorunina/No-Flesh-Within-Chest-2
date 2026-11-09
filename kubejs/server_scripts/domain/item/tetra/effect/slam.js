// priority: 0

/**
 * @param {Internal.Level} level
 * @param {number} px
 * @param {number} py
 * @param {number} pz
 * @param {number} radius
 */
function SlamGroundParticlesAt(level, px, py, pz, radius) {
    if (level.isClientSide()) return
    let bpoClass = $BlockParticleOption
    let typesClass = $ParticleTypes
    let mth = $Mth
    let sl = level
    let sampleY = mth.floor(py) - 1
    let colCache = new Map()
    let colOption = (bx, bz) => {
        let key = bx + ',' + bz
        let opt = colCache.get(key)
        if (!opt) {
            let st = sl.getBlockState(new $BlockPos(bx, sampleY, bz))
            opt = new bpoClass(typesClass.BLOCK, st)
            colCache.set(key, opt)
        }
        return opt
    }
    let pi = 3.141592653589793
    let count = mth.floor(pi * radius * radius)
    let rand = new $JavaRandom()
    for (let pass = 0; pass < 8; pass++) {
        for (let i = 0; i < count; i++) {
            let angle = rand.nextFloat() * 2 * pi
            let dist = mth.sqrt(rand.nextFloat()) * radius
            let sx = px + mth.cos(angle) * dist
            let sz = pz + mth.sin(angle) * dist
            sl.sendParticles(colOption(mth.floor(sx), mth.floor(sz)),
                sx, py, sz, 1, 0, 0, 0, 0)
        }
    }
}

/**
 * @param {Internal.LivingEntity} target
 * @param {number} radius
 */
function SlamGroundParticles(target, radius) {
    SlamGroundParticlesAt(target.level, target.getX(), target.getY() + 0.25, target.getZ(), radius)
}

/** 只识别这次伤害的砸地溅射身份，供防递归和震荡联动共用。
 * @param {Internal.DamageSource} source
 * @returns {boolean}
 */
function SlamIsSplash(source) {
    let data = TetraAttackData(source)
    return data != null && data.getString('kind') == 'slam_splash'
}

/**
 * @param {Object} customData
 * @param {Internal.LivingHurtEvent} event
 */
function SlamEntityDoDamage(customData, event) {
    if (event.entity.level.isClientSide()) return

    let target = customData.entity
    if (SlamIsSplash(event.source)) return

    /**@type {Internal.LivingEntity} */
    let sourceEntity = TetraHurtSourceEntity(customData)
    if (!sourceEntity || !sourceEntity.isLiving()) return
    if (!TetraAttackIsMelee(event, sourceEntity)) return
    if (!TetraAttackFullCharge(event, sourceEntity)) return

    let effectLevel = TetraHurtSourceLevel(customData, 'kubejs:slam')
    let effectEfficiency = TetraHurtSourceEfficiency(customData, 'kubejs:slam')
    if (effectLevel <= 0 || effectEfficiency <= 0) return

    let splashAmount = event.amount * effectLevel / 100
    if (splashAmount <= 0) return

    let level = target.level
    let center = target.position()

    SlamGroundParticles(target, effectEfficiency)

    level.playSound(null, target.getX(), target.getY(), target.getZ(),
        'minecraft:entity.zombie.attack_iron_door', target.getSoundSource(), 1, 1)

    let victims = GetLivingWithinRadiusVec3d(level, center, effectEfficiency,
        (lvl, e) => e != target && e != sourceEntity)
    if (victims.length == 0) return

    let sourceId = sourceEntity.isPlayer() ? 'kubejs:player_attack' : 'kubejs:mob_attack'
    let splashSource = TetraAttackSource(level, sourceId, sourceEntity, 'slam_splash')

    level.server.scheduleInTicks(1, () => {
        let kbBonus = $EnchantmentHelper.getKnockbackBonus(sourceEntity)
        for (let i = 0; i < victims.length; i++) {
            let victim = victims[i]
            if (!victim.isAlive()) continue
            victim.attack(splashSource, splashAmount)
            if (kbBonus > 0) {
                victim.knockback(kbBonus * 0.5,
                    sourceEntity.x - victim.x, sourceEntity.z - victim.z)
            }
        }
    })
}

/**
 * @param {Object} customData
 * @param {Internal.BlockLeftClickedEventJS} event
 */
function SlamBlockLeftClicked(customData, event) {
    let player = event.player
    if (!player || player.level.isClientSide()) return
    let stack = player.getMainHandItem()
    if (stack.isEmpty() || !TetraJSUtils.isModularItem(stack.getItem())) return
    let slamLv = stack.getItem().getEffectLevel(stack, 'kubejs:slam')
    let slamEff = stack.getItem().getEffectEfficiency(stack, 'kubejs:slam')
    if (slamLv <= 0 || slamEff <= 0) return
    if (stack.getItem().getEffectLevel(stack, 'kubejs:trueslam') < 1) return
    if (!IsFullChargeAttck(player)) return

    let block = event.block
    let level = player.level
    let cx = block.x + 0.5, cy = block.y + 1.25, cz = block.z + 0.5
    let base = player.getAttribute('minecraft:generic.attack_damage').getValue()
    let splash = base * slamLv / 100
    if (splash <= 0) return

    SlamGroundParticlesAt(level, cx, cy, cz, slamEff)
    level.playSound(null, cx, cy, cz,
        'minecraft:entity.zombie.attack_iron_door', player.getSoundSource(), 1, 1)

    stack.getItem().applyDamage(1, stack, player)

    let center = new $Vec3(cx, cy, cz)
    let victims = GetLivingWithinRadiusVec3d(level, center, slamEff,
        (lvl, e) => e != player)
    if (victims.length == 0) return

    let splashSource = TetraAttackSource(level, 'kubejs:player_attack', player, 'slam_splash')
    level.server.scheduleInTicks(1, () => {
        let kbBonus = $EnchantmentHelper.getKnockbackBonus(player)
        for (let i = 0; i < victims.length; i++) {
            let victim = victims[i]
            if (!victim.isAlive()) continue
            victim.attack(splashSource, splash)
            if (kbBonus > 0) {
                victim.knockback(kbBonus * 0.5,
                    player.x - victim.x, player.z - victim.z)
            }
        }
    })
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:slam')
        .addStrategy('entity_do_damage', SlamEntityDoDamage, -130)
        .addStrategy('block_left_clicked', SlamBlockLeftClicked)
)
