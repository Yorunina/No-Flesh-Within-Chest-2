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

    event.create('kubejs:energy_bottle_red').maxStackSize(1).texture('kubejs:item/organs/machine/energy_bottle_red').maxDamage(100).tag('kubejs:revolution').tag('kubejs:muscle').tag('kubejs:revolution').tag('kubejs:machine')

    event.create('kubejs:revolution_cable').maxStackSize(1).texture('kubejs:item/organs/machine/revolution_cable').tag('kubejs:revolution').tag('kubejs:machine').tag('kubejs:spine')

    event.create('kubejs:revolution_relay').maxStackSize(1).texture('kubejs:item/organs/machine/revolution_relay').tag('kubejs:revolution').tag('kubejs:machine')

    event.create('kubejs:revolution_delay').maxStackSize(1).texture('kubejs:item/organs/machine/revolution_delay').tag('kubejs:revolution').tag('kubejs:machine')

    event.create('kubejs:revolution_bell').maxStackSize(1).texture('kubejs:item/organs/machine/revolution_bell').tag('kubejs:revolution').tag('kubejs:machine')

    event.create('kubejs:blaze_pressurizer').maxStackSize(1).texture('kubejs:item/organs/machine/blaze_pressurizer').tag('kubejs:revolution').tag('kubejs:machine')
})


