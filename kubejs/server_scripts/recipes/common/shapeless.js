// priority: 1000
ServerEvents.recipes(event => {
    event.shapeless('minecraft:paper', ['kubejs:sawdust', 'kubejs:sawdust', 'kubejs:sawdust'])
    event.shapeless('4x minecraft:glass', ['kubejs:clear_crystal', '#minecraft:sand'])
    event.remove({ id: 'torchmaster:frozen_pearl' })
    event.shapeless('torchmaster:frozen_pearl', ['minecraft:ender_pearl', 'minecraft:light_blue_dye'])
    event.shapeless('crittersandcompanions:dragonfly_wing', ['kubejs:dragonfly_wing'])
})
