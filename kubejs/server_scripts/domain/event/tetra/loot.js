// priority: 0

const TetraEntityLootEvent = new TetraEffectEventModel('entity_loot')
const TetraBlockLootEvent = new TetraEffectEventModel('block_loot')

LootJS.modifiers(/** @param {Internal.LootModificationEventJS} event */ event => {
    // 在配置阶段取得完整策略，保持同类掉落顺序；不把多个策略拼进同一个 apply。
    TetraEntityLootEvent.getStrategies().forEach(entry => {
        event.addLootTypeModifier(LootType.ENTITY)
            .apply(/** @param {Internal.LootContextJS} ctx */ ctx => {
                let customData = {}
                entry.strategy.getFunc()(customData, ctx)
            })
    })
    TetraBlockLootEvent.getStrategies().forEach(entry => {
        event.addLootTypeModifier(LootType.BLOCK)
            .apply(/** @param {Internal.LootContextJS} ctx */ ctx => {
                let customData = {}
                entry.strategy.getFunc()(customData, ctx)
            })
    })
})
