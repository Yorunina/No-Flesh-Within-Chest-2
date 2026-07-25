// priority: 999
const OrganKeyBindEvent = new OrganKeyActiveEventModel('key_active')

NetworkEvents.dataReceived('key_active', event => {
    const player = event.player
    const nbt = event.data
    if (!player) return
    var itemId = nbt.getString('itemId')
    let customData = {}
    if (OrganItemCoolDown(player, Item.of(itemId))) return
    OrganKeyBindEvent.run(player, itemId, customData, [event])
    UpdateClientISSSpellDataEvent(customData, player)
})
