
// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.createdieselgenerators.distillation(
        [Fluid.of('kubejs:blood_fat_fluid', 250), Fluid.of('kubejs:neuroexcitatory_hormone_fluid', 250), Fluid.of('kubejs:ageing_fluid', 250), Fluid.of('kubejs:rejuvenation_fluid', 250)],
        [Fluid.of('kubejs:blood_fluid', 1000)],
        100,
        'heated'
    )
})
