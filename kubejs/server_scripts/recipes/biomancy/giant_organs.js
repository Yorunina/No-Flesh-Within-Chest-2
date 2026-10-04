// priority: 500
ServerEvents.recipes(event => {
    const organs = ['appendix', 'intestine', 'heart', 'kidney', 'liver', 'lung', 'muscle', 'rib', 'spine', 'spleen', 'stomach']
    organs.forEach(organ => {
        event.recipes.biomancy.bio_forging(
            [Item.of(`kubejs:${organ}`), Item.of('biomancy:flesh_bits', 32), Item.of('biomancy:hormone_secretion', 4)],
            Item.of(`kubejs:giant_${organ}`),
            'biomancy:organ',
            100
        ).id(`kubejs:giant_${organ}`)
    })
})
