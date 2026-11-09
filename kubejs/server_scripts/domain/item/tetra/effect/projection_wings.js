// priority: 500

/**
 * 检查模块物品是否含投影之翼。
 * @param {Internal.ItemStack} stack
 * @returns {boolean}
 */
function ProjectionWingsEnabled(stack) {
    return TetraJSUtils.isModularItem(stack.getItem())
        && stack.getItem().getEffectLevel(stack, 'kubejs:projection_wings') > 0
}

/**
 * @param {Internal.Player} player
 */
function ProjectionWingsApply(player) {
    player.addEffect(new $MobEffectInstance('irons_spellbooks:angel_wings', 6000, 0, false, false, false))
}

/**
 * 复用每秒饰品分发，在余效低于三十秒或被驱散时补药。
 * @param {Object} customData
 * @param {Internal.PlayerTickEventJS} event
 * @param {Internal.ItemStack} stack
 */
function ProjectionWingsPlayerTick(customData, event, stack) {
    if (!event.player.isAlive() || !ProjectionWingsEnabled(stack)) return
    let effect = event.player.getEffect('irons_spellbooks:angel_wings')
    if (!effect || (effect.getDuration() >= 0 && effect.getDuration() <= 600)) ProjectionWingsApply(event.player)
}

let ProjectionWingsCuriosStrategy = CuriosStrategyMap['tetra:toolbelt'] || new CuriosStrategyModel('tetra:toolbelt')
RegistryCuriosStrategy(ProjectionWingsCuriosStrategy.addStrategy('player_tick', ProjectionWingsPlayerTick))

/**
 * @param {Object} customData
 * @param {Internal.CurioChangeEvent} event
 */
function ProjectionWingsCurioChange(customData, event) {
    let player = event.entity
    if (player.level.isClientSide() || !player.isPlayer()) return
    if (!ProjectionWingsEnabled(event.from) && ProjectionWingsEnabled(event.to)) ProjectionWingsApply(player)
}

RegistryTetraEffectStrategy(
    new TetraEffectStrategyModel('kubejs:projection_wings')
        .addStrategy('curio_change', ProjectionWingsCurioChange)
)
