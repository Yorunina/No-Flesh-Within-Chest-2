// priority: 500
ServerEvents.recipes(event => {
    event.shaped('kubejs:tetra_scroll', [
        ['', 'minecraft:paper', 'minecraft:stick'],
        ['minecraft:paper', 'minecraft:iron_nugget', 'minecraft:paper'],
        ['minecraft:stick', 'minecraft:paper', '']
    ])
})

/** @type {string[]} */
const CommonScrollWritingMaterials = [
    'fabric',
    'fibre',
    'skin',
    'scale',
    'wood',
    'bone',
    'metal',
    'stone',
    'gem'
]

CommonScrollWritingMaterials.forEach(material => {
    RegisterScrollWritingStrategy(
        (event) => {
            const targetStack = event.targetStack
            /** @type {Internal.ModularItem} */
            const item = targetStack.getItem()
            let effectLevel = item.getEffectLevel(targetStack, 'kubejs:' + material + '_inspiration')
            return effectLevel >= 5
        },
        (event) => {
            let key = material + '_expertise'
            event.setUpgradedStack(TetraJSUtils.setupScrollData(key, null, [], [key], false, 0, 0xff3333, [5, 3, 6, 4]))
        },
        100
    )
})
