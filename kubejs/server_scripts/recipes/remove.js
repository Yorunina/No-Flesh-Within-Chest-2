// priority: 500
ServerEvents.recipes(event => {
    event.remove({ output: 'kaleidoscope_cookery:transmutation_lunch_bag' })
    event.remove({ output: 'sophisticatedbackpacks:inception_upgrade' })
    event.remove({ output: 'sophisticatedbackpacks:stack_upgrade_omega_tier' })
    event.remove({ output: 'cataclysm:meat_shredder' })
    
    event.remove({ mod: 'infinity' })
    event.remove({ mod: 'gateways' })
    event.remove({ mod: 'compactcrafting' })
    event.remove({ id: 'wormhole_artifact:wormhole_remote' })
    event.remove({ id: 'cataclysm:belt_of_beginner' })
})