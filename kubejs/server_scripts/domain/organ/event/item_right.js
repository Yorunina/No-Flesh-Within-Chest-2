// priority: 801
const OrganItemRightClickedEvent = new OrganEventModel('item_right_clicked')
    .setInit(
        /** 
         * @param {OrganEventCustomData} customData
         * @param {Internal.ItemClickedEventJS} event
         */
        (customData, event) => {
        }
    )
    .setDefer(
        /**
         * @param {OrganEventCustomData} customData
         * @param {Internal.ItemClickedEventJS} event
         */
        (customData, event) => {
        }
    )


ItemEvents.rightClicked(event => {
    const player = event.player
    if (!player) return
    let customData = {}
    OrganItemRightClickedEvent.run(player, customData, [event])
})