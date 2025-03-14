// priority: 500

publicField.NFWC.events.OrganBlockBrokenEvent = new OrganEventModel('block_broken')
/**@type {OrganEventModel} */
const OrganBlockBrokenEvent = publicField.NFWC.events.OrganBlockBrokenEvent
BlockEvents.broken(event => {
    const entity = event.entity
    if (!entity) return
    let customData = {}
    OrganBlockBrokenEvent.run(entity, customData, [event])
})
