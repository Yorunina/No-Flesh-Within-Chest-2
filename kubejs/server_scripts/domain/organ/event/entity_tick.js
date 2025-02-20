// priority: 500
const OrganEntityTickEvent = new OrganEventModel('entity_tick')
    .setInit(
        /** 
         * @param {any} customData
         * @param {Internal.SimplePlayerEventJS} event
         */
        (customData, event) => {
        }
    )
    .setDefer(
        /**
         * @param {any} customData
         * @param {Internal.SimplePlayerEventJS} event
         */
        (customData, event) => {
        }
    )


ChestCavityEvents.openedEntityTick(event => {
    const entity = event.entity
    if (!entity || entity.age % 10 != 0) return
    let customData = {}
    OrganEntityTickEvent.run(entity, customData, [event])
})
