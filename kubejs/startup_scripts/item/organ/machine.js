// priority: 500
StartupEvents.registry('item', event => {
    event.create('kubejs:furnace_core').maxStackSize(1).texture('kubejs:item/organs/machine/furnace_core').maxDamage(100).tag('kubejs:heart').tag('kubejs:machine')
    event.create('kubejs:burning_heart').maxStackSize(1).texture('kubejs:item/organs/machine/burning_heart').maxDamage(100).tag('kubejs:heart').tag('kubejs:machine')
    event.create('kubejs:revolution_cable').maxStackSize(1).texture('kubejs:item/organs/machine/revolution_cable').tag('kubejs:revolution').tag('kubejs:machine').tag('kubejs:spine')
    event.create('kubejs:revolution_relay').maxStackSize(1).texture('kubejs:item/organs/machine/revolution_relay').tag('kubejs:revolution').tag('kubejs:machine')
    event.create('kubejs:revolution_delay').maxStackSize(1).texture('kubejs:item/organs/machine/revolution_delay').tag('kubejs:revolution').tag('kubejs:machine')
    event.create('kubejs:revolution_bell').maxStackSize(1).texture('kubejs:item/organs/machine/revolution_bell').tag('kubejs:revolution').tag('kubejs:machine')
    event.create('kubejs:blaze_pressurizer').maxStackSize(1).texture('kubejs:item/organs/machine/blaze_pressurizer').tag('kubejs:machine')

    event.create('kubejs:telescopic_arm').maxStackSize(1).texture('kubejs:item/organs/machine/telescopic_arm').tag('kubejs:machine')
    event.create('kubejs:telescopic_attack_arm').maxStackSize(1).texture('kubejs:item/organs/machine/telescopic_attack_arm').tag('kubejs:machine')

    event.create('kubejs:lava_life_cycle_system').maxStackSize(1).texture('kubejs:item/organs/machine/lava_life_cycle_system').tag('kubejs:machine')

    event.create('kubejs:prowler_rotating_shaft').maxStackSize(1).texture('kubejs:item/organs/machine/prowler_rotating_shaft').tag('kubejs:machine')

    event.create('kubejs:watcher_probe').maxStackSize(1).texture('kubejs:item/organs/machine/watcher_probe').tag('kubejs:machine')

    event.create('kubejs:fiery_core').maxStackSize(1).texture('kubejs:item/organs/machine/fiery_core').fireResistant().tag('kubejs:machine').tag('kubejs:heart')

    event.create('kubejs:thermometer').maxStackSize(1).texture('kubejs:item/organs/machine/thermometer').tag('kubejs:machine').tag('kubejs:bone')

    event.create('kubejs:energy_bottle_red').maxStackSize(1).texture('kubejs:item/organs/machine/energy_bottle_red').maxDamage(100).tag('kubejs:muscle').tag('kubejs:machine')

    event.create('kubejs:small_acid_tank').maxStackSize(1).texture('kubejs:item/organs/machine/small_acid_tank').maxDamage(600).tag('kubejs:machine')

    event.create('kubejs:iron_repair_device').maxStackSize(1).texture('kubejs:item/organs/machine/iron_repair_device').tag('kubejs:machine')

    event.create('kubejs:cyborgization_device').maxStackSize(1).texture('kubejs:item/organs/machine/cyborgization_device').tag('kubejs:machine').maxDamage(30)

    event.create('kubejs:programmable_automatic_core').texture('kubejs:item/organs/machine/programmable_automatic_core').maxStackSize(1).tag('kubejs:machine')

    event.create('kubejs:inner_furnace').maxStackSize(1).tag('kubejs:machine').tag('kubejs:basic').texture('kubejs:item/organs/machine/inner_furnace').tag('kubejs:heart')
    event.create('kubejs:golem_cable').maxStackSize(1).tag('kubejs:machine').tag('kubejs:basic').texture('kubejs:item/organs/machine/golem_cable').tag('kubejs:spine')
    event.create('kubejs:golem_plating').maxStackSize(1).tag('kubejs:machine').tag('kubejs:basic').texture('kubejs:item/organs/machine/golem_plating').tag('kubejs:bone')
    event.create('kubejs:piston_muscle').maxStackSize(1).tag('kubejs:machine').tag('kubejs:basic').texture('kubejs:item/organs/machine/piston_muscle').tag('kubejs:muscle')
})