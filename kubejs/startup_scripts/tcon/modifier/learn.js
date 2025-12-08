TConJSEvents.modifierRegistry(event => {
    event.createNew('learn', builder => {
        builder.processLoot((toolView, lvl, lootList, context) => {

            let killer = context.getParamOrNull($LootContextParams.KILLER_ENTITY);
            if (!killer || !killer.isPlayer()) return
            let toolStats = toolView.getStats()
            if (!toolStats.hasStat($ToolStats.ATTACK_SPEED)) return
            const attackSpeed = toolStats.get($ToolStats.ATTACK_SPEED)
            lootList.clear()
            let random = Math.random()
            if (random < 0.1 * lvl / Math.min(attackSpeed, 0.1)) {
                let count = 1 + Math.floor(Math.random() * 5)    
                lootList.push(Item.of('create:experience_nugget',count))
                    }
        })
    })
})
