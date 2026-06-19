// priority: 999
const OrganBlockBrokenEvent = new OrganEventModel('block_broken')


BlockEvents.broken(event => {
    const entity = event.entity
    if (!entity) return
    let customData = {}
    OrganBlockBrokenEvent.run(entity, customData, [event])
})
