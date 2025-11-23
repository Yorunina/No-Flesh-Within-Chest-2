TConJSEvents.modifierRegistry(event => {
    event.createNew('bow_strength', builder => {
        builder.addAttributes((view, lvl, slot, attributes) => {
            attributes.put(
                'l2damagetracker:bow_strength',
                builder.getAttributeModifier('819a27e6-aae2-436d-a368-891c73804b2d', 'tcon_elastic_fibers_bow_strength', lvl * 0.1, 'addition')
            )
            return attributes
        })
    })
    event.createNew('draw_speed', builder => {
        builder.addAttributes((view, lvl, slot, attributes) => {
            attributes.put(
                'attributeslib:draw_speed',
                builder.getAttributeModifier('30ec620b-4ce8-4150-b354-727950c1ae8a', 'tcon_essence_of_the_storm_draw_speed', lvl * 0.1, 'addition')
            )
            return attributes
        })
    })
    event.createNew('knockback_multiplier', builder => {
        builder.addAttributes((view, lvl, slot, attributes) => {
            attributes.put(
                'tconstruct:generic.knockback_multiplier',
                builder.getAttributeModifier('3a8769f8-2894-412d-86b8-cccbad16d29f', 'tcon_mob_sinew_knockback_multiplier', lvl * 0.1, 'addition')
            )
            return attributes
        })
    })
    event.createNew('arrow_damage', builder => {
        builder.addAttributes((view, lvl, slot, attributes) => {
            attributes.put(
                'attributeslib:arrow_damage',
                builder.getAttributeModifier('dde8a2fb-c76b-4349-bb3d-39e010c17446', 'tcon_tough_fibers_arrow_damage', lvl * 0.1, 'addition')
            )

            return attributes
        })
    })
    event.createNew('arrow_velocity', builder => {
        builder.addAttributes((view, lvl, slot, attributes) => {
            attributes.put(
                'attributeslib:arrow_velocity',
                builder.getAttributeModifier('a7bb8ae5-bbe5-4161-ba67-b0759b65cf3a', 'tcon_tough_fibers_arrow_velocity', lvl * 0.1, 'addition')
            )
            return attributes
        })
    })
})