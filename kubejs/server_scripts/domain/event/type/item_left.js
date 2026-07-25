// priority: 999
const OrganItemLeftClickedEvent = new OrganEventModel('item_left_clicked')

ItemEvents.firstLeftClicked(event => {
    const player = event.player
    if (!player) return
    let customData = {}
    OrganItemLeftClickedEvent.run(player, customData, [event])
})