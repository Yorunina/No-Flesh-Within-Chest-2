// priority: 1000
const AirDropBalloonType = ['airdrop_balloon', 'airdrop_balloon_red', 'airdrop_balloon_blue', 'airdrop_balloon_yellow']

StartupEvents.registry('entity_type', event => {
    AirDropBalloonType.forEach(type => {
        event.create(type, 'entityjs:mob')
            .tag('kubejs:airdrop')
            .mobCategory('misc')
            .noEggItem()
            .setRenderType('translucent')
            .sized(1.4, 4.5)
            .updateInterval(1)
            .modelResource(() => 'kubejs:geo/airdrop_balloon.geo.json')
            .textureResource(() => `kubejs:textures/entity/${type}.png`)
            .canSpawnFarFromPlayer(true)
            .isPersistenceRequired(true)
            .isPushable(true)
            .setSoundVolume(0)
            .onAddedToWorld(entity => {
                entity.setNoGravity(true)
            })

        event.create(`med_${type}`, 'entityjs:mob')
            .tag('kubejs:airdrop')
            .mobCategory('misc')
            .noEggItem()
            .setRenderType('translucent')
            .sized(1.5, 5.0)
            .updateInterval(1)
            .modelResource(() => 'kubejs:geo/med_airdrop_balloon.geo.json')
            .textureResource(() => `kubejs:textures/entity/med_${type}.png`)
            .canSpawnFarFromPlayer(true)
            .isPersistenceRequired(true)
            .isPushable(true)
            .setSoundVolume(0)
            .onAddedToWorld(entity => {
                entity.setNoGravity(true)
            })

        event.create(`adv_${type}`, 'entityjs:mob')
            .tag('kubejs:airdrop')
            .mobCategory('misc')
            .noEggItem()
            .setRenderType('translucent')
            .sized(1.6, 6.0)
            .updateInterval(1)
            .modelResource(() => 'kubejs:geo/adv_airdrop_balloon.geo.json')
            .textureResource(() => `kubejs:textures/entity/adv_${type}.png`)
            .canSpawnFarFromPlayer(true)
            .isPersistenceRequired(true)
            .isPushable(true)
            .setSoundVolume(0)
            .onAddedToWorld(entity => {
                entity.setNoGravity(true)
            })
    })

})

EntityJSEvents.attributes(event => {
    AirDropBalloonType.forEach(type => {
        event.modify(`kubejs:${type}`, attribute => {
            attribute.add('minecraft:generic.max_health', 20)
            attribute.add('minecraft:generic.movement_speed', 0.0)
            attribute.add('minecraft:generic.attack_damage', 0.0)
        })
        event.modify(`kubejs:med_${type}`, attribute => {
            attribute.add('minecraft:generic.max_health', 30)
            attribute.add('minecraft:generic.movement_speed', 0.0)
            attribute.add('minecraft:generic.attack_damage', 0.0)
        })
        event.modify(`kubejs:adv_${type}`, attribute => {
            attribute.add('minecraft:generic.max_health', 40)
            attribute.add('minecraft:generic.movement_speed', 0.0)
            attribute.add('minecraft:generic.attack_damage', 0.0)
        })
    })
})