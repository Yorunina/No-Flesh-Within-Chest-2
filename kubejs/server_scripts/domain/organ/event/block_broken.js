// priority: 500
const OrganBlockBrokenEvent = new OrganEventModel('block_broken')
    .setInit(
        /** 
         * @param {any} customData
         * @param {Internal.BlockBrokenEventJS} event
         */
        (customData, event) => {
        }
    )
    .setDefer(
        /**
         * @param {any} customData
         * @param {Internal.BlockBrokenEventJS} event
         */
        (customData, event) => {
        }
    )


BlockEvents.broken(event => {
    const entity = event.entity
    if (!entity) return
    let customData = {}
    OrganBlockBrokenEvent.run(entity, customData, [event])
})




