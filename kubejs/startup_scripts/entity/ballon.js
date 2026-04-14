// priority: 1000
StartupEvents.registry('entity_type', event => {
    event.create('airdrop_balloon', 'entityjs:mob')
        .tag('kubejs:airdrop')
        .mobCategory('misc')
        .noEggItem()
        .setRenderType('translucent')
        .sized(1.4, 4.5)
        .updateInterval(1)
        .modelResource(() => 'kubejs:geo/airdrop_balloon.geo.json')
        .textureResource(() => `kubejs:textures/entity/airdrop_balloon.png`)
        .canSpawnFarFromPlayer(true)
        .isPersistenceRequired(true)
        .isPushable(true)
        .setSoundVolume(0)
        .onAddedToWorld(entity => {
            entity.setNoGravity(true)
        })
})

EntityJSEvents.attributes(event => {
    event.modify(`kubejs:airdrop_balloon`, attribute => {
        attribute.add('minecraft:generic.max_health', 20)
        attribute.add('minecraft:generic.movement_speed', 0.0)
        attribute.add('minecraft:generic.attack_damage', 0.0)
    })
})