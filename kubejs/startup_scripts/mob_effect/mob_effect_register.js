// priority: 1000
StartupEvents.registry('mob_effect', event => {
    event.create('vampiric')
        .beneficial()
        .color(Color.DARK_RED)

    event.create('colorful')
        .beneficial()
        .color(Color.RED)

})

