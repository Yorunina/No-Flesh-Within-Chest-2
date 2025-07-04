// priority: 1000
StartupEvents.registry('mob_effect', event => {
    event.create('luck_deity')
        .beneficial()
        .color(Color.GREEN)
})
