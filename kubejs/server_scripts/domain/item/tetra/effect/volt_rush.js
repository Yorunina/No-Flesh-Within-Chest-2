// priority: 500

let VoltRushState = {}

/**
 * @param {Object} customData
 * @param {Internal.SimplePlayerEventJS} event
 */
function VoltRushPlayerLoggedOut(customData, event) {
    delete VoltRushState[VoltRushUuid(event.player)]
}

let VOLT_RUSH_SPEED = 3.0
let VOLT_RUSH_UP_MULT = 0.6
let VOLT_RUSH_UP_GROUND = 0.15
let VOLT_RUSH_HOP = 1.2
let VOLT_RUSH_CHARGE_TICKS = 10
let VOLT_RUSH_DURABILITY_COST = 2
let VOLT_RUSH_MANA_COST = 25

/** 玩家唯一标识
 * @param {Internal.Player} player
 * @returns {string}
 */
function VoltRushUuid(player) {
    return String(player.getUuid())
}

/** 地面判定：读实体 NBT（包装器 onGround 字段不可靠）
 * @param {Internal.Player} player
 * @returns {boolean}
 */
function VoltRushOnGround(player) {
    return player.nbt.getBoolean('OnGround')
}

/**
 * 释放伏特突进：伤害 + 位移（覆盖原版激流冲刺）+ 音效
 * @param {Internal.ServerPlayer} player
 * @param {Internal.ItemStack} stack 蓄力的 tetra 物品
 */
function VoltRushFire(player, stack) {
    let modularItem = stack.getItem()

    if (!player.isCreative() && !(player.isInWaterOrRain() || player.level.isThundering())) {
        let md = $MagicData.getPlayerMagicData(player)
        let mana = md.getMana()
        let cost = Math.max(0, VOLT_RUSH_MANA_COST * (1 - modularItem.getEffectLevel(stack, 'kubejs:magic_reduction') / 100))
        if (mana < cost) return
        md.setMana(mana - cost)
    }

    let level = modularItem.getEffectLevel(stack, 'kubejs:volt_rush')
    let attack = player.getAttribute('minecraft:generic.attack_damage').getValue()
    let damage = Math.max(1, Math.floor(attack * level / 100))
    if (player.level.isThundering()) { damage *= 3 }
    else if (player.isInWaterOrRain()) { damage = Math.floor(damage * 1.5) }

    player.addEffect(new $MobEffectInstance('irons_spellbooks:volt_strike', 10, damage, false, false, false))

    let grounded = VoltRushOnGround(player)

    let forward = player.getLookAngle()
    let lift = Math.max(forward.y(), 0) * VOLT_RUSH_UP_MULT + (grounded ? VOLT_RUSH_UP_GROUND : 0)
    let vec = forward.scale(VOLT_RUSH_SPEED).add(new $Vec3(0, lift, 0))

    if (grounded) {
        let px = player.getX(), py = player.getY(), pz = player.getZ()
        player.teleportTo(px, py + VOLT_RUSH_HOP, pz)
    }
    let dm = player.getDeltaMovement()
    player.setDeltaMovement(new $Vec3(
        dm.x() * 0.25 + vec.x() * 0.75,
        dm.y() * 0.25 + vec.y() * 0.75,
        dm.z() * 0.25 + vec.z() * 0.75
    ))
    player.hasImpulse = true
    player.hurtMarked = true

    player.level.playSound(null, player.getX(), player.getY(), player.getZ(),
        'irons_spellbooks:cast.generic.lightning', 'players', 1.0, 0.9 + Math.random() * 0.2)

    $MagicData.getPlayerMagicData(player).getSyncedData().setSpinAttackType($SpinAttackType.LIGHTNING)

    modularItem.applyDamage(VOLT_RUSH_DURABILITY_COST, stack, player)
}

/**
 * @param {Object} customData
 * @param {Internal.TickEvent$PlayerTickEvent} event
 */
function VoltRushPlayerTick(customData, event) {
    if (event.phase != $TickPhase.END) return
    let player = event.player
    if (!player || player.level.isClientSide()) return

    let uuid = VoltRushUuid(player)
    let st = VoltRushState[uuid]
    if (!st) {
        VoltRushState[uuid] = { charging: false, nativeRemain: 0, nativeStack: null }
        return
    }

    let using = player.isUsingItem()
    let useStack = null
    let remaining = 0
    if (using) {
        useStack = player.getUseItem()
        remaining = player.getUseItemRemainingTicks()
    }

    if (using && useStack && !useStack.isEmpty()) {
        /**@type {Internal.ModularItem} */
        let heldItem = useStack.getItem()
        if (TetraJSUtils.isModularItem(heldItem)
            && heldItem.getEffectLevel(useStack, 'kubejs:volt_rush') > 0) {
            st.charging = true
            st.nativeRemain = remaining
            st.nativeStack = useStack
        } else {
            st.charging = false
            st.nativeRemain = 0
            st.nativeStack = null
        }
    } else if (st.charging) {
        st.charging = false
        let ticksUsed = 72000 - st.nativeRemain
        let stack = st.nativeStack
        st.nativeStack = null
        if (!stack || stack.isEmpty()) return

        if (ticksUsed >= VOLT_RUSH_CHARGE_TICKS) {
            VoltRushFire(player, stack)
        }
    }
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:volt_rush')
        .addStrategy('player_logged_out', VoltRushPlayerLoggedOut, -20)
        .addStrategy('player_tick', VoltRushPlayerTick)
)
