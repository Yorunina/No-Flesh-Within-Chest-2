// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.pressing(Item.of('biomancy:vial', 2), 'biomancy:elastic_fibers')
})
