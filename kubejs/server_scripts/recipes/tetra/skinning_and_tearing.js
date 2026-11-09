// priority: 500

BlockEvents.rightClicked('biomancy:bio_forge', /** @param {Internal.BlockRightClickedEventJS} event */ event => {
    const player = event.player
    const level = event.level
    const stack = event.item
    /**@type {Internal.ModularItem} */
    const item = stack.getItem()
    if (!item || !player) return
    if (!player.isCrouching()) return
    if (player.playingAnimation) return
    if (!TetraJSUtils.isModularItem(item)) return
    if (IsPreForge(stack, PreForgeTypeSkinningSickle)) return
    SetPreForgeType(stack, PreForgeTypeSkinningSickle)
    level.playSound(null, player.getX(), player.getY(), player.getZ(), 'biomancy:flesh_block.place', player.getSoundSource(), 1, 1)
    player.triggerAnimation('kubejs:forge_blade_animation', 1, 'linear', true, true)
    stack.setDamageValue(stack.getMaxDamage() - 1)
    event.cancel()
})

BlockEvents.rightClicked('cataclysm:mechanical_fusion_anvil', /** @param {Internal.BlockRightClickedEventJS} event */ event => {
    const player = event.player
    const level = event.level
    const stack = event.item
    /**@type {Internal.ModularItem} */
    const item = stack.getItem()
    if (!item || !player) return
    if (!player.isCrouching()) return
    if (player.playingAnimation) return
    if (!TetraJSUtils.isModularItem(item)) return
    if (IsPreForge(stack, PreForgeTypeTearingSpear)) return
    SetPreForgeType(stack, PreForgeTypeTearingSpear)
    level.playSound(null, player.getX(), player.getY(), player.getZ(), 'minecraft:block.anvil.use', player.getSoundSource(), 1, 1)
    player.triggerAnimation('kubejs:forge_blade_animation', 1, 'linear', true, true)
    stack.setDamageValue(stack.getMaxDamage() - 1)
    event.cancel()
})
