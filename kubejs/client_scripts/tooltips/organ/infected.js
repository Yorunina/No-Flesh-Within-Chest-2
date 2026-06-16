// priority: 900
RegistryOrganTooltip(new MultiStateTooltip('kubejs:tumor')
    .addDefault(Text.translatable('tooltips.kubejs.tumor.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.tumor.alt.1'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:unformed_tumor')
    .addDefault(Text.translatable('tooltips.kubejs.unformed_tumor.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.unformed_tumor.alt.1'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:worm_neuron')
    .addDefault(Text.translatable('tooltips.kubejs.worm_neuron.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.worm_neuron.alt.1'))
    .addAlt(Text.translatable('tooltips.kubejs.worm_neuron.alt.2', BasicTumorScoreHover, PotentialTumorScoreHover))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:malignant_neuron_tumor')
    .addDefault(Text.translatable('tooltips.kubejs.malignant_neuron_tumor.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.malignant_neuron_tumor.alt.1', Text.gold('1')))
    .addAlt(Text.translatable('tooltips.kubejs.malignant_neuron_tumor.alt.2'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:parasitic_tumor')
    .addDefault(Text.translatable('tooltips.kubejs.parasitic_tumor.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.parasitic_tumor.alt.1'))
    .addAlt(Text.translatable('tooltips.kubejs.parasitic_tumor.alt.2'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:rosy_tumor')
    .addDefault(Text.translatable('tooltips.kubejs.rosy_tumor.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.rosy_tumor.alt.1'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:primal_heart')
    .addDefault(Text.translatable('tooltips.kubejs.primal_heart.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.primal_heart.alt.1'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:primal_bone_cage')
    .addDefault(Text.translatable('tooltips.kubejs.primal_bone_cage.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.primal_bone_cage.alt.1').red())
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:devour_teeth')
    .addDefault(Text.translatable('tooltips.kubejs.devour_teeth.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.devour_teeth.alt.1'))
    .addAlt(Text.translatable('tooltips.kubejs.devour_teeth.alt.2'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:bone_meal_bag')
    .addDefault(Text.translatable('tooltips.kubejs.bone_meal_bag.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.bone_meal_bag.alt.1'))
    .addAlt(Text.translatable('tooltips.kubejs.bone_meal_bag.alt.2', KeyActiveHover))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:mutation_intestine')
    .addDefault(Text.translatable('tooltips.kubejs.mutation_intestine.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.mutation_intestine.alt.1'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:wither_bone_cage')
    .addDefault(Text.translatable('tooltips.kubejs.wither_bone_cage.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.wither_bone_cage.alt.1', Text.gold('20%'), LuckHover, Text.gold('5')))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:nightmare_core')
    .addDefault(Text.translatable('tooltips.kubejs.nightmare_core.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.nightmare_core.alt.1'))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:soul_core')
    .addDefault(Text.translatable('tooltips.kubejs.soul_core.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.soul_core.alt.1', FrozenHover))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:witch_fibroma')
    .addDefault(Text.translatable('tooltips.kubejs.witch_fibroma.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.witch_fibroma.alt.1', KeyActiveHover))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:heart_of_mercy')
    .addDefault(Text.translatable('tooltips.kubejs.heart_of_mercy.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.heart_of_mercy.alt.1', SurgicalAnesthesiaHover, SurgicalAnesthesiaHover))
)

RegistryOrganTooltip(new MultiStateTooltip('kubejs:navigating_liver')
    .addAlt(Text.translatable('tooltips.kubejs.navigating_liver.alt.1'))
    .addAlt(Text.translatable('tooltips.kubejs.navigating_liver.alt.2'))
    .addDefault((text, item) => {
        let res = []
        const nbt = item.getOrCreateTag()
        switch (nbt.getInt('locating')) {
            case 1: {
                res.push(Text.translatable('tooltips.kubejs.navigating_liver.default.2').gray())
                break
            }
            case 2: {
                res.push(Text.translatable('tooltips.kubejs.navigating_liver.default.3').gray())
                break
            }
            default:
                res.push(Text.translatable('tooltips.kubejs.navigating_liver.default.1').gray())
        }
        return res
    })
)