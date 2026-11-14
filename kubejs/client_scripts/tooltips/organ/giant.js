// priority: 900
const GiantOrganNames = ['appendix', 'intestine', 'heart', 'kidney', 'liver', 'lung', 'muscle', 'rib', 'spine', 'spleen', 'stomach']
GiantOrganNames.forEach(organ => RegistryOrganTooltip(new MultiStateTooltip(`kubejs:giant_${organ}`)))
