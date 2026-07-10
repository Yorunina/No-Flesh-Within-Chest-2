// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.pressing(Item.of('biomancy:vial', 2), 'biomancy:elastic_fibers')
    event.recipes.create.pressing(Item.of('kubejs:empty_inducer_serum', 2), 'biomancy:tough_fibers')
    event.recipes.create.pressing(Fluid.of('createdieselgenerators:plant_oil', 200), '#forge:crops/flax')

    event.recipes.createdieselgenerators.compression_molding(
        [Item.of('kaleidoscope_cookery:oil', 1)],
        [Fluid.of('kubejs:blood_fat_fluid', 250)], 'createdieselgenerators:bowl')
})