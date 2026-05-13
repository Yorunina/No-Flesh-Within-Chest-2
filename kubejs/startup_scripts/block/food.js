// priority: 500
StartupEvents.registry('block', event => {
    event.create('kubejs:glutinous_lemon_juice')
        .box(5, 0, 5, 11, 13, 11)
        .model('kubejs:block/food/glutinous_lemon_juice')
        .defaultCutout()
})