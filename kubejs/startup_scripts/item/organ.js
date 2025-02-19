// priority: 500

StartupEvents.registry('item', event => {
    event.create('kubejs:greedy_stomach').maxStackSize(1).texture('kubejs:item/organs/common/stomach').tag('kubejs:stomach')

    event.create('kubejs:prismarine_crown').maxStackSize(1).texture('kubejs:item/organs/legends/prismarine_crown').tag('kubejs:legends')

    event.create('kubejs:infinity_beats').maxStackSize(1).texture('kubejs:item/organs/infinity/infinity_beats').tag('kubejs:infinity')
    event.create('kubejs:infinity_force').maxStackSize(1).texture('kubejs:item/organs/infinity/infinity_force').tag('kubejs:infinity')

    event.create('kubejs:rose_quartz_muscle').maxStackSize(1).texture('kubejs:item/organs/rose_quartz/rose_quartz_muscle').tag('kubejs:rose').tag('kubejs:muscle')
    event.create('kubejs:rose_quartz_heart').maxStackSize(1).texture('kubejs:item/organs/rose_quartz/rose_quartz_heart').tag('kubejs:rose').tag('kubejs:heart')
    event.create('kubejs:rose_quartz_liver').maxStackSize(1).texture('kubejs:item/organs/rose_quartz/rose_quartz_liver').tag('kubejs:rose').tag('kubejs:liver')
    event.create('kubejs:rose_quartz_dialyzer').maxStackSize(1).texture('kubejs:item/organs/rose_quartz/rose_quartz_dialyzer').tag('kubejs:rose').tag('kubejs:kidney')
    event.create('kubejs:rose_quartz_rib').maxStackSize(1).texture('kubejs:item/organs/rose_quartz/rose_quartz_rib').tag('kubejs:rose').tag('kubejs:rib')



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