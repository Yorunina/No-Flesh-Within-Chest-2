// priority: 999
const OrganBlockRightClickedEvent = new OrganEventModel('block_right_clicked')


BlockEvents.rightClicked(event => {
    const entity = event.entity
    if (!entity) return
    let customData = {}
    OrganBlockRightClickedEvent.run(entity, customData, [event])
})
