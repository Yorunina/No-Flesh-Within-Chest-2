// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('gem_fragment', builder => {
        builder.processLoot((toolView, lvl, lootList, context) => {
            const blockState = context.getParamOrNull($LootContextParams.BLOCK_STATE)
            if (!blockState) return
            if (blockState.is('minecraft:stone') || blockState.is('minecraft:deepslate')) {
                let random = Math.random()
                if (random < 0.005 * lvl) {
                    let itemRandom = Math.random()
                    if (itemRandom < 0.5) {
                        lootList.push(Item.of('minecraft:diamond'))
                    } else {
                        lootList.push(Item.of('minecraft:emerald'))
                    }
                }
            }
        })
    })
})