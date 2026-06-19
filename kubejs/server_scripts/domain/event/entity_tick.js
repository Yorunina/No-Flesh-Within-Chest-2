// priority: 999
const OrganEntityTickEvent = new OrganEventModel('entity_tick')

/**
 * 能够进入该事件必须要满足该实体的胸腔是被开启过的状态
 * 同时，为了避免可能的性能问题。该tick事件并非真的tick，而是在上层做了拦截，实际为秒级别操作
 */
ChestCavityEvents.openedEntityTick(event => {
    const entity = event.entity
    if (!entity || entity.age % 20 != 0) return
    let customData = {}
    OrganEntityTickEvent.run(entity, customData, [event])
    PhotosynthesisEntityTick(event)
})
