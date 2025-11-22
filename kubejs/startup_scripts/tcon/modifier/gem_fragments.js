// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('gem_fragment', builder => {
        builder.processLoot((toolView, lvl, lootList, context) => {
            let toolStats = toolView.getStats()
            if (toolStats.hasStat($ToolStats.MINING_SPEED)) {
                const blockState = context.getParamOrNull($LootContextParams.BLOCK_STATE)
                let mineSpeed = toolStats.GET($ToolStats.MINING_SPEED)
                if (!blockState) return
                if (blockState.is('minecraft:stone') || blockState.is('minecraft:deepslate')) {
                    let random = Math.random()
                    if (random < 0.01 * lvl) {
                        let itemRandom = Math.random()
                        if (itemRandom < 0.5) {
                            lootList.push(Item.of('minecraft:diamond'))
                        } else {
                            lootList.push(Item.of('minecraft:emerald'))
                        }
                    }
                }
            }
        })
    })
})