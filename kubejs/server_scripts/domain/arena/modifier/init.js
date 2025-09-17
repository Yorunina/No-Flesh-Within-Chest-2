// priority: 999
const ArenaMobSpawnModifierStrategy = new StrategyModel()
SkyArenaEvents.arenaMobSpawn(event => {
    const blockEntity = event.getAltarBlockEntity()
    const modifierListTag = blockEntity.getModifierList()
    let modifierList = []
    modifierListTag.forEach(modifierTag => {
        modifierList.push(modifierTag.getAsString())
    })
    ArenaMobSpawnModifierStrategy.run(modifierList, [event], {})
})

function RegistryArenaMobSpawnModifierStrategy(id, func) {
    ArenaMobSpawnModifierStrategy.addStrategy(id, func)
}

const ArenaHandleRewardModifierStrategy = new StrategyModel()
SkyArenaEvents.arenaHandleReward(event => {
    const blockEntity = event.getAltarBlockEntity()
    const modifierListTag = blockEntity.getModifierList()
    let modifierList = []
    modifierListTag.forEach(modifierTag => {
        modifierList.push(modifierTag.getAsString())
    })
    ArenaHandleRewardModifierStrategy.run(modifierList, [event], {})
})

function RegistryArenaHandleRewardModifierStrategy(id, func) {
    ArenaHandleRewardModifierStrategy.addStrategy(id, func)
}

