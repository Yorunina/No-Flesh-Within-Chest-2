// priority: 1000
ServerEvents.recipes(event => {
    event.recipes.create.deploying(['kubejs:world_computer'], ['create:brass_block', 'kubejs:reverse_causality_chip'])
})
