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
    LootModifierAttribute(event, player)
    UpdateClientISSSpellDataEvent(customData, player)
}

/**
 * @param {Internal.LootContextJS} event
 * @param {Player} player
 * @returns 
 */
function LootModifierAttribute(event, player) {
    const lootAttr = player.getAttribute('kubejs:loot_multiplier')
    if (!lootAttr) return
    const lootMulti = lootAttr.getValue()
    if (lootMulti == 1) return
    const overflowStacks = []
    event.loot.forEach(pLoot => {
        let maxStackSize = pLoot.getMaxStackSize()
        let newCount = Math.floor(pLoot.getCount() * lootMulti)
        if (newCount <= 0) {
            pLoot.setCount(0)
            return
        }
        let overflowCount = newCount - maxStackSize
        if (overflowCount <= 0) {
            pLoot.setCount(newCount)
        } else {
            pLoot.setCount(maxStackSize)
            for (let i = 0; i < Math.floor(overflowCount / maxStackSize); i++) {
                overflowStacks.push(pLoot.copyWithCount(maxStackSize))
            }
            if (overflowCount % maxStackSize > 0) {
                overflowStacks.push(pLoot.copyWithCount(overflowCount % maxStackSize))
            }
        }
    })
    overflowStacks.forEach(pLoot => {
        event.loot.add(pLoot)
    })
}
