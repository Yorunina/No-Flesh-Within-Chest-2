// priority: 900
RegisteryOrganTooltip(new MultiStateTooltip('kubejs:originiums')
    .addDefault(Text.translatable('tooltips.kubejs.originiums.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.originiums.alt.1'))
    .addAlt(Text.translatable('tooltips.kubejs.originiums.alt.2', Text.gold('10'), Text.gold('3')))
    .addAlt(Text.translatable('tooltips.kubejs.originiums.alt.3'))
    .addMPMType(OrganItemMPMTypeNotShow, OrganItemMPMTypeNotShowText)
    .addMPMType(OrganItemMPMTypeShow, OrganItemMPMTypeShowText)
)

RegisteryOrganTooltip(new MultiStateTooltip('kubejs:harvest_star_gem')
    .addDefault(Text.translatable('tooltips.kubejs.harvest_star_gem.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.harvest_star_gem.alt.1'))
    .addAlt(Text.translatable('tooltips.kubejs.harvest_star_gem.alt.2'))
)

RegisteryOrganTooltip(new MultiStateTooltip('kubejs:heal_star_gem')
    .addDefault(Text.translatable('tooltips.kubejs.heal_star_gem.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.heal_star_gem.alt.1'))
)

RegisteryOrganTooltip(new MultiStateTooltip('kubejs:coral_armor')
    .addDefault(Text.translatable('tooltips.kubejs.coral_armor.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.coral_armor.alt.1'))
)

RegisteryOrganTooltip(new MultiStateTooltip('kubejs:deepling_star_gem')
    .addDefault(Text.translatable('tooltips.kubejs.deepling_star_gem.default.1').gray())
    .addAlt(Text.translatable('tooltips.kubejs.deepling_star_gem.alt.1', 20, FrozenHover))
)

