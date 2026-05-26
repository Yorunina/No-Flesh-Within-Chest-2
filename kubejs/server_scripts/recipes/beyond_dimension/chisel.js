// priority: 1000
ChiselEvents.modifyGroups(event => {
    event.create('beyonddimensions')
        .addAll(['beyonddimensions:net_energy_pathway', 'beyonddimensions:net_control', 'beyonddimensions:net_hopper_block', 'beyonddimensions:dimensional_connect_block', 'beyonddimensions:net_interface', 'beyonddimensions:net_terminal_block', 'beyonddimensions:net_pathway', 'beyonddimensions:net_pump_block', 'beyonddimensions:net_furnace_block', 'beyonddimensions:schematicannon_pathway', 'beyonddimensions:ars_source_pathway'])
})