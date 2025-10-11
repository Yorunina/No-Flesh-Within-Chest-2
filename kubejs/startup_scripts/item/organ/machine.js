// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:furnace_core').maxStackSize(1).texture('kubejs:item/organs/machine/furnace_core').maxDamage(100).tag('kubejs:revolution').tag('kubejs:heart').tag('kubejs:machine')
    event.create('kubejs:burning_heart').maxStackSize(1).texture('kubejs:item/organs/machine/burning_heart').maxDamage(100).tag('kubejs:revolution').tag('kubejs:heart').tag('kubejs:machine')
    event.create('kubejs:energy_bottle_red').maxStackSize(1).texture('kubejs:item/organs/machine/energy_bottle_red').maxDamage(100).tag('kubejs:revolution').tag('kubejs:muscle').tag('kubejs:machine')
    event.create('kubejs:revolution_cable').maxStackSize(1).texture('kubejs:item/organs/machine/revolution_cable').tag('kubejs:revolution').tag('kubejs:machine').tag('kubejs:spine')
    event.create('kubejs:revolution_relay').maxStackSize(1).texture('kubejs:item/organs/machine/revolution_relay').tag('kubejs:revolution').tag('kubejs:machine')
    event.create('kubejs:revolution_delay').maxStackSize(1).texture('kubejs:item/organs/machine/revolution_delay').tag('kubejs:revolution').tag('kubejs:machine')
    event.create('kubejs:revolution_bell').maxStackSize(1).texture('kubejs:item/organs/machine/revolution_bell').tag('kubejs:revolution').tag('kubejs:machine')
    event.create('kubejs:blaze_pressurizer').maxStackSize(1).texture('kubejs:item/organs/machine/blaze_pressurizer').tag('kubejs:revolution').tag('kubejs:machine')

    event.create('kubejs:telescopic_arm').maxStackSize(1).texture('kubejs:item/organs/machine/telescopic_arm').tag('kubejs:machine')
    event.create('kubejs:telescopic_attack_arm').maxStackSize(1).texture('kubejs:item/organs/machine/telescopic_attack_arm').tag('kubejs:machine')

    event.create('kubejs:lava_life_cycle_system').maxStackSize(1).texture('kubejs:item/organs/machine/lava_life_cycle_system').tag('kubejs:machine')

    event.create('kubejs:prowler_rotating_shaft').maxStackSize(1).texture('kubejs:item/organs/machine/prowler_rotating_shaft').tag('kubejs:machine')
    event.create('kubejs:watcher_probe').maxStackSize(1).texture('kubejs:item/organs/machine/watcher_probe').tag('kubejs:machine')
})