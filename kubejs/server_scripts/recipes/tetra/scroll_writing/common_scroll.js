// priority: 500
ServerEvents.recipes(event => {
    event.shaped('kubejs:tetra_scroll', [
        ['', 'minecraft:paper', 'minecraft:stick'],
        ['minecraft:paper', 'minecraft:iron_nugget', 'minecraft:paper'],
        ['minecraft:stick', 'minecraft:paper', '']
    ])
})

RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let effectLevel = item.getEffectLevel(targetStack, 'kubejs:fabric_inspiration')
        return effectLevel >= 5
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('fabric_expertise', null, [], ['fabric_expertise'], false, 0, 0xff3333, [5, 3, 6, 4]))
    },
    100
)

RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let effectLevel = item.getEffectLevel(targetStack, 'kubejs:fibre_inspiration')
        return effectLevel >= 5
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('fibre_expertise', null, [], ['fibre_expertise'], false, 0, 0xff3333, [5, 3, 6, 4]))
    },
    100
)

RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let effectLevel = item.getEffectLevel(targetStack, 'kubejs:skin_inspiration')
        return effectLevel >= 5
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('skin_expertise', null, [], ['skin_expertise'], false, 0, 0xff3333, [5, 3, 6, 4]))
    },
    100
)

RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let effectLevel = item.getEffectLevel(targetStack, 'kubejs:scale_inspiration')
        return effectLevel >= 5
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('scale_expertise', null, [], ['scale_expertise'], false, 0, 0xff3333, [5, 3, 6, 4]))
    },
    100
)

RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let effectLevel = item.getEffectLevel(targetStack, 'kubejs:wood_inspiration')
        return effectLevel >= 5
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('wood_expertise', null, [], ['wood_expertise'], false, 0, 0xff3333, [5, 3, 6, 4]))
    },
    100
)

RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let effectLevel = item.getEffectLevel(targetStack, 'kubejs:bone_inspiration')
        return effectLevel >= 5
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('bone_expertise', null, [], ['bone_expertise'], false, 0, 0xff3333, [5, 3, 6, 4]))
    },
    100
)

RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let effectLevel = item.getEffectLevel(targetStack, 'kubejs:metal_inspiration')
        return effectLevel >= 5
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('metal_expertise', null, [], ['metal_expertise'], false, 0, 0xff3333, [5, 3, 6, 4]))
    },
    100
)

RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let effectLevel = item.getEffectLevel(targetStack, 'kubejs:stone_inspiration')
        return effectLevel >= 5
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('stone_expertise', null, [], ['stone_expertise'], false, 0, 0xff3333, [5, 3, 6, 4]))
    },
    100
)

RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let effectLevel = item.getEffectLevel(targetStack, 'kubejs:gem_inspiration')
        return effectLevel >= 5
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('gem_expertise', null, [], ['gem_expertise'], false, 0, 0xff3333, [5, 3, 6, 4]))
    },
    100
)