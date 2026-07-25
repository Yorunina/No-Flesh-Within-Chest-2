// priority: 999
const OrganTradeWithVillagerEvent = new OrganEventModel('trade_with_villager')
NativeEvents.onEvent($TradeWithVillagerEvent, /** @param {Internal.TradeWithVillagerEvent} event */ event => {
    const entity = event.entity
    if (!entity) return
    let customData = {}
    OrganTradeWithVillagerEvent.run(entity, customData, [event])
})