// priority: 500
StartupEvents.registry('item', event => {
    // 肿瘤
    event.create('kubejs:worm_neuron')
        .maxStackSize(1)
        .texture('kubejs:item/organs/infected/worm_neuron')
        .tag('kubejs:infected')

    // 无形肿瘤
    event.create('kubejs:tumor')
        .food(food => {
            food.hunger(2).saturation(1)
            food.alwaysEdible()
        })
        .texture('kubejs:item/organs/infected/tumor')
        .maxStackSize(1)
        .tag('kubejs:organ')
        .tag('kubejs:infected')
})