// priority: 999
const OrganPlayerEnchantEvent = new OrganEventModel('player_enchant')

MoreJSEvents.enchantmentTableChanged(event => {
    const player = event.player
    if (!player) return
    let customData = {}
    OrganPlayerEnchantEvent.run(player, customData, [event])
})

