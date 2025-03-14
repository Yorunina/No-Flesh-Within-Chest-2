// priority: 801
publicField.NFWC.events.OrganPlayerEnchantEvent = new OrganEventModel('player_enchant')

const OrganPlayerEnchantEvent = publicField.NFWC.events.OrganPlayerEnchantEvent
MoreJSEvents.enchantmentTableChanged(event => {
    const player = event.player
    if (!player) return
    let customData = {}
    OrganPlayerEnchantEvent.run(player, customData, [event])
})

