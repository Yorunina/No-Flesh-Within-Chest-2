// priority: 500

const EnderCurtainNextTime = 'kubejs_ender_curtain_next_time'

/**
 * @param {Internal.ItemStack} stack
 * @returns {boolean}
 */
function EnderCurtainEnabled(stack) {
    let item = stack.getItem()
    return TetraJSUtils.isModularItem(item)
        && item.getEffectLevel(stack, 'kubejs:ender_curtain') > 0
        && item.getEffectEfficiency(stack, 'kubejs:ender_curtain') > 0
}

/**
 * 次数耗尽不提前刷新。
 * @param {Internal.Player} player
 * @param {Internal.ItemStack} stack
 */
function EnderCurtainApply(player, stack) {
    let item = stack.getItem()
    let level = item.getEffectLevel(stack, 'kubejs:ender_curtain')
    let duration = Math.max(20, Math.round(item.getEffectEfficiency(stack, 'kubejs:ender_curtain') * 20))
    player.addEffect(new $MobEffectInstance('irons_spellbooks:evasion',
        duration, Math.max(0, level - 1), false, false, false))
    player.persistentData.putLong(EnderCurtainNextTime, player.level.time + duration)
}

/**
 * @param {Object} customData
 * @param {Internal.CurioChangeEvent} event
 */
function EnderCurtainCurioChange(customData, event) {
    let player = event.entity
    if (player.level.isClientSide() || !player.isPlayer()) return
    if (!EnderCurtainEnabled(event.from) && EnderCurtainEnabled(event.to)) {
        EnderCurtainApply(player, event.to)
    }
}

/**
 * @param {Object} customData
 * @param {Internal.PlayerTickEventJS} event
 * @param {Internal.ItemStack} stack
 */
function EnderCurtainPlayerTick(customData, event, stack) {
    let player = event.player
    if (!player.isAlive() || !EnderCurtainEnabled(stack)) return
    if (player.level.time < player.persistentData.getLong(EnderCurtainNextTime)) return
    EnderCurtainApply(player, stack)
}

let EnderCurtainCuriosStrategy = CuriosStrategyMap['tetra:toolbelt'] || new CuriosStrategyModel('tetra:toolbelt')
RegistryCuriosStrategy(EnderCurtainCuriosStrategy.addStrategy('player_tick', EnderCurtainPlayerTick))

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:ender_curtain')
        .addStrategy('curio_change', EnderCurtainCurioChange, 10)
)
