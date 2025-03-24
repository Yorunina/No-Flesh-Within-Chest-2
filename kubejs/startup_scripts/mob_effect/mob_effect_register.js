// priority: 500
StartupEvents.registry('mob_effect', event => {
    event.create('sweet_dream')
        .beneficial()
        .color(Color.PINK_DYE)

    event.create('vampiric')
        .beneficial()
        .color(Color.DARK_RED)

    event.create('colorful')
        .beneficial()
        .color(Color.RED)

    event.create('dragon_power')
        .beneficial()
        .color(Color.DARK_PURPLE)
})

