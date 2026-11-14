// priority: 900
const GiantOrganTooltipNames = ['appendix', 'intestine', 'heart', 'kidney', 'liver', 'lung', 'muscle', 'rib', 'spine', 'spleen', 'stomach']
GiantOrganTooltipNames.forEach(organ => RegistryOrganTooltip(
    new MultiStateTooltip(`kubejs:giant_${organ}`)
))
