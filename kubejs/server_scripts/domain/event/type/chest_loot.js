// priority: 999
const OrganChestLootEvent = new OrganEventModel('chest_loot')
const CuriosChestLootEvent = new CuriosEventModel('chest_loot')

/**
 * 器官箱子战利品事件处理函数
 * @param {Internal.LootContextJS} event 
 * @returns 
 */
function ChestLootHandle(event) {
    const player = event.player
    if (!player) return
    let customData = {}
    OrganChestLootEvent.run(player, customData, [event])
    CuriosChestLootEvent.run(player, customData, [event])
    UpdateClientISSSpellDataEvent(customData, player)
}