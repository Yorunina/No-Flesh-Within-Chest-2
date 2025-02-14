// priority: 500

StartupEvents.registry('item', event => {
    event.create('kubejs:greedy_stomach').maxStackSize(1).texture('kubejs:item/organs/common/stomach').tag('kubejs:stomach')

    event.create('kubejs:prismarine_crown').maxStackSize(1).texture('kubejs:item/organs/legends/prismarine_crown').tag('kubejs:legends')


    // // 无形肿瘤
    // event.create('kubejs:random_tumor')
    //     .food(food => {
    //         food.hunger(2).saturation(1)
    //         food.effect('minecraft:poison', 20 * 15, 2, 1)
    //         food.effect('minecraft:hunger', 20 * 15, 2, 1)
    //         food.alwaysEdible()
    //     })
    //     .texture('kubejs:item/organs/infected/random_tumor')
    //     .maxStackSize(1)
    //     .tag('kubejs:organ')
    //     .tag('kubejs:infected')
    //     .tag('itemborders:iron')
})