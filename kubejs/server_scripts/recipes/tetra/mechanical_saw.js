// priority: 500
BlockEvents.rightClicked('create:mechanical_saw', event => {
    const player = event.player
    const level = event.level
    const stack = event.item
    /**@type {Internal.ModularItem} */
    const item = stack.getItem()
    if (!item || !player) return
    if (player.playingAnimation) return
    if (!TetraJSUtils.isModularItem(item)) return
    if (IsPreForge(stack, PreForgeTypeMechanicalSaw)) return
    SetPreForgeType(stack, PreForgeTypeMechanicalSaw)
    player.triggerAnimation('kubejs:forge_blade_animation', 1, 'linear', true, true)
    level.playSound(null, player.getX(), player.getY(), player.getZ(), 'create:saw_activate_wood', player.getSoundSource(), 1, 1)
    stack.setDamageValue(stack.getMaxDamage() - 1)
})