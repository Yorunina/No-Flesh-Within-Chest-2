// priority: 500
StartupEvents.registry('block', event => {
    event.create('kubejs:encrypted_gateway', 'basic')
        .stoneSoundType()
        .textureAll('kubejs:block/world_machine/encrypted_gateway')
        .property(BlockProperties.HORIZONTAL_FACING)
        .placementState(state => {
            state.setValue(BlockProperties.HORIZONTAL_FACING, state.horizontalDirection)
            return state
        })

    event.create('kubejs:main_circuit_board', 'basic')
        .stoneSoundType()
        .textureAll('kubejs:block/world_machine/main_circuit_board')
        .property(BlockProperties.HORIZONTAL_FACING)
        .placementState(state => {
            state.setValue(BlockProperties.HORIZONTAL_FACING, state.horizontalDirection)
            return state
        })

    event.create('kubejs:precision_integrator', 'basic')
        .stoneSoundType()
        .texture('particle', 'kubejs:block/world_machine/precision_integrator_top')
        .textureSide('down', 'kubejs:block/world_machine/precision_integrator_bottom')
        .textureSide('up', 'kubejs:block/world_machine/precision_integrator_top')
        .textureSide('north', 'kubejs:block/world_machine/precision_integrator_north')
        .textureSide('south', 'kubejs:block/world_machine/precision_integrator_south')
        .textureSide('west', 'kubejs:block/world_machine/precision_integrator_west')
        .textureSide('east', 'kubejs:block/world_machine/precision_integrator_east')
        .property(BlockProperties.HORIZONTAL_FACING)
        .placementState(state => {
            state.setValue(BlockProperties.HORIZONTAL_FACING, state.horizontalDirection)
            return state
        })
        
    event.create('kubejs:spatial_stabilizer', 'basic')
        .stoneSoundType()
        .textureAll('kubejs:block/world_machine/spatial_stabilizer')
        .property(BlockProperties.HORIZONTAL_FACING)
        .placementState(state => {
            state.setValue(BlockProperties.HORIZONTAL_FACING, state.horizontalDirection)
            return state
        })

    event.create('kubejs:replicated_command_block', 'basic')
        .stoneSoundType()
        .textureAll('kubejs:block/world_machine/replicated_command_block')
    event.create('kubejs:secondary_circuit_board', 'basic')
        .stoneSoundType()
        .textureAll('kubejs:block/world_machine/secondary_circuit_board')
        .property(BlockProperties.HORIZONTAL_FACING)
        .placementState(state => {
            state.setValue(BlockProperties.HORIZONTAL_FACING, state.horizontalDirection)
            return state
        })


    event.create('kubejs:arcanum_core', 'basic')
        .stoneSoundType()
        .texture('particle', 'kubejs:block/world_machine/arcanum_core_top')
        .textureSide('down', 'kubejs:block/world_machine/arcanum_core_bottom')
        .textureSide('up', 'kubejs:block/world_machine/arcanum_core_top')
        .textureSide('north', 'kubejs:block/world_machine/arcanum_core')
        .textureSide('south', 'kubejs:block/world_machine/arcanum_core')
        .textureSide('west', 'kubejs:block/world_machine/arcanum_core')
        .textureSide('east', 'kubejs:block/world_machine/arcanum_core')

    event.create('kubejs:cerebral_brain_processor', 'basic')
        .stoneSoundType()
        .texture('particle', 'kubejs:block/world_machine/cerebral_brain_processor_top')
        .textureSide('down', 'kubejs:block/world_machine/cerebral_brain_processor_bottom')
        .textureSide('up', 'kubejs:block/world_machine/cerebral_brain_processor_top')
        .textureSide('north', 'kubejs:block/world_machine/cerebral_brain_processor')
        .textureSide('south', 'kubejs:block/world_machine/cerebral_brain_processor')
        .textureSide('west', 'kubejs:block/world_machine/cerebral_brain_processor')
        .textureSide('east', 'kubejs:block/world_machine/cerebral_brain_processor')

    event.create('kubejs:data_surge_compressor', 'basic')
        .stoneSoundType()
        .texture('particle', 'kubejs:block/data_surge_compressor_top')
        .textureSide('down', 'kubejs:block/world_machine/data_surge_compressor_bottom')
        .textureSide('up', 'kubejs:block/world_machine/data_surge_compressor_top')
        .textureSide('north', 'kubejs:block/world_machine/data_surge_compressor')
        .textureSide('south', 'kubejs:block/world_machine/data_surge_compressor')
        .textureSide('west', 'kubejs:block/world_machine/data_surge_compressor')
        .textureSide('east', 'kubejs:block/world_machine/data_surge_compressor')

    event.create('kubejs:eldritch_renderer', 'basic')
        .stoneSoundType()
        .texture('particle', 'kubejs:block/world_machine/eldritch_renderer_top')
        .textureSide('down', 'kubejs:block/world_machine/eldritch_renderer_bottom')
        .textureSide('up', 'kubejs:block/world_machine/eldritch_renderer_top')
        .textureSide('north', 'kubejs:block/world_machine/eldritch_renderer')
        .textureSide('south', 'kubejs:block/world_machine/eldritch_renderer')
        .textureSide('west', 'kubejs:block/world_machine/eldritch_renderer')
        .textureSide('east', 'kubejs:block/world_machine/eldritch_renderer')

    event.create('kubejs:entity_arithmancer', 'basic')
        .stoneSoundType()
        .textureAll('kubejs:block/world_machine/entity_arithmancer')
    event.create('kubejs:quantum_dimension_resolver', 'basic')
        .stoneSoundType()
        .textureAll('kubejs:block/world_machine/quantum_dimension_resolver')
    event.create('kubejs:void_diffraction_vault', 'basic')
        .glassSoundType()
        .textureAll('kubejs:block/world_machine/void_diffraction_vault')
        .defaultTranslucent()

})