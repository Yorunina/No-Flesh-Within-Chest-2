// priority: 500

EntityEvents.spawned('cataclysm:lionfish', event => {
    event.cancel()
})

EntityEvents.spawned(event => {
    const level = event.level
})