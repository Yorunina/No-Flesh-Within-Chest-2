// priority: 1000
StartupEvents.registry('item', event => {
    let bags = [
        { id: 'common_organ_bag', rarity: 'common' },
        { id: 'fine_organ_bag', rarity: 'uncommon' },
        { id: 'rare_organ_bag', rarity: 'rare' },
        { id: 'epic_organ_bag', rarity: 'epic' },
        { id: 'legendary_organ_bag', rarity: 'epic' },
    ]
    for (let i = 0; i < bags.length; i++) {
        let bag = bags[i]
        event.create('kubejs:' + bag.id)
            .maxStackSize(16)
            .rarity(bag.rarity)
            .texture('kubejs:item/tools/' + bag.id)
            .tag('kubejs:organ_bag')
    }
})
