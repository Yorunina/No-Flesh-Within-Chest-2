// priority: 999
const OrganVillagerUpdateSpecialPricesEvent = new OrganEventModel('villager_update_special_prices')
MAAEvents.villagerUpdateSpecialPrices(event => {
    const player = event.player
    if (!player) return
    let customData = {}
    OrganVillagerUpdateSpecialPricesEvent.run(player, customData, [event])
})