// priority: 500
ServerEvents.recipes(event => {
    event.remove({ output: 'kaleidoscope_cookery:transmutation_lunch_bag' })
    event.remove({ output: 'sophisticatedbackpacks:inception_upgrade' })
    event.remove({ output: 'sophisticatedbackpacks:stack_upgrade_omega_tier' })
    event.remove({ output: 'bosses_of_mass_destruction:levitation_block' })
    event.remove({ mod: 'infinity'})
})