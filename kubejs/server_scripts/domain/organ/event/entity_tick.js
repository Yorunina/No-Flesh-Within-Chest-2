// priority: 500
const OrganEntityTickEvent = new OrganEventModel('entity_tick')
    .setInit(
        /** 
         * @param {OrganEventCustomData} customData
         * @param {Internal.OpenedEntityTickJS} event
         */
        (customData, event) => {
        }
    )
    .setDefer(
        /**
         * @param {OrganEventCustomData} customData
         * @param {Internal.OpenedEntityTickJS} event
         */
        (customData, event) => {
        }
    )


ChestCavityEvents.openedEntityTick(event => {
    const entity = event.entity
    if (!entity || entity.age % 20 != 0) return
    let customData = {}
    OrganEntityTickEvent.run(entity, customData, [event])
})
