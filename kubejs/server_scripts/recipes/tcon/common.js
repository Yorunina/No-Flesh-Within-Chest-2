// priority: 500
ServerEvents.recipes(event => {
    const { tconstruct } = event.recipes
    tconstruct.material('kubejs:living_flesh', 'biomancy:living_flesh')
    tconstruct.material('kubejs:creator_mix', 'biomancy:creator_mix')
    tconstruct.material('kubejs:processed_soulstone', 'malum:processed_soulstone')
})
