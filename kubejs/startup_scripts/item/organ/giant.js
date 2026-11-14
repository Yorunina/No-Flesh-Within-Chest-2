// priority: 500
StartupEvents.registry('item', event => {
    const organs = ['appendix', 'intestine', 'heart', 'kidney', 'liver', 'lung', 'muscle', 'rib', 'spine', 'spleen', 'stomach']
    organs.forEach(organ => {
        event.create(`kubejs:giant_${organ}`)
            .maxStackSize(1)
            .texture(`kubejs:item/organs/giant/giant_${organ}`)
            .tag('kubejs:giant_organ')
            .tag(`kubejs:${organ == 'rib' ? 'bone' : organ}`)
    })
})
