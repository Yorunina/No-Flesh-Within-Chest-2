// priority: 500
NativeEvents.onEvent($EntityMobGriefingEvent, /** @param {Internal.EntityMobGriefingEvent} event */ event => {
    const entity = event.getEntity()
    if (entity.type.startsWith('cataclysm:')) {
        event.setResult('deny')
        return
    }
})
