// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('armor_shred', builder => {
        builder.addAttributes((view, lvl, slot, attributes) => {
            attributes.put(
                'attributeslib:armor_shred',
                builder.getAttributeModifier('B7EF44B2-4F40-47A8-9AF9-581FB45AEC9D', 'tcon_armor_shred_modifier', lvl * 0.1, 'addition')
            )
            return attributes
        })
    })
})