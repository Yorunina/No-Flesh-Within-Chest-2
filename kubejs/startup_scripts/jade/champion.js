// priority: 500
JadeEvents.onCommonRegistration(event => {
    event.entityDataProvider('kubejs:champion_key', $PathfinderMob)
        .setCallback((tag, accessor) => {
            const entity = accessor.getEntity()
            if (!entity) return
            const persistentData = entity.persistentData
            if (!persistentData) return
            const championTag = persistentData.getCompound('champion')
            if (!championTag || championTag.isEmpty()) return
            tag.put('champion', championTag)
        })
})