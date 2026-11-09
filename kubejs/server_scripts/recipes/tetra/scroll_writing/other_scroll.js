// priority: 400

/** @type {Object<string, {key: string, schematic: string, color: number}>} */
const RelicScrollWritingMap = {
    'kubejs:scroll_writing_trident': { key: 'tetra/trident', schematic: 'single/trident', color: 0x0000FF },
    'kubejs:scroll_writing_fortress': { key: 'tetra/fortress', schematic: 'shield/fortress', color: 0x7A7A7A },
    'kubejs:scroll_writing_arcane_stave': { key: 'tetra/arcane_stave', schematic: 'bow/arcane_stave', color: 0x9641FC },
    'kubejs:scroll_writing_katana': { key: 'tetra/katana', schematic: 'sword/katana', color: 0xFF0000 },
    'kubejs:scroll_writing_whip_sword': { key: 'tetra/whip_sword', schematic: 'sword/whip_sword', color: 0xFFFFFF },
    'kubejs:scroll_writing_great_hammer': { key: 'tetra/great_hammer', schematic: 'single/great_hammer', color: 0x727D80 }
}

RegisterScrollWritingStrategy(
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        let socketModule = item.getModuleFromSlot(targetStack, 'scroll/socket')
        if (!socketModule) return false
        let socketData = socketModule["getVariantData(net.minecraft.world.item.ItemStack)"](targetStack)
        if (socketData.key != 'socket/socket_echo_shard') return false
        for (let effectKey in RelicScrollWritingMap) {
            if (item.getEffectLevel(targetStack, effectKey) > 0) return true
        }
        return false
    },
    (event) => {
        const targetStack = event.targetStack
        /**@type {Internal.ModularItem} */
        const item = targetStack.getItem()
        for (let effectKey in RelicScrollWritingMap) {
            if (item.getEffectLevel(targetStack, effectKey) > 0) {
                let data = RelicScrollWritingMap[effectKey]
                event.setUpgradedStack(TetraJSUtils.setupScrollData(data.key, 'relic', [data.schematic], [], false, 0, data.color, [6, 15, 4, 8]))
                return
            }
        }
    },
    300
)
