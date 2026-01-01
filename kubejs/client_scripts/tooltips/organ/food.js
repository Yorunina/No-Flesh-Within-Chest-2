// priority: 900
ItemEvents.tooltip(tooltip => {
    tooltip.addAdvancedToAll((item, advanced, text) => {
        if (item.hasNBT()) {
            let nbt = item.getNbt()
            if (nbt.contains('greedyThroatUUID')) {
                text.add(Text.translatable('tooltips.kubejs.greedy_throat.food_item').color('#025e00'))
            }
        }
    })
})

RegistryOrganTooltip(new MultiStateTooltip('kubejs:king_of_stomach')
    .addDefault(Text.translatable('tooltips.kubejs.king_of_stomach.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.king_of_stomach.alt.1'))
    .addAlt(Text.translatable('tooltips.kubejs.king_of_stomach.alt.2', Text.gold('0.25')))
    .addAlt(Text.translatable('tooltips.kubejs.king_of_stomach.alt.3', Text.gold('0.5')))
    .addAlt(Text.translatable('tooltips.kubejs.king_of_stomach.alt.4'))
    .addCtrl(GulaSlotType)
    .addCtrl(Text.translatable('tooltips.kubejs.king_of_stomach.ctrl.1'))
    .addCtrl(Text.translatable('tooltips.kubejs.king_of_stomach.ctrl.2'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:beer_gland')
    .addDefault(Text.translatable('tooltips.kubejs.beer_gland.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.beer_gland.alt.1'))
    .addAlt(Text.translatable('tooltips.kubejs.beer_gland.alt.2', Text.gold('2')))
    .addCtrl(DigestSlotType)
    .addCtrl(Text.translatable('tooltips.kubejs.beer_gland.ctrl.1'))
    .addCtrl(Text.translatable('tooltips.kubejs.beer_gland.ctrl.2', Text.gold('1')))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:sweets_gland')
    .addDefault(Text.translatable('tooltips.kubejs.sweets_gland.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.sweets_gland.alt.1'))
    .addAlt(Text.translatable('tooltips.kubejs.sweets_gland.alt.2', Text.gold('0.25')))
    .addAlt(Text.translatable('tooltips.kubejs.sweets_gland.alt.3', Text.gold('2')))
    .addCtrl(DigestSlotType)
    .addCtrl(Text.translatable('tooltips.kubejs.sweets_gland.ctrl.1'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:parasitism_stomach')
    .addDefault(Text.translatable('tooltips.kubejs.parasitism_stomach.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.parasitism_stomach.alt.1', Text.gold('3')))
    .addAlt(Text.translatable('tooltips.kubejs.parasitism_stomach.alt.2'))
    .addAlt(Text.translatable('tooltips.kubejs.parasitism_stomach.alt.3'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:greedy_throat')
    .addDefault(Text.translatable('tooltips.kubejs.greedy_throat.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.greedy_throat.alt.1'))
    .addAlt(Text.translatable('tooltips.kubejs.greedy_throat.alt.2'))
    .addAlt(Text.translatable('tooltips.kubejs.greedy_throat.alt.3'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:jar_of_mystery')
    .addDefault(Text.translatable('tooltips.kubejs.jar_of_mystery.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.jar_of_mystery.alt.1'))
    .addAlt(Text.translatable('tooltips.kubejs.jar_of_mystery.alt.2'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:parasite_larva')
    .addDefault(Text.translatable('tooltips.kubejs.parasite_larva.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.parasite_larva.alt.1'))
    .addAlt((text, item) => {
        let nbt = item.getOrCreateTag()
        let saturation = nbt.getFloat('saturation')
        let avgSaturation = saturation / (item.getMaxDamage() - item.getDamageValue())
        return [Text.translatable('tooltips.kubejs.parasite_larva.alt.2', avgSaturation > 1 ? Text.gold(avgSaturation) : Text.green(avgSaturation))]
    })
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:jar_of_vacuum')
    .addDefault(Text.translatable('tooltips.kubejs.jar_of_vacuum.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.jar_of_vacuum.alt.1', NearbyOrganHover, Text.gold('1')))
)