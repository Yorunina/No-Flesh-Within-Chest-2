// priority: 400

RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let socketModule = item.getModuleFromSlot(targetStack, 'scroll/socket')
        if (!socketModule) return false
        let socketData = socketModule["getVariantData(net.minecraft.world.item.ItemStack)"](targetStack)
        let effectLevel = item.getEffectLevel(targetStack, 'kubejs:genesis_inspiration')
        return socketData.key == 'socket/socket_echo_shard' && effectLevel >= 3
    },
    (event) => {
        event.setUpgradedStack(TetraJSUtils.setupScrollData('genesis_crafting', 'genesis_crafting', ['genesis_crafting'], ['genesis_crafting'], true, 2, 0xE7EB56, [13, 10, 8, 7]))
    },
    200
)
