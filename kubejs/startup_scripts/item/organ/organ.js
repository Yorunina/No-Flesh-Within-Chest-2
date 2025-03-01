// priority: 500

StartupEvents.registry('item', event => {
    event.create('kubejs:greedy_stomach').maxStackSize(1).texture('kubejs:item/organs/common/stomach').tag('kubejs:stomach')

    event.create('kubejs:prismarine_crown').maxStackSize(1).texture('kubejs:item/organs/legends/prismarine_crown').tag('kubejs:legends')

    // 无尽
    event.create('kubejs:infinity_beats').maxStackSize(1).texture('kubejs:item/organs/infinity/infinity_beats').tag('kubejs:infinity')
    event.create('kubejs:infinity_force').maxStackSize(1).texture('kubejs:item/organs/infinity/infinity_force').tag('kubejs:infinity')



    // 机械
    event.create('kubejs:furnace_core').maxStackSize(1).texture('kubejs:item/organs/machine/furnace_core').maxDamage(100).tag('kubejs:revolution').tag('kubejs:heart').tag('kubejs:machine')
    event.create('kubejs:burning_heart').maxStackSize(1).texture('kubejs:item/organs/machine/burning_heart').maxDamage(100).tag('kubejs:revolution').tag('kubejs:heart').tag('kubejs:machine')
    


})


