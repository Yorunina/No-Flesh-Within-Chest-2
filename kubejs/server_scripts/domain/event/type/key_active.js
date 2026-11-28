// priority: 999
const OrganKeyActiveEvent = new OrganKeyActiveEventModel('key_active')

NetworkEvents.dataReceived('key_active', event => {
    const player = event.player
    const nbt = event.data
    if (!player) return
    const slot = nbt.getInt('slot')
    // 客户端回传的槽位只用于定位，实际物品以服务端胸腔为准
    if (slot < 0) {
        var itemId = nbt.getString('itemId')
        let customData = {}
        if (OrganItemCoolDown(player, Item.of(itemId))) return
        OrganKeyActiveEvent.run(player, itemId, customData, [event])
        UpdateClientISSSpellDataEvent(customData, player)
        return
    }
    const organItem = player.chestCavityInstance.inventory.getStackInSlot(slot)
    if (!organItem || organItem.isEmpty()) return
    let customData = {}
    if (OrganItemCoolDown(player, organItem)) return
    OrganKeyActiveEvent.run(player, String(organItem.id), customData, [event])
    UpdateClientISSSpellDataEvent(customData, player)
})
