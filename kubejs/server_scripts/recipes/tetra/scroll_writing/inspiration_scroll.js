// priority: 500

/** @type {{key: string, socket: string, effectA: string, effectB: string}[]} */
const InspirationScrollWritingList = [
    {
        key: 'starry_inspiration',
        socket: 'socket/socket_pristine_amethyst',
        effectA: 'kubejs:fabric_inspiration',
        effectB: 'kubejs:gem_inspiration'
    },
    {
        key: 'strength_inspiration',
        socket: 'socket/socket_pristine_diamond',
        effectA: 'kubejs:stone_inspiration',
        effectB: 'kubejs:fibre_inspiration'
    },
    {
        key: 'enchant_inspiration',
        socket: 'socket/socket_pristine_emerald',
        effectA: 'kubejs:skin_inspiration',
        effectB: 'kubejs:bone_inspiration'
    },
    {
        key: 'durability_inspiration',
        socket: 'socket/socket_pristine_lapis',
        effectA: 'kubejs:metal_inspiration',
        effectB: 'kubejs:scale_inspiration'
    },
    {
        key: 'exhaustion_inspiration',
        socket: 'socket/socket_amethyst',
        effectA: 'kubejs:fibre_inspiration',
        effectB: 'kubejs:wood_inspiration'
    },
    {
        key: 'effect_inspiration',
        socket: 'socket/socket_diamond',
        effectA: 'kubejs:gem_inspiration',
        effectB: 'kubejs:fabric_inspiration'
    },
    {
        key: 'blood_inspiration',
        socket: 'socket/socket_emerald',
        effectA: 'kubejs:bone_inspiration',
        effectB: 'kubejs:fabric_inspiration'
    },
    {
        key: 'thunder_inspiration',
        socket: 'socket/socket_lapis',
        effectA: 'kubejs:skin_inspiration',
        effectB: 'kubejs:metal_inspiration'
    }
]

InspirationScrollWritingList.forEach(data => {
    RegisterScrollWritingStrategy(
        (event) => {
            const targetStack = event.targetStack
            /** @type {Internal.ModularItem} */
            const item = targetStack.getItem()
            let socketModule = item.getModuleFromSlot(targetStack, 'scroll/socket')
            if (!socketModule) return false
            let socketData = socketModule["getVariantData(net.minecraft.world.item.ItemStack)"](targetStack)
            let effectLevelA = item.getEffectLevel(targetStack, data.effectA)
            let effectLevelB = item.getEffectLevel(targetStack, data.effectB)
            return socketData.key == data.socket && effectLevelA >= 3 && effectLevelB >= 3
        },
        (event) => {
            event.setUpgradedStack(TetraJSUtils.setupScrollData(data.key, data.key, [], [data.key], false, 0, 0x9dbfed, [15, 14, 15, 15]))
        },
        200
    )
})
