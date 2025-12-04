// priority: 500
ServerEvents.recipes(event => {
    event.remove({ output: 'kaleidoscope_cookery:transmutation_lunch_bag' })
    event.remove({ output: 'bosses_of_mass_destruction:levitation_block' })
})