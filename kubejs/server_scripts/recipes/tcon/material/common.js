// priority: 1000
ServerEvents.recipes(event => {
    const { tconstruct } = event.recipes
    //无流体物品
    tconstruct.material('kubejs:living_flesh', 'biomancy:living_flesh')
    tconstruct.material('kubejs:creator_mix', 'biomancy:creator_mix')
    tconstruct.material('kubejs:acid_splatter', 'biomancy:acid_splatter')
    tconstruct.material('kubejs:black_steel', 'cataclysm:black_steel_ingot')
    tconstruct.material('kubejs:dark_iron', 'graveyard:dark_iron_ingot')

    event.remove({ id: 'tconstruct:smeltery/melting/metal/iron/ingot_1' })
    event.remove({ id: 'tconstruct:smeltery/melting/metal/gold/powered_rail' })
    event.remove({ id: 'tconstruct:smeltery/melting/metal/iron/nugget_3' })
})