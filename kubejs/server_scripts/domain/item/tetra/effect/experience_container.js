// priority: 500
BlockEvents.rightClicked('create_biotech:budding_experience', event => {
    const player = event.player
    const level = event.level
    const stack = event.item
    /**@type {Internal.ModularItem} */
    const item = stack.getItem()
    if (!item || !player) return
    if (player.playingAnimation) return
    if (!TetraJSUtils.isModularItem(item)) return
    if (IsPreForge(stack, PreForgeTypeContainer)) return
    SetPreForgeType(stack, PreForgeTypeContainer)
    player.triggerAnimation('kubejs:forge_blade_animation', 1, 'linear', true, true)
    level.playSound(
        null,
        player.getX(),
        player.getY(),
        player.getZ(),
        'minecraft:block.large_amethyst_bud.place',
        player.getSoundSource(),
        1,
        1
    )
    stack.setDamageValue(stack.getMaxDamage() - 1)
})
