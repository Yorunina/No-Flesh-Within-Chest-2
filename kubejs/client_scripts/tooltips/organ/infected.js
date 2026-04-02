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
    .addAlt(Text.translatable('tooltips.kubejs.malignant_neuron_tumor.alt.1', 1))
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