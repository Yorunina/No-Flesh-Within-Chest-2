// priority: 500
JadeEvents.onCommonRegistration(event => {
    event.entityDataProvider('kubejs:rogue_hunt_rank', $LivingEntity)
        .setCallback((tag, accessor) => {
            const entity = accessor.getEntity()
            if (!entity || !entity.persistentData) return
            if (!entity.persistentData.contains('rogue_hunt_rank')) return
            tag.putInt('rogue_hunt_rank', entity.persistentData.getInt('rogue_hunt_rank'))
        })
})