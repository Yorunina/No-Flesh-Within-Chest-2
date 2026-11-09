// priority: 500

const TetraBlockLootBeforeEvent = new TetraEffectEventModel('block_loot_before')
const TetraEntityLootBeforeEvent = new TetraEffectEventModel('entity_loot_before')

LootJS.modifiers(/** @param {Internal.LootModificationEventJS} event */ event => {
    // 配置回调执行时效果已全部登记；每个策略保留独立 modifier 的取消与重置边界。
    TetraBlockLootBeforeEvent.getStrategies().forEach(entry => {
        event.addLootTypeModifier(LootType.BLOCK)
            .apply(/** @param {Internal.LootContextJS} ctx */ ctx => {
                let customData = {}
                entry.strategy.getFunc()(customData, ctx)
            })
    })
    TetraEntityLootBeforeEvent.getStrategies().forEach(entry => {
        event.addLootTypeModifier(LootType.ENTITY)
            .apply(/** @param {Internal.LootContextJS} ctx */ ctx => {
                let customData = {}
                entry.strategy.getFunc()(customData, ctx)
            })
    })
})
