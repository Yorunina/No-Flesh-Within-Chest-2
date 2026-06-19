// priority: 999
const OrganChestLootEvent = new OrganEventModel('chest_loot')

/**
 * 器官箱子战利品事件处理函数
 * @param {Internal.LootContextJS} event 
 * @returns 
 */
function OrganChestLootHandle(event) {
    const player = event.player
    if (!player) return
    let customData = {}
    OrganChestLootEvent.run(player, customData, [event])
    UpdateClientISSSpellDataEvent(customData, player)
}