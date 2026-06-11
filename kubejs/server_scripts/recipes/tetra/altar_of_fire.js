// priority: 500
BlockEvents.rightClicked('cataclysm:altar_of_fire', event => {
    const player = event.player
    const level = event.level
    const stack = event.item
    /**@type {Internal.ModularItem} */
    const item = stack.getItem()
    if (!item || !player) return
    if (player.playingAnimation) return
    if (!TetraJSUtils.isModularItem(item)) return
    if (IsPreForge(stack, PreForgeTypeFlamberge)) return
    SetPreForgeType(stack, PreForgeTypeFlamberge)
    player.triggerAnimation('kubejs:forge_blade_animation', 1, 'linear', true, true)
    level.playSound(null, player.getX(), player.getY(), player.getZ(), 'minecraft:block.fire.extinguish', player.getSoundSource(), 1, 1)
    stack.setDamageValue(stack.getMaxDamage() - 1)
})