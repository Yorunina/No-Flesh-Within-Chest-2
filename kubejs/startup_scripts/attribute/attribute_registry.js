// priority: 1000
StartupEvents.registry('minecraft:attribute', event => {
    event.createCustom('kubejs:loot_multiplier', () => new $RangedAttribute('attribute.kubejs.loot_multiplier', 1, 0, 1024))
})

NativeEvents.onEvent($EntityAttributeModificationEvent, event => {
    event.add($EntityType.PLAYER, 'kubejs:loot_multiplier')
})