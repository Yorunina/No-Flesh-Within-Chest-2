// priority: 500
RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let socketModule = item.getModuleFromSlot(targetStack, 'scroll/socket')
        if (!socketModule) return false
        let socketData = socketModule["getVariantData(net.minecraft.world.item.ItemStack)"](targetStack)
        let effectLevelA = item.getEffectLevel(targetStack, 'kubejs:fabric_inspiration')
        let effectLevelB = item.getEffectLevel(targetStack, 'kubejs:gem_inspiration')
        return socketData.key == 'socket/socket_pristine_amethyst' && effectLevelA >= 3 && effectLevelB >= 3
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('starry_inspiration', 'starry_inspiration', [], ['starry_inspiration'], false, 0, 0x9dbfed, [15, 14, 15, 15]))
    },
    200
)

RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let socketModule = item.getModuleFromSlot(targetStack, 'scroll/socket')
        if (!socketModule) return false
        let socketData = socketModule["getVariantData(net.minecraft.world.item.ItemStack)"](targetStack)
        let effectLevelA = item.getEffectLevel(targetStack, 'kubejs:stone_inspiration')
        let effectLevelB = item.getEffectLevel(targetStack, 'kubejs:fibre_inspiration')
        return socketData.key == 'socket/socket_pristine_diamond' && effectLevelA >= 3 && effectLevelB >= 3
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('strength_inspiration', 'strength_inspiration', [], ['strength_inspiration'], false, 0, 0x9dbfed, [15, 14, 15, 15]))
    },
    200
)


RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()

        let socketModule = item.getModuleFromSlot(targetStack, 'scroll/socket')
        if (!socketModule) return false
        let socketData = socketModule["getVariantData(net.minecraft.world.item.ItemStack)"](targetStack)
        let effectLevelA = item.getEffectLevel(targetStack, 'kubejs:skin_inspiration')
        let effectLevelB = item.getEffectLevel(targetStack, 'kubejs:bone_inspiration')
        return socketData.key == 'socket/socket_pristine_emerald' && effectLevelA >= 3 && effectLevelB >= 3
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('enchant_inspiration', 'enchant_inspiration', [], ['enchant_inspiration'], false, 0, 0x9dbfed, [15, 14, 15, 15]))
    },
    200
)


RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let socketModule = item.getModuleFromSlot(targetStack, 'scroll/socket')
        if (!socketModule) return false
        let socketData = socketModule["getVariantData(net.minecraft.world.item.ItemStack)"](targetStack)
        let effectLevelA = item.getEffectLevel(targetStack, 'kubejs:metal_inspiration')
        let effectLevelB = item.getEffectLevel(targetStack, 'kubejs:scale_inspiration')
        return socketData.key == 'socket/socket_pristine_lapis' && effectLevelA >= 3 && effectLevelB >= 3
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('durability_inspiration', 'durability_inspiration', [], ['durability_inspiration'], false, 0, 0x9dbfed, [15, 14, 15, 15]))
    },
    200
)


RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let socketModule = item.getModuleFromSlot(targetStack, 'scroll/socket')
        if (!socketModule) return false
        let socketData = socketModule["getVariantData(net.minecraft.world.item.ItemStack)"](targetStack)
        let effectLevelA = item.getEffectLevel(targetStack, 'kubejs:fibre_inspiration')
        let effectLevelB = item.getEffectLevel(targetStack, 'kubejs:wood_inspiration')
        return socketData.key == 'socket/socket_amethyst' && effectLevelA >= 3 && effectLevelB >= 3
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('exhaustion_inspiration', 'exhaustion_inspiration', [], ['exhaustion_inspiration'], false, 0, 0x9dbfed, [15, 14, 15, 15]))
    },
    200
)


RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let socketModule = item.getModuleFromSlot(targetStack, 'scroll/socket')
        if (!socketModule) return false
        let socketData = socketModule["getVariantData(net.minecraft.world.item.ItemStack)"](targetStack)
        let effectLevelA = item.getEffectLevel(targetStack, 'kubejs:gem_inspiration')
        let effectLevelB = item.getEffectLevel(targetStack, 'kubejs:fabric_inspiration')
        return socketData.key == 'socket/socket_diamond' && effectLevelA >= 3 && effectLevelB >= 3
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('effect_inspiration', 'effect_inspiration', [], ['effect_inspiration'], false, 0, 0x9dbfed, [15, 14, 15, 15]))
    },
    200
)


RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let socketModule = item.getModuleFromSlot(targetStack, 'scroll/socket')
        if (!socketModule) return false
        let socketData = socketModule["getVariantData(net.minecraft.world.item.ItemStack)"](targetStack)
        let effectLevelA = item.getEffectLevel(targetStack, 'kubejs:bone_inspiration')
        let effectLevelB = item.getEffectLevel(targetStack, 'kubejs:fabric_inspiration')
        return socketData.key == 'socket/socket_emerald' && effectLevelA >= 3 && effectLevelB >= 3
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('end_inspiration', 'end_inspiration', [], ['end_inspiration'], false, 0, 0x9dbfed, [15, 14, 15, 15]))
    },
    200
)


RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let socketModule = item.getModuleFromSlot(targetStack, 'scroll/socket')
        if (!socketModule) return false
        let socketData = socketModule["getVariantData(net.minecraft.world.item.ItemStack)"](targetStack)
        let effectLevelA = item.getEffectLevel(targetStack, 'kubejs:skin_inspiration')
        let effectLevelB = item.getEffectLevel(targetStack, 'kubejs:metal_inspiration')
        return socketData.key == 'socket/socket_lapis' && effectLevelA >= 3 && effectLevelB >= 3
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('thunder_inspiration', 'thunder_inspiration', [], ['thunder_inspiration'], false, 0, 0x9dbfed, [15, 14, 15, 15]))
    },
    200
)








