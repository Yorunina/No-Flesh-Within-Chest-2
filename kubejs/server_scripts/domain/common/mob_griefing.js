// priority: 500
NativeEvents.onEvent($EntityMobGriefingEvent, /** @param {Internal.EntityMobGriefingEvent} event */ event => {
    const entity = event.getEntity()
    const level = entity.level
    if (entity.type.startsWith('cataclysm:')) {
        event.setResult('deny')
        return
    }
    if (level.dimension == 'kubejs:rogue_hunt') {
        event.setResult('deny')
        return
    }
})
