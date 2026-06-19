// priority: 999
const OrganItemRightClickedEvent = new OrganEventModel('item_right_clicked')


ItemEvents.rightClicked(event => {
    const player = event.player
    if (!player) return
    let customData = {}
    OrganItemRightClickedEvent.run(player, customData, [event])
})