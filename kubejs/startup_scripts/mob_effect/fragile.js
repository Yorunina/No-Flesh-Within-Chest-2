// priority: 1000
StartupEvents.registry('mob_effect', event => {
    event.create('fragile')
        .harmful()
        .color(Color.DARK_GRAY)
})
