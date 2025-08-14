// priority: 900
StartupEvents.registry('block', event => {
    event.create('kubejs:dungeon_obelisk_base', 'custommachinery')
        .machine('kubejs:dungeon_obelisk')
    // .defaultTranslucent()
    // .unbreakable()

    event.create('kubejs:dungeon_obelisk_top')
        .noItem()
        .defaultTranslucent()
        .unbreakable()
})
