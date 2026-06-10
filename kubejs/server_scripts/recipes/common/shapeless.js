// priority: 1000
ServerEvents.recipes(event => {
    event.shapeless('minecraft:paper', ['kubejs:sawdust', 'kubejs:sawdust', 'kubejs:sawdust'])
    event.remove({ id: 'torchmaster:frozen_pearl' })
    event.shapeless('torchmaster:frozen_pearl', ['minecraft:ender_pearl', 'minecraft:light_blue_dye'])
    event.shapeless('crittersandcompanions:dragonfly_wing', ['kubejs:dragonfly_wing'])
    event.shapeless(Item.of('kubejs:story_witness'), ['minecraft:orange_dye', 'minecraft:magenta_dye', 'minecraft:book'])
    event.shapeless(Item.of('exposure:album'), ['minecraft:writable_book', 'minecraft:emerald', 'minecraft:leather'])
})