// priority: 801
const OrganPlayerEnchantEvent = new OrganEventModel('player_enchant')
    .setInit(
        /** 
         * @param {any} customData
         * @param {Internal.LootContextJS} event
         */
        (customData, event) => {
        }
    )
    .setDefer(
        /**
         * @param {any} customData
         * @param {Internal.LootContextJS} event
         */
        (customData, event) => {
        }
    )

MoreJSEvents.enchantmentTableChanged(event => {
    const player = event.player
    if (!player) return
    let customData = {}
    OrganPlayerEnchantEvent.run(player, customData, [event])
})

