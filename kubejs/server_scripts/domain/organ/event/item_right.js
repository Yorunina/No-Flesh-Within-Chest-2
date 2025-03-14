// priority: 801
publicField.NFWC.events.OrganItemRightClickedEvent = new OrganEventModel('item_right_clicked')
const OrganItemRightClickedEvent = publicField.NFWC.events.OrganItemRightClickedEvent

ItemEvents.rightClicked(event => {
    const player = event.player
    if (!player) return
    let customData = {}
    OrganItemRightClickedEvent.run(player, customData, [event])
})
