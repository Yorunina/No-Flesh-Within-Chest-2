// priority: 900
const GiantOrganTooltipNames = ['appendix', 'intestine', 'heart', 'kidney', 'liver', 'lung', 'muscle', 'rib', 'spine', 'spleen', 'stomach']
GiantOrganTooltipNames.forEach(organ => RegistryOrganTooltip(
    new MultiStateTooltip(`kubejs:giant_${organ}`)
        .addDefault(Text.translatable('tooltips.kubejs.giant_organ.default.1').gray())
        .addAlt(Text.translatable('tooltips.kubejs.giant_organ.alt.1'))
))
