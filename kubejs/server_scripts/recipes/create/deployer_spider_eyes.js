// priority: 500
ItemEvents.entityInteracted(event => {
    const level = event.level
    const player = event.player
    const target = event.target
    const item = event.item
    if (!item.hasTag('minecraft:shovels')) return
    if (target instanceof $LivingEntity && (target.type == 'minecraft:spider' || target.type == 'minecraft:cave_spider')) {
        if (player instanceof $DeployerFakePlayer) {
            if (target.headArmorItem.is('tconstruct:cave_spider_head') || target.headArmorItem.is('tconstruct:spider_head')) {
                SpawnLootAtLocation(level, target.blockPosition(), [Item.of('minecraft:spider_eye')])
                DamageItem(item)
            }
        }
    }
})