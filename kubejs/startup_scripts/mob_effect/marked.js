// priority: 1000
StartupEvents.registry('mob_effect', event => {
    event.create('marked')
        .harmful()
        .color(Color.DARK_RED)
})
