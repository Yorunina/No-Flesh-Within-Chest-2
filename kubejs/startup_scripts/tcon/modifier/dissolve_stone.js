// priority: 500
TConJSEvents.modifierRegistry(event => {
    event.createNew('dissolve_stone', builder => {
        builder.processLoot((toolView, lvl, lootList, context) => {
            let toolStats = toolView.getStats()
            if (toolStats.hasStat($ToolStats.MINING_SPEED)) {
                const blockState = context.getParamOrNull($LootContextParams.BLOCK_STATE)
                let mineSpeed = toolStats.GET($ToolStats.MINING_SPEED)
                if (!blockState) return
                if (blockState.is('minecraft:stone') || blockState.is('minecraft:deepslate')) {
                    lootList.clear()
                    let random = Math.random()
                    if (random < 0.01 * lvl / Math.min(mineSpeed, 0.1)) {
                        lootList.push(Item.of('kubejs:clear_crystal'))
                    }
                }
            }
        })
    })
})