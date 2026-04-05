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

RegistryOrganTooltip(new MultiStateTooltip('kubejs:worm_larva')
    .addDefault(Text.translatable('tooltips.kubejs.worm_larva.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.worm_larva.alt.1'))
    .addAlt((text, item) => {
        let nbt = item.getOrCreateTag()
        let saturation = nbt.getFloat('saturation')
        let pDamage = item.getMaxDamage() - item.getDamageValue()
        let avgSaturation = pDamage != 0 ? saturation / pDamage : 0
        return [Text.translatable('tooltips.kubejs.worm_larva.alt.2', avgSaturation > 1 ? Text.gold(avgSaturation.toFixed(2)) : Text.green(avgSaturation.toFixed(2)))]
    })
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:jar_of_vacuum')
    .addDefault(Text.translatable('tooltips.kubejs.jar_of_vacuum.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.jar_of_vacuum.alt.1', NearbyOrganHover, Text.gold('1')))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:worm_of_taste')
    .addDefault(Text.translatable('tooltips.kubejs.worm_of_taste.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.worm_of_taste.alt.1', NearbyOrganHover, Text.gold('0.25')))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:sweet_heart')
    .addDefault(Text.translatable('tooltips.kubejs.sweet_heart.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.sweet_heart.alt.1', NearbyOrganHover, Text.gold('0.125')))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:baguette_bone')
    .addDefault(Text.translatable('tooltips.kubejs.baguette_bone.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.baguette_bone.alt.1', NearbyOrganHover, Text.gold('0.125')))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:gluten_muscle')
    .addDefault(Text.translatable('tooltips.kubejs.gluten_muscle.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.gluten_muscle.alt.1', DiagonalOrganHover, Text.gold('0.5')))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:worm_of_gula')
    .addDefault(Text.translatable('tooltips.kubejs.worm_of_gula.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.worm_of_gula.alt.1'))
    .addAlt(Text.translatable('tooltips.kubejs.worm_of_gula.alt.2'))
    .addAlt(Text.translatable('tooltips.kubejs.worm_of_gula.alt.3'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:gula_worm_nest')
    .addDefault(Text.translatable('tooltips.kubejs.gula_worm_nest.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.gula_worm_nest.alt.1'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:deserted_gula_worm_nest')
    .addDefault(Text.translatable('tooltips.kubejs.deserted_gula_worm_nest.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.deserted_gula_worm_nest.alt.1'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:mashed_potato_pancreas')
    .addDefault(Text.translatable('tooltips.kubejs.mashed_potato_pancreas.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.mashed_potato_pancreas.alt.1', Text.gold('1'), ExtremeFitnessHover))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:living_beef_wellington')
    .addDefault(Text.translatable('tooltips.kubejs.living_beef_wellington.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.living_beef_wellington.alt.1', Text.gold('1'), ExtremeStrengthHover))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:void_stomach_pouch')
    .addDefault(Text.translatable('tooltips.kubejs.void_stomach_pouch.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.void_stomach_pouch.alt.1'))
    .addAlt(Text.translatable('tooltips.kubejs.void_stomach_pouch.alt.2'))
    .addAlt(Text.translatable('tooltips.kubejs.void_stomach_pouch.alt.3'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:gula_beacon')
    .addDefault(Text.translatable('tooltips.kubejs.gula_beacon.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.gula_beacon.alt.1'))
)