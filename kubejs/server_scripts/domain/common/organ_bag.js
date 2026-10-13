// priority: 500
const OrganBagRankMap = {
    'kubejs:common_organ_bag': 0,
    'kubejs:fine_organ_bag': 1,
    'kubejs:rare_organ_bag': 2,
    'kubejs:epic_organ_bag': 3,
    'kubejs:legendary_organ_bag': 4,
}

ItemEvents.rightClicked(event => {
    let rank = OrganBagRankMap[event.item.id]
    let category = global.OrganBagCategories.find(category => event.item.id == 'kubejs:' + category + '_organ_bag')
    if (rank == undefined && category == undefined) return
    if (event.level.isClientSide()) return

    let pool = []
    OrganList.forEach(organ => {
        if (category != undefined) {
            if (organ.rank >= 0 && organ.rank < 6 && Item.of(organ.itemId).hasTag('kubejs:' + category)) pool.push(organ.itemId)
        } else if (organ.rank == rank) {
            pool.push(organ.itemId)
        }
    })
    let organId = RandomGet(pool)
    if (!organId) return

    GivePlayerItemList(event.player, [Item.of(organId)])
    event.item.shrink(1)
    event.player.playSound('item.bundle.drop_contents')
    event.cancel()
})
